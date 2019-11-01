/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';
import classNames from 'classnames';
import LZString from 'lz-string';
import { Icon, Tooltip } from 'antd';
import EditButton from './EditButton';
import ErrorBoundary from './ErrorBoundary';
// import BrowserFrame from '../BrowserFrame';

function compress(string) {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

class Demo extends React.Component {
  state = {
    codeExpand: false,
    copied: false,
    copyTooltipVisible: false,
  };

  componentDidMount() {
    const { meta, location } = this.props;
    if (meta.id === location.hash.slice(1)) {
      this.anchor.click();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { codeExpand, copied, copyTooltipVisible } = this.state;
    const { expand } = this.props;
    return (
      (codeExpand || expand) !== (nextState.codeExpand || nextProps.expand) ||
      copied !== nextState.copied ||
      copyTooltipVisible !== nextState.copyTooltipVisible
    );
  }

  getSourceCode() {
    const { highlightedCode } = this.props;
    if (typeof document !== 'undefined') {
      const div = document.createElement('div');
      div.innerHTML = highlightedCode[1].highlighted;
      return div.textContent;
    }
    return '';
  }

  handleCodeExpand = demo => {
    const { codeExpand } = this.state;
    this.setState({ codeExpand: !codeExpand });
    this.track({
      type: 'expand',
      demo,
    });
  };

  saveAnchor = anchor => {
    this.anchor = anchor;
  };

  handleCodeCopied = demo => {
    this.setState({ copied: true });
    this.track({
      type: 'copy',
      demo,
    });
  };

  onCopyTooltipVisibleChange = visible => {
    if (visible) {
      this.setState({
        copyTooltipVisible: visible,
        copied: false,
      });
      return;
    }
    this.setState({
      copyTooltipVisible: visible,
    });
  };

  // eslint-disable-next-line
  track({ type, demo }) {
    if (!window.gtag) {
      return;
    }
    window.gtag('event', 'demo', {
      event_category: type,
      event_label: demo,
    });
  }

  render() {
    const {
      meta, src, content, preview, highlightedCode, style,
      highlightedStyle, expand, utils, intl: { locale },
    } = this.props;
    const { copied, copyTooltipVisible } = this.state;
    if (!this.liveDemo) {
      this.liveDemo = meta.iframe ? (
        <BrowserFrame>
          <iframe src={src} height={meta.iframe} title="demo" />
        </BrowserFrame>
      ) : (
        preview(React, ReactDOM)
      );
    }
    const codeExpand = this.state.codeExpand || expand;
    const codeBoxClass = classNames('code-box', {
      expand: codeExpand,
      'code-box-debug': meta.debug,
    });
    const localizedTitle = meta.title[locale] || meta.title;
    const localizeIntro = content[locale] || content;
    const introChildren = utils.toReactComponent(['div'].concat(localizeIntro));

    const highlightClass = classNames({
      'highlight-wrapper': true,
      'highlight-wrapper-expand': codeExpand,
    });

    const html = `<div id="container" style="padding: 24px"></div>
<script>
  var mountNode = document.getElementById('container');
</script>`;

    const sourceCode = this.getSourceCode();
    return (
      <section className={codeBoxClass} id={meta.id}>
        <section className="code-box-demo">
          <ErrorBoundary>{this.liveDemo}</ErrorBoundary>
          {style ? (
            <style dangerouslySetInnerHTML={{ __html: style }} /> // eslint-disable-line
          ) : null}
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <Tooltip title={meta.debug ? <FormattedMessage id="app.demo.debug" /> : ''}>
              <a href={`#${meta.id}`} ref={this.saveAnchor}>
                {localizedTitle}
              </a>
            </Tooltip>
            <EditButton
              title={<FormattedMessage id="app.content.edit-demo" />}
              filename={meta.filename}
            />
          </div>
          <div className="code-box-description">{introChildren}</div>
          <div className="code-box-actions">
            {/* <form
              action="//riddle.alibaba-inc.com/riddles/define"
              method="POST"
              target="_blank"
              onClick={() => this.track({ type: 'riddle', demo: meta.id })}
            >
              <input type="hidden" name="data" value={JSON.stringify(riddlePrefillConfig)} />
              <Tooltip title={<FormattedMessage id="app.demo.riddle" />}>
                <input
                  type="submit"
                  value="Create New Riddle with Prefilled Data"
                  className="code-box-riddle"
                />
              </Tooltip>
            </form> */}
            {/* <form
              action="https://codepen.io/pen/define"
              method="POST"
              target="_blank"
              onClick={() => this.track({ type: 'codepen', demo: meta.id })}
            >
              <input type="hidden" name="data" value={JSON.stringify(codepenPrefillConfig)} />
              <Tooltip title={<FormattedMessage id="app.demo.codepen" />}>
                <input
                  type="submit"
                  value="Create New Pen with Prefilled Data"
                  className="code-box-codepen"
                />
              </Tooltip>
            </form> */}
            {/* <form
              action="https://codesandbox.io/api/v1/sandboxes/define"
              method="POST"
              target="_blank"
              onClick={() => this.track({ type: 'codesandbox', demo: meta.id })}
            >
              <input
                type="hidden"
                name="parameters"
                value={compress(JSON.stringify(codesanboxPrefillConfig))}
              />
              <Tooltip title={<FormattedMessage id="app.demo.codesandbox" />}>
                <input
                  type="submit"
                  value="Create New Sandbox with Prefilled Data"
                  className="code-box-codesandbox"
                />
              </Tooltip>
            </form> */}
            <CopyToClipboard text={sourceCode} onCopy={() => this.handleCodeCopied(meta.id)}>
              <Tooltip
                visible={copyTooltipVisible}
                onVisibleChange={this.onCopyTooltipVisibleChange}
                title={<FormattedMessage id={`app.demo.${copied ? 'copied' : 'copy'}`} />}
              >
                <Icon
                  type={copied && copyTooltipVisible ? 'check' : 'snippets'}
                  className="code-box-code-copy"
                />
              </Tooltip>
            </CopyToClipboard>
            <Tooltip
              title={<FormattedMessage id={`app.demo.code.${codeExpand ? 'hide' : 'show'}`} />}
            >
              <span className="code-expand-icon">
                <img
                  alt="expand code"
                  src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
                  className={codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
                  onClick={() => this.handleCodeExpand(meta.id)}
                />
                <img
                  alt="expand code"
                  src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg"
                  className={codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
                  onClick={() => this.handleCodeExpand(meta.id)}
                />
              </span>
            </Tooltip>
          </div>
        </section>
        <section className={highlightClass} key="code">
          <div className="highlight">{utils.toReactComponent(highlightedCode)}</div>
          {highlightedStyle ? (
            <div key="style" className="highlight">
              <pre>
                <code className="css" dangerouslySetInnerHTML={{ __html: highlightedStyle }} />
              </pre>
            </div>
          ) : null}
        </section>
      </section>
    );
  }
}

export default injectIntl(Demo);

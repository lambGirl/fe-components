import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Header from './header';
// import feComponents from 'feComponents';
import enLocale from '../../../en-US';
import cnLocale from '../../../zh-CN';
import * as utils from '../utils';
import '../../static/style';

if (typeof window !== 'undefined') {
  // Expose to iframe
  window.react = React;
  window['react-dom'] = ReactDOM;
  // eslint-disable-next-line global-require
  // window.feComponents = feComponents;

  // Error log statistic
  window.addEventListener('error', function onError(e) {
    // Ignore ResizeObserver error
    if (e.message === 'ResizeObserver loop limit exceeded') {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  });

  if (process.env.NODE_ENV === 'production') {
    LogRocket.init('kpuw4z/ant-design');
    setupLogRocketReact(LogRocket);
  }
}

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        const { pathname } = props.location;
        const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;
    
         this.state = {
           appLocale,
         };
    }

    render() {
      const { children, restProps} = this.props;
      const { appLocale } = this.state;
      const title =
        appLocale.locale === 'zh-CN'
        ? '客如云内部组件库'
        : 'Ant Design - A UI Design Language and React UI library';
      const description =
        appLocale.locale === 'zh-CN'
        ? '基于 Ant Design 设计体系的 React UI 组件库，用于研发企业级中后台产品。'
        : 'An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises';
    
      return (
          <>
            <Helmet encodeSpecialCharacters={false}>
                <html lang={appLocale.locale === 'zh-CN' ? 'zh' : 'en'} />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:type" content="website" />
            </Helmet>
            <IntlProvider locale={appLocale.locale} messages={appLocale.messages} defaultLocale="en-US">
                <ConfigProvider locale={appLocale.locale === 'zh-CN' ? zhCN : null}>
                  <div className="page-wrapper">
                    <Header {...this.props} />
                    {children}
                  </div>
                </ConfigProvider>
            </IntlProvider>
          </>
         
      );
    }
  }
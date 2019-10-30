import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'bisheng/router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Select, Menu, Row, Col, Icon, Popover, Input, Button, Badge } from 'antd';
import Santa from './Santa';
import * as utils from '../utils';
import { version as antdVersion } from '../../../../package.json';

const { Option } = Select;


class Header extends React.Component {

    handleLangChange = () => {

    }

    handleVersionChange =() => {

    }

    renderMenu = () => {
        const { location, themeConfig, intl: { locale } } = this.props;
        const module = location.pathname
        .replace(/(^\/|\/$)/g, '')
        .split('/')
        .slice(0, -1)
        .join('/');

        let activeMenuItem = module || 'home';
        if (activeMenuItem === 'components' || location.pathname === 'changelog') {
            activeMenuItem = 'docs/react';
        }

        const isZhCN = locale === 'zh-CN';
        const docVersions = { ...themeConfig.docVersions, [antdVersion]: antdVersion };
        const versionOptions = Object.keys(docVersions).map(version => (
          <Option value={docVersions[version]} key={version}>
            {version}
          </Option>
        ));
        return [
            <Button
              ghost
              size="small"
              onClick={this.handleLangChange}
              className="header-lang-button"
              key="lang-button"
            >
              <FormattedMessage id="app.header.lang" />
            </Button>,
            <Select
              key="version"
              className="version"
              size="small"
              dropdownMatchSelectWidth={false}
              defaultValue={antdVersion}
              onChange={this.handleVersionChange}
              getPopupContainer={trigger => trigger.parentNode}
            >
              {versionOptions}
            </Select>,
            <Menu
              className="menu-site"
              mode='horizontal'
              selectedKeys={[activeMenuItem]}
              id="nav"
              key="nav"
            >
              <Menu.Item key="home" className="hide-in-home-page">
                <Link to={utils.getLocalizedPathname('/', isZhCN)}>
                  <FormattedMessage id="app.header.menu.home" />
                </Link>
              </Menu.Item>
              {/* <Menu.Item key="docs/spec">
                <Link to={utils.getLocalizedPathname('/docs/spec/introduce', isZhCN)}>
                  <FormattedMessage id="app.header.menu.spec" />
                </Link>
              </Menu.Item> */}
              <Menu.Item key="docs/react">
                <Link to={utils.getLocalizedPathname('/docs/react/introduce', isZhCN)}>
                  <FormattedMessage id="app.header.menu.components" />
                </Link>
              </Menu.Item>
            </Menu>,
          ];
    }
    render() {
        const { location, themeConfig, intl: { locale } } = this.props;
        const headerClassName = classNames({
            clearfix: true,
        });
        const isZhCN = locale === 'zh-CN';
        const searchPlaceholder = locale === 'zh-CN' ? '在组件库中搜索' : 'Search in lamia';
        return (
            <header id="header" className={headerClassName}>
                <Row>
                    <Col xxl={4} xl={5} lg={5} md={5} sm={24} xs={24}>
                        <Link to={utils.getLocalizedPathname('/', isZhCN)} id="logo">
                            {/* <img
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                            /> */}
                            {/* <img
                                alt="Ant Design"
                                src="https://gw.alipayobjects.com/zos/rmsportal/DkKNubTaaVsKURhcVGkh.svg"
                            /> */}
                            组件库
                            <Santa /> 
                        </Link>
                    </Col>
                    <Col xxl={20} xl={19} lg={19} md={19} sm={0} xs={0}>
                        <div id="search-box">
                            <Icon type="search" />
                            <Input
                                ref={ref => {
                                    this.searchInput = ref;
                                }}
                                placeholder={searchPlaceholder}
                            />
                        </div>
                        {this.renderMenu()}
                    </Col>
                </Row>
            </header>
        )
    }
}

export default injectIntl(Header);
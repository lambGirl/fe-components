import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';

const getStyle =  () => {
  return `
    .main-wrapper {
      padding: 0;
    }
    #header {
      box-shadow: none;
      max-width: 1200px;
      width: 100%;
      margin: 20px auto 0;
      padding: 0 24px;
    }
    #header,
    #header .ant-select-selection,
    #header .ant-menu {
      background: transparent;
    }
    #header #logo {
      padding: 0;
    }
    #header #nav .ant-menu-item {
      border-color: transparent;
    }
    #header #nav .ant-menu-submenu {
      border-color: transparent;
    }
    #header #nav .ant-menu-item.hide-in-home-page {
      display: none;
    }
    #header .ant-row > div:last-child .header-lang-button {
      margin-right: 0;
    }
    .rc-footer-container {
      max-width: 1200px;
      padding: 80px 0;
    }

    .rc-footer-bottom-container {
      max-width: 1200px;
    }

    .rc-footer-columns {
      justify-content: space-around;
    }
  `;
}

const Home = (props) => {
  const { intl } = props;
  const childProps = { ...props };
  return <>
     <style dangerouslySetInnerHTML={{ __html: getStyle() }} /> {/* eslint-disable-line */}
     <Helmet encodeSpecialCharacters={false}>
         <title>{`组件库首页`}</title> 
    </Helmet> 
    <div className='home-content'>
      组件库
    </div> 
  </>
}

export default injectIntl(Home);

const path = require('path');
const antd =  require('antd');
/**
 * bisheng start读取
 * 
 * program.config ||  bisheng.config.js
 */
module.exports = {
  theme: './site/theme',
  port: 8888,
  hash: true,
  source: {
    components: './components',
    docs: './docs',
  },
  htmlTemplate: './site/theme/static/template.html',  // 设置 htmlTemplate配置
  themeConfig: {
    categoryOrder: {
      'Ant Design': 0,
      原则: 1,
      Principles: 1,
      视觉: 2,
      Visual: 2,
      模式: 3,
      Patterns: 3,
      其他: 6,
      Other: 6,
      Components: 100,
      组件: 100,
    },
    typeOrder: {
      General: 0,
      Layout: 1,
      Navigation: 2,
      'Data Entry': 3,
      'Data Display': 4,
      Feedback: 5,
      Other: 6,
      Deprecated: 7,
      通用: 0,
      布局: 1,
      导航: 2,
      数据录入: 3,
      数据展示: 4,
      反馈: 5,
      其他: 6,
      废弃: 7,
    },
    docVersions: {
      '0.0.1': 'http://09x.ant.design',
    },
  },
  filePathMapper(filePath) {
    if (filePath === '/index.html') {
      return ['/index.html', '/index-cn.html'];
    }
    if (filePath.endsWith('/index.html')) {
      return [filePath, filePath.replace(/\/index\.html$/, '-cn/index.html')];
    }
    if (filePath !== '/404.html' && filePath !== '/index-cn.html') {
      return [filePath, filePath.replace(/\.html$/, '-cn.html')];
    }
    return filePath;
  },
  doraConfig: { 
    verbose: true,
  },
  lessConfig: {
    javascriptEnabled: true,
  },
  webpackConfig(config) {
    // eslint-disable-next-line
    config.resolve.alias = {
      // antd: path.join(process.cwd(), 'index'),
      site: path.join(process.cwd(), 'site'),
      'feComponents':path.join(process.cwd(), 'components')
    };

    // eslint-disable-next-line
    config.externals = {
      'react-router-dom': 'ReactRouterDOM',
      'Antd' : antd,
    };
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    // config.plugins.push(new CSSSplitWebpackPlugin({ size: 4000 }));

    return config;
  },

  devServerConfig: {
    public: process.env.DEV_HOST || 'localhost',
    disableHostCheck: !!process.env.DEV_HOST,
  },
};

#!/usr/bin/env node
const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const options = {
  stylesDir: path.join(__dirname, '../site/theme/static'),
  antdStylesDir: path.join(__dirname, '../src'),
  varFile: path.join(__dirname, '../src/style/themes/default.less'),
  mainLessFile: path.join(__dirname, '../site/theme/static/index.less'),
  themeVariables: ['@primary-color'],
  outputFilePath: path.join(__dirname, '../_site/color.less'),
};

generateTheme(options);

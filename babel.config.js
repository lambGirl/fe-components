module.exports = function(api) {
  const isTest = api.env('test');
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: isTest ? 'auto' : false, // tell babel do not compile import/export
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  const plugins = [
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    ['react-hot-loader/babel'],
    ['import', { libraryName: 'antd-mobile', style: true }],
  ];

  return {
    presets,
    plugins,
  };
};

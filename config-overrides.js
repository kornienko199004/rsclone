const { injectBabelPlugin } = require('react-app-rewired');

const rootImportConfig = [
  'root-import',
  {
    rootPathPrefix: '~',
    rootPathSufix: 'src',
  },
];

module.exports = (config) => injectBabelPlugin(rootImportConfig, config);

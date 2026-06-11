const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

module.exports = mergeConfig(config, {
  resolver: {
    extraNodeModules: {
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
    ],
  },
});

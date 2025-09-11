const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Handle fallbacks for Node.js modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser.js'),
        util: require.resolve('util/'),
        assert: require.resolve('assert/'),
        url: require.resolve('url/'),
        fs: false,
        net: false,
        tls: false,
      };

      // Add webpack plugins
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser.js',
        })
      );

      return webpackConfig;
    },
  },
};
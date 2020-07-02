const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/scraper.js',
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  },
  output: {
    globalObject: 'this',
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'recipeScraper',
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  target: 'node',
};

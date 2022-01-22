const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/main.js',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  output: {
    globalObject: 'this',
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'recipeDataScraper',
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  target: 'node',
};

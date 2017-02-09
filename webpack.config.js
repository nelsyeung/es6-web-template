const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'index.html',
  }),
  new ExtractTextPlugin('styles.css'),
  new CleanWebpackPlugin(['dist']),
];
const buildDir = path.resolve(__dirname, 'dist');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: path.join('js', 'index.js'),
  devtool: 'source-map',
  output: {
    path: buildDir,
    filename: 'script.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer,
                ],
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve('src'),
    ],
    extensions: ['.js'],
  },
  devServer: {
    contentBase: buildDir,
    port: 3000,
  },
  plugins,
};

require('dotenv').config();
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const { DefinePlugin, EnvironmentPlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = module.exports = {};

const PRODUCTION = process.env.NODE_ENV === 'production';

webpackConfig.entry = `${__dirname}/src/main.js`;
webpackConfig.output = {
  filename: 'bundle.[hash].js',
  path: `${__dirname}/build`,
  publicPath: process.env.CDN_URL,
};

webpackConfig.plugins = [
  new HTMLPlugin({
    title: 'Fire Polls',
    template: 'src/index.html',
  }),
  new EnvironmentPlugin(['NODE_ENV']),
  new DefinePlugin({
    API_URL: JSON.stringify(process.env.API_URL),
  }),
  new ExtractTextPlugin({
    filename: 'bundle.[hash].css',
    disable: !PRODUCTION,
  }),
];

if (PRODUCTION) {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new UglifyPlugin(),
    new CleanPlugin(['build']),
  ]);
}

webpackConfig.module = {
  rules: [
    {
      test: /\.(jpg|gif|png|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'image/[name].[hash].[ext]',
        },
      }],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [`${__dirname}/src/style`],
            },
          },
        ],
      }),
    },
  ],
};

webpackConfig.devtool = PRODUCTION ? undefined : 'eval-source-map';

webpackConfig.devServer = {
  historyApiFallback: true,
};

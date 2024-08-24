const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
      clean: true,
      publicPath: '/'
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@contexts': path.resolve(__dirname, 'src/contexts/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),
        '@routes': path.resolve(__dirname, 'src/routes/'),
        '@services': path.resolve(__dirname, 'src/services/'),
        '@store': path.resolve(__dirname, 'src/store/'),
        '@types': path.resolve(__dirname, 'src/types/'),
        '@utils': path.resolve(__dirname, 'src/utils/')
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template:'./public/index.html',
        minify: isProduction && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[contenthash].css' : '[name].css',
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
    devServer: {
      historyApiFallback: true,
      static: './dist',
      hot: true,
      open: true,
    },
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  };
};
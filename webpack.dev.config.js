const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    main: './src/index.tsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  target: 'web',
  devtool: '#source-map',
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: "awesome-typescript-loader" 
      },
      {
          test: /\.(scss|css)$/,
          use: [
              'style-loader',
              'css-loader',
          ],
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          }
        ]
      },
      //{
      //  test: /\.css$/,
      //  use: [ 'style-loader', 'css-loader' ]
      //},
      
      {
       test: /\.(png|svg|jpg|gif)$/,
       use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      excludeChunks: [ 'server' ]
    })
  ]
}

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { default: merge } = require("webpack-merge");
// const ESLintPlugin = require("eslint-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 打包入口文件
  entry: "./index.js",
  // 打包输出
  output: {
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "dist"),
    // publicPath: "",
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  // loader
  module: {
    rules: [
      // 打包css
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            // options: {
            //   ident: "postcss",
            //   plugins: () => {
            //     // postcss插件
            //     require("postcss-preset-env")();
            //   },
            // },
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
        ],
      },
      // 处理图片
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource",
      },

      // 处理字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      // 处理html中的图片
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      // 兼容js
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components|libs)/,
        use: [
          // 并行打包
          {
            loader: "thread-loader",
            options: {
              workers: 2,
            },
          },
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 创建前清空 dist 文件夹
    // new CleanWebpackPlugin(),
    // 打包html
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        removeComments: true, // 去掉注释
        collapseWhitespace: true, // 删除空格和换行
      },
    }),
    // 单独提取css
    new MiniCssExtractPlugin({
      // filename: "css/[name].[contenthash:10].css",
    }),
    // eslint 代码审查
    // new ESLintPlugin({
    //   fix: true,
    // }),
  ],
  // mode: "development",
  // mode: "production",
  // devtool: "source-map",
  // devServer: {
  //   contentBase: resolve(__dirname, "dist"),
  //   compress: true,
  //   open: true,
  //   port: 3000,
  //   hot: true,
  // },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        chunks: "all",
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  externals: {
    subtract: ["./libs", "anime"],
    subtract: ["./libs", "glide"],
    subtract: ["./libs", "isotope"],
    subtract: ["./libs", "scrollReveal"],
    // subtract: ["./libs", "smooth-scroll"],
    // Glide: "Glide",
    // ScrollReveal: "ScrollReveal",
    // anime: "anime",
    // isotope: "isotope",
    // SmoothScroll: "SmoothScroll",
  },
};

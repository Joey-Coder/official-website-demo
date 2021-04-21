const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { resolve } = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: resolve(__dirname, "dist"),
    hot: true,
    port: 3000,
    compress: true,
    open: true,
  },
});

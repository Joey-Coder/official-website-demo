const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  // devtool: "source-map",
  plugins: [
    // 压缩图片
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // 无损压缩
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          // ["optipng", { optimizationLevel: 5 }],
          [
            "svgo",
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    }),
  ],
});

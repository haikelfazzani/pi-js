const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devServer:{disableHostCheck:true},
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({ template: "./render_process/index.html", })
  ]
});
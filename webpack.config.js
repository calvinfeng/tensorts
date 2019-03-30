
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./cli/app.tsx",
  output: {
    path: path.join(__dirname, "public"),
    filename: "index.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    compress: true,
    port: 8080
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] }
    ]
  }
};
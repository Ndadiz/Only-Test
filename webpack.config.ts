import path from "node:path";
import webpack from "webpack";
import  "webpack-dev-server";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: webpack.Configuration = {
  entry: "./src/main.tsx",
  module: {

    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
    }
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html'})], 
  devServer: {
    hot: true,
        port: 3000,
        open: true
  }
};

export default config;
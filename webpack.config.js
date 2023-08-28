const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
});

module.exports = {
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3002,
    historyApiFallback: {
      index: "/public/index.html",
    },
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/react",
              [
                "@babel/env",
                {
                  targets: { browsers: ["last 2 version"] },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(s[ac]ss|css)$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
         "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
          "less-loader",
        ],
      },
      
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      globalize$: path.resolve(
        __dirname,
        "node_modules/globalize/dist/globalize.js"
      ),
      globalize: path.resolve(
        __dirname,
        "node_modules/globalize/dist/globalize"
      ),
      cldr$: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr.js"),
      cldr: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr"),
    },
    extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"],
  },
  plugins: [
    htmlPlugin,
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new ModuleFederationPlugin({
      name: "MicroFrontend",
      filename: "remoteEntry.js",
    }),
  ],
};

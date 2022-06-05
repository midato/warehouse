const webpack = require("webpack");
require("dotenv").config({ path: ".env" });

module.exports = {
  /*resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      module: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      http2: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty",
      assert: require.resolve("assert"),
      buffer: require.resolve("buffer"),
      console: require.resolve("console-browserify"),
      constants: require.resolve("constants-browserify"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      process: require.resolve("process/browser"),
      stream: require.resolve("stream-browserify"),
      fa: false,
    },
  },*/
  plugins: [
    /*new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),*/
    new webpack.DefinePlugin({
      $ENV: {
        NG_APP_EWH_ENVIRONMENT: JSON.stringify(process.env.NG_APP_EWH_ENVIRONMENT),
        NG_APP_EWH_BASE_URL_OAUTH_API: JSON.stringify(
          process.env.NG_APP_EWH_BASE_URL_OAUTH_API
        ),
        NG_APP_EWH_BASE_URL: JSON.stringify(process.env.NG_APP_EWH_BASE_URL),
        NG_APP_EWH_VERSION: JSON.stringify(process.env.NG_APP_EWH_VERSION),
      },
    }),
  ],
};

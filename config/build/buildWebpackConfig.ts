import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import buildLoaders from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import buildResolvers from "./buildResolvers";
import { BuildOptions } from "./types/config";

export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const { entry, build } = options.paths;
  const { mode, isDev } = options;
  return {
    mode,
    entry,
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(),
    output: {
      filename: "[name].[contenthash].js",
      path: build,
      clean: true,
    },
    devtool: isDev ? "inline-source-map" : undefined,
    plugins: buildPlugins(options),
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}

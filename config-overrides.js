const webpack = require("webpack");

module.exports = function override(config, env) {
    config.resolve.fallback = {
        url: require.resolve("url"),
        fs: require.resolve("graceful-fs"),
        buffer: require.resolve("buffer"),
        stream: require.resolve("stream-browserify"),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: "process/browser",
            buffer: ["buffer", "buffer"],
        }),
        new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
            const mod = resource.request.replace(/^node:/, "");
            switch (mod) {
                case "buffer":
                    resource.request = "buffer";
                    break;
                case "stream":
                    resource.request = "readable-stream";
                    break;
                default:
                    throw new error(`not found ${mod}`);
            }
        }),
    );
    config.ignorewarnings = [/failed to parse source map/];

    return config;
};
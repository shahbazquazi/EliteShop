// const webpack = require('webpack');
// module.exports = function override(config, env) {

//     config.resolve.fallback = {
//         fs: false,
//         url: require.resolve('url'),
//         path: require.resolve("path-browserify"),
//         crypto: require.resolve('crypto-browserify'),
//         querystring: require.resolve("querystring-es3"),
//         http: require.resolve('stream-http'),
//         buffer: require.resolve('buffer'),
//         stream: require.resolve('stream-browserify'),
//     };
//     config.plugins.push(
//         new webpack.ProvidePlugin({
//             process: 'process/browser',
//             Buffer: ['buffer', 'Buffer'],
//         }),
//     );

//     return config;
// }
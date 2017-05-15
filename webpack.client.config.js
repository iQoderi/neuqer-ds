const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: './ds.build.js',
    },
    output: {
        path: path.join(__dirname, 'dist/client'),
        filename: 'ds.min.js',
        chunkFilename: '[name].js',
        library: 'ds',
        libraryTarget: 'umd'
    },
    context: path.join(__dirname),
    devtool: false,
    module: {
        rules:  [
            {
                test: /\.js$/,
                loaders:'babel-loader',
                exclude: /node_modules/,
            }]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__SERVER__': 'true',
            '__env__': JSON.stringify(process.env.BUILD_ENV),
            '__useConsul__': JSON.stringify(process.env.useConsul)
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    ],

    resolve: {
        extensions: [' ', '.js'],
    }
}

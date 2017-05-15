const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: './ds.build.js',
    },
    output: {
        path: path.join(__dirname, 'dist/server'),
        filename: 'ds.js',
        chunkFilename: '[name].js',
        libraryTarget: "commonjs2"
    },
    context: path.join(__dirname),
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
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
            '__SERVER__': 'false',
            '__env__': JSON.stringify(process.env.BUILD_ENV),
            '__useConsul__': JSON.stringify(process.env.useConsul)
        })
    ],

    resolve: {
        extensions: [' ', '.js'],
    }
}

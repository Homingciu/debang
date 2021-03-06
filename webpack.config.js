var webpack = require('webpack');
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({minimize: true});
var CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': "jquery"});
module.exports = {
    entry: {index: './src/js/entry.js', index2: './src/js-2/entry.js'},
    output: {
        path: './out/',
        publicPath: 'http://localhost:8080/out/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
            {test: /\.(jpg|png|svg|gif)$/, loader: 'url-loader?limit=8192&name=./[name].[ext]'}
        ]
    },
    plugins: [uglifyPlugin, CommonsChunkPlugin, providePlugin
]
}
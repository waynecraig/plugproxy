var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: path.join(__dirname, 'js/main.js'),

    output: {
        path: path.join(__dirname, 'static'),
        filename: '[name].js'
    },

    module: {
        loaders: [
			{
				test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=react,presets[]=es2015'
			},
			{
				test: /\.sass$/,
				loader: "style!css!sass?indentedSyntax"
			}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ template: 'views/index.html' })
    ],

    watch: true
}

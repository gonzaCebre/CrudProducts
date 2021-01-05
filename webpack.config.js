const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production'; //Establece en que modo esta, si desarrollo o produccion

module.exports = {
    entry: './frontend/app.js', //Va a tomar el codigo js de app.js
    output: {
        path: path.join(__dirname, 'backend/public'), //Lo va a enviar a la carpeta public del backend
        filename: 'js/bundle.js'
    },
    mode: 'development',

    module: {
        rules: [
            { 
               test: /\.css/, //Va a testear todos los archivos .css
               use: [
                   devMode ? 'style-loader' : MiniCssExtractPlugin.loader, //Si esta en desarrollo va a guardar los estilos en el js. En produccion en su propio css
                   'css-loader'
               ]
            } 
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html', //Va a convertir el archivo html y mandar al public tambien
            minify: { //Minimiza el html para produccion
                collapseWhitespace: true, //Para que borre los espacios en blanco
                removeComments: true, //Elimina los comentarios
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css' //Va a tomar los estilos css y los va a transformar a un .css en una carpeta publica del backend
        })
    ],
    devtool: 'source-map'
}
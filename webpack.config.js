var webpack = require('webpack');
var path = require('path');

module.exports = {
    
    entry: {
        // where react code begins
        app: './src/app.jsx'
    },
    output: {
        // where to put transpiled code
        filename: 'public/build/bundle.js',
        // makes debugging easier
        sourceMapFilename: 'public/build/bundle.map'
    },
    devtools: '#source-map',
    
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
}
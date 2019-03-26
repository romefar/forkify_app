// webpack config file

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* in webpack we have 6 core concepts: 
    - entry point (string)
    - output (object)
    - loaders
    - plugins (array)
    - mode (development (without any optimization) and production (enable all kind of optimization (minification/tree shaking)))
    - browser compability
*/

module.exports = { 
    entry: [                // where wabpack searching for all dependencies (js files) "./" - means current folder
        "@babel/polyfill",
        "./src/js/index.js"
    ],
    output: { 
        path: path.resolve(__dirname, 'dist'), // we need to specify an absolute path!!!
        filename: 'js/bundle.js'                     // __dirname return a cuurent absolute path to our project
    },
    //mode: "development" // we can use mode in our npm script to configure our build
    devServer: { 
        contentBase: path.resolve(__dirname, 'dist') // Tell the server where to serve content from. This is only necessary if you want to serve static files
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/, // files which ends with .js
                exclude: /node_modules/, // exclude all files from node_modules

                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};

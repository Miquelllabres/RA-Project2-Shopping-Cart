/**
 * Created by Edward_J_Apostol on 2016-08-29.
 */
/*
 The commands listed below are from Node.js documentation
 I assume you installed node, otherwise, this would not work
 If you are unsure what node.js does, visit http://www.nodejs.org .
 In a nutshell, nodejs is a 'server-side' javascript interpreter that runs outside the web page and performs tasks related to your OS.

require: means require something
path: helps finds files and folders - https://nodejs.org/api/path.html
resolve: figures out the full 'path' to a file or folder

e.g. require ('webpack') means you need webpack (assuming you installed it)_

*/

const join = require('path').join;
const resolve = require('path').resolve;
const webpack = require('webpack');

/*
// PATHS defines an object that will reference appropriate directories
// that will be built by webpack. Optional. Of course you can
// reference the directories that you need directly as hard-coded values
// (strings) for the properties in the module.exports object.
*/
console.log('__dirname = ' + __dirname);

const PATHS = {
    src: join(__dirname, 'src'),
    fonts: join(__dirname, 'fonts'),
    build: 'build'
};

// build: join(__dirname, 'build')

// Thus the PATHS constant above can help refer to your folders.
// PATHS.src = your folder called "src"
// PATHS.build = your folder called "build"
// etc.

// module.exports configuration
// in output: specify the URL directory path you use for browsing
// i.e. http://someaddress:somePort/yourProjectName
// modules - what you need to compile i.e. JS and CSS with
// devTool - see https://webpack.github.io/docs/configuration.html#devtool


// process.cwd() is a node command, invoking a module
/* refers to the directory in which server.js was executed,
not the directory in which it lives.
Effectively that means that server.js can never be run
from outside of /path/to/nodejs-module so it can't be daemonized */

module.exports = {
    entry: {
        src: join(PATHS.src, 'index.js')
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: process.cwd(),
        publicPath: '',
        filename: join(PATHS.build,'bundle.js')
    },
    module: {
        loaders: [
        {
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: PATHS.src
        },
        {
            test: /\.js$/,
            loader: 'babel',
            include: PATHS.src,
            exclude: /node_modules/
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            include : PATHS.fonts,
            loader: `file?name=/fonts/[name].[ext]`
        }]
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: process.cwd(),

        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,

        // display only errors to reduce the amount of output
        stats: 'errors-only',

        // parse host and port from env so this is easy
        // to customize
        host: process.env.HOST,
        port: process.env.PORT
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    watch: true
};

// host: is the IP address you wish to test against.
// you have seen it as 0.0.0.0 or 127.0.0.1 as examples
// here I use NODE, and it has an object called process
// which contains an object called env, which has properties
// called HOST and PORT, which you can set at the terminal, or
// use defaults (which I think is 127.0.0.1 and port 8080)

// the plugins setting above allows the page to be auto-refreshed.
// the "HotModuleReplacementPlugin()" is a plugin for webpack that
// performs the task.
// the tech info is at - https://webpack.github.io/docs/hot-module-replacement.html


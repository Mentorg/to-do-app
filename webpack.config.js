const path = require("path");
module.exports = {
    entry: "./src/init.js",
    devtool: 'source-map',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
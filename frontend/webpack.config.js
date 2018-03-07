var webpack = require('webpack');

module.exports = {
    // 页面入口文件配置
    entry : './src/index.js',
    // 入口文件输出配置
    output : {
        path : __dirname ,
        filename : '[name].bundle.js'
    },
    // resolveLoader: {
    //     root: path.join(__dirname, 'node_modules')
    // },
    module: {
        // 加载器配置
        rules: [
            {
                enforce: "post",
                test: /.js$/,
                loader: 'es3ify'
            }
        ],
        loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader!jsx-loader?harmony'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }
        ]
    },
    // 其他解决方案配置
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.json'],
    },
    // 插件项
    plugins : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
}
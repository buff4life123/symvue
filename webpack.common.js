const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    name: 'common',
    entry: {
        app: './assets/main.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: true // optional
                            },
                        },
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                type: 'javascript/auto',
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: (file) => {
                                let path = file.split("flag-icon-css/")[1]; //this will yield assets/img/img1.png     
                                return 'dist/images/'+path
                            }
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname, 'node_modules/flag-icon-css'),
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'dist/fonts/'
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname, 'node_modules/@fortawesome'),
                    path.resolve(__dirname, 'node_modules/@mdi'),
                ],
            },
            {
                type: 'javascript/auto',
                test: /\.(png|jpe?g|gif|svg|ico|xml|json|webmanifest)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: (file) => {
                                let path = file.split("assets/")[1]; //this will yield assets/img/img1.png     
                                return 'dist/'+path
                            }
                        }
                    }
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
            },
            {
                test: /favicon\.ico?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        }
                    }
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist/']
        }),
    ],
    optimization: {},
    output: {
        filename: './dist/[name].js',
        // path: path.resolve(__dirname, 'dist')
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'assets'),
            '#': path.resolve(__dirname, 'assets'),
        }
    },
}
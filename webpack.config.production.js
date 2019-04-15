const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        vendor: ["semantic-ui-react"],
        app: "./src/index.js"
    },
    output: {
        // "static" 디렉토리 안에 자바스크립트 번들을 생성한다.
        filename: "static/[name].[hash].js",
        // 출력 디렉토리는 "dist" 이다.
        // "__dirname"은 현재 디렉토리의 절대경로를 제공하는 Node 변수
        // "path.resolve"로 디렉토리를 합친다.
        // 웹팩4는 출력 경로를 "./dist"로 가정하기 때문에 이부분을 그대로 둘 수 있다.
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    // 프로덕션 소스맵
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                // "Extract Text Plugin" 구성한다.
                use: ExtractTextPlugin.extract({
                    // CSS가 추출되지 않으면 loader가 실행된다.
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                // @import(ed) 리소스에 css-loader를 적용하기 전 로더를 구성한다.
                                importLoaders: 1,
                                camelCase: true,
                                // CSS 파일을 위해 소스 맵을 생성한다.
                                sourceMap: true
                            }
                        },
                        {
                            // css-loader 전에 PostCSS이 실행되어 압축(minify)하고 CSS 룰을 적용하고 
                            // 자동 전처리(autoprefixer)를 실행한다.
                            // 자동 전처리 단계에서 최신 브라우저 2 사양을 사용한다
                            loader: "postcss-loader",
                            options: {
                                config: {
                                    ctx: {
                                        autoprefixer: {
                                            browsers: "last 2 versions"
                                        }
                                    }
                                }
                            }
                        }
                    ]
                })
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    test: "vendor",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            favicon: "public/favicon.ico"
        }),
        // "styles" 디렉토리 내 스타일시트를 생성한다.
        new ExtractTextPlugin({
            filename: "styles/styles.[hash].css",
            allChunks: true
        })
    ]
};
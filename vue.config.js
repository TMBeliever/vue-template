const path = require('path');

function resolve (dir) {
    return path.join(__dirname, './', dir);
}

module.exports = {
    // runtimeCompiler: true,
    devServer: {
        proxy: {
            '/mock': {
                target: 'http://10.10.16.70:3000/mock/13/fssc/api/v1/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/mock/rt': ''
                }
            },
            '/rt': {
                target: 'localhost:8080',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/rt': ''
                }
            }
        }
    },
    chainWebpack: config => {
        // svg loader
        const svgRule = config.module.rule('svg'); // 找到svg-loader
        svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
        svgRule.exclude.add(resolve('src/common/icons/fonts'));
        svgRule // 添加svg新的loader处理
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });

        // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
        config.plugin('define').tap(args => {
            args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL);
            return args;
        });
        // 修改images loader 添加svg处理
        const imagesRule = config.module.rule('images');
        imagesRule.exclude.add(resolve('src/common/icons/svg'));
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    },
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/assets/css/varuables.scss` 这个文件
                data: `@import "./src/common/css/var";`
            }
        }
    }
};

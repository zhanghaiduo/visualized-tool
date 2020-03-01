const path = require('path');

/**
 * @function
 * @param {String} dir 路径名
 * @returns {String} 处理好的绝对路径
 * @description 将相对路径转为绝对路径
 */
function resolve (dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    publicPath: './',
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('api', '@/api')
            .set('assets', '@/assets')
            .set('images', 'assets/images')
            .set('styles', '@/styles')
            .set('components', '@/components')
            .set('utils', '@/utils')
            .set('views', '@/views')
            .set('mixin', '@/mixin');
        // config
        //     .plugin('webpack-bundle-analyzer')
        //     .use(BundleAnalyzerPlugin);
    },
    devServer: {
        proxy: {
            '/api': {
                target: '',
                changeOrigin: true,
            },
        },
    },
};

const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

let staticPath = ""
let baseApiTest = ""
let baseApi = ""
let baseUrlTest = ""
let baseUrl = ""

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? staticPath : '/',
    chainWebpack: config => {
        config
        .entry('index')
        .end();
        config.resolve.symlinks(true);
        config.plugin('define').tap(args => {
            const argv = process.argv
            const mode = argv[argv.indexOf('--project-mode') + 1]
            args[0]['process.env'].MODE = `"${mode}"`
            args[0]['process.env'].BASE_API = mode === 'dev' ? `"${baseApiTest}"` : `"${baseApi}"`
            args[0]['process.env'].BASE_URL = mode === 'dev' ? `"${baseUrlTest}"` : `"${baseUrl}"`
            args[0]['process.env'].STATIC_PATH = mode === 'dev' ? `""` : `"${staticPath}"`
            return args
        })

        config.resolve.alias
        .set('@', resolve('src'))
        .set('@components', resolve('src/components'))
        .set('@apis', resolve('src/apis'))
        .set('@assets', resolve('src/assets'))
        .set("@store", resolve("src/store"))
        .set("@views", resolve("src/views"))
        .set("@mixins", resolve("src/mixins"))
    },
}
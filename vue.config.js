module.exports = {
    devServer:{

        proxy:{

            '/api':{
                target:'http://kabutack.free.svipss.top',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}
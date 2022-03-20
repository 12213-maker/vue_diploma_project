module.exports = {
    devServer:{

        proxy:{
            '/api2':{
                target:'http://paiwu.free.svipss.top',
                changeOrigin: true,
                ws:true,
                pathRewrite: {
                    '^/api2': ''
                }
            },

            '/api':{
                target:'http://kabutack.free.svipss.top',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            
        }
    },
}
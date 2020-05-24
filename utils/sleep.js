module.exports = function(time) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // 返回 ‘ok’
                resolve('ok')
            }, time)
        })
    }

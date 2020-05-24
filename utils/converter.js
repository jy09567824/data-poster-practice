const OpenCC = require('opencc')
let opencc = new OpenCC('s2t.json')

module.exports = function(rawresult) {
    let converted = opencc.convertSync(rawresult)
    return converted
}
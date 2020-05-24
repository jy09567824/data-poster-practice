const fs = require('fs') 

// 模組化方法 CommonJS
module.exports = function(error_data) {
    // read error-keyword JSON
    let result = JSON.parse(fs.readFileSync('./error-keyword.json'))
    // put error-object in data
    error_data.id = ( result.data.length + 1 )
    result.data.push(error_data)
    console.log(result)
    // Save data
    fs.writeFileSync('./error-keyword.json', JSON.stringify(result, null, 2))
    return result    
}

// 一般方法
// function saveErrorData(obj) {
//     // read error-keyword JSON
//     let result = JSON.parse(fs.readFileSync('./error-keyword.json'))
    
//     // test error-object
//     // const newobj = {
//     //     id: ( result.data.length + 1 ),
//     //     keyword_id: 999,
//     //     title: '測試測試測試',
//     //     sub_category_id: 99
//     // }

//     // put error-object in data
//     result.data.push(obj)
//     console.log(result)
//     // Save data
//     fs.writeFileSync('./new-keyword.json', JSON.stringify(result, null, 2))
//     return result
// } 

// saveErrorData()

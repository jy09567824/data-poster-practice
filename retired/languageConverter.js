// JSON 簡中翻繁中測試

const fs = require('fs')
const OpenCC = require('opencc')
const sleep = require('./utils/sleep')

// Load the default Simplified to Traditional config
let opencc = new OpenCC('s2t.json')

// Sync API
//let converted = opencc.convertSync("汉字")
//console.log(converted); // 漢字

//輸入要翻譯的 JSON 檔案
const hans = fs.readFileSync('./keyword/3m抗痘凝露dcard.json')
const json = JSON.parse(hans)

async function converter() {
    let waiting = await sleep(2000)
    json.forEach(element => {
        console.log(element.title)
        let converted = opencc.convertSync(element.title)
        console.log(converted)
        console.log(waiting)
    })
}

converter()


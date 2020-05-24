// 讀取關鍵字列表 addKeyword.txt，新增每筆 Keyword 關鍵字到指定 API 上

const axios = require('axios')
const lines_to_array = require('./utils/lines-to-array')
const sleep = require('./utils/sleep')

axios.defaults.headers.common['Authorization'] = `3W4o#Ib3%HUGpoQGjXm8Lh`

async function addKeyword() {
    const data = lines_to_array('./addKeyword.txt')
    console.log(data)

    let keyword = {
        title: '',
        sub_category_id: ''
    }

    for( i = 0; i < data.length; i++ ) {
        console.log(data[i])

        keyword.title = data[i]
        keyword.sub_category_id = 11 // 欲新增的子分類ID
        console.log(keyword)

        await axios.post( 'https://api.pbn-content.inboundmarketing.com.tw/api/keywords', keyword )
        await sleep(800)
    }
}

addKeyword()
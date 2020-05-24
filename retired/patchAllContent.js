// get 目前 PBN 上所有 content，翻譯後 patch

const fs = require('fs')
const axios = require('axios')
const OpenCC = require('opencc')
const sleep = require('../utils/sleep')

const opencc = new OpenCC('s2t.json')

axios.defaults.headers.common['Authorization'] = `3W4o#Ib3%HUGpoQGjXm8Lh`

async function patchContent() {
    // 讀取 API 內的資料
    // const { data } = await axios.get(`https://api.pbn-content.inboundmarketing.com.tw/api/contents/`)
    const rawdata = fs.readFileSync('./test.json',)
    const data = JSON.parse(rawdata).data
    console.log(data)

    // 迴圈執行每筆ID
    for (const keyword of data) {
        console.log(keyword)
        const results = keyword.content
        console.log(results)
        // 新增欲更新之資料 newContent
        let newContent = {
            id: '',
            keyword_id: '',
            content: []    
        }
        newContent.id = keyword.id
        newContent.keyword_id = keyword.keyword_id 
        // 迴圈跑 Content 中每筆資料，簡中翻譯繁中
        for (const result of results) {
            // 新增物件供新資料使用
            let eachResult = {
                url: result.url,
                title: '',
                description: ''
            }
            try {
                let newTitle = await opencc.convertSync(result.title)
                eachResult.title = newTitle
            } catch(e) {
                console.log(e)
            }
            try {
                let newDescription = await opencc.convertSync(result.description) 
                eachResult.description = newDescription  
            } catch(e) {
                console.log(e)
            }             
            newContent.content.push(eachResult)
            await sleep(500)
        }
        
        // 更新資料到 API
        console.log(newContent)
        fs.writeFileSync(`./id_${newContent.keyword_id}.json`,JSON.stringify(newContent, null, 2))
    }
}

patchContent()

// 迴圈翻譯 content ID 範圍內資料後 patch

const fs = require('fs')
const axios = require('axios')
const OpenCC = require('opencc')
const sleep = require('../utils/sleep.js')
const opencc = new OpenCC('s2t.json')

axios.defaults.headers.common['Authorization'] = `3W4o#Ib3%HUGpoQGjXm8Lh`

async function update() {
    // Get content/${id}/ by Loop
    for ( i = 500; i < 550; i++ ) {
    const { data } = await axios.get(`https://api.pbn-content.inboundmarketing.com.tw/api/contents/${i}/`)
    
    console.log('Content ID: '+i+' is translating...')

    let newContent = {
        keyword_id: '',
        content: []
    }

    newContent.keyword_id = data.data.keyword_id 
    console.log('Keyword ID is: '+data.data.keyword_id)
    // Translate each Title & Description in content array
    for (const result of data.data.content) {
        let eachResult = {
            url: result.url,
            title: '',
            description: ''
        }

        try { 
            let newTitle = await opencc.convertSync(result.title)
            let newDescription = await opencc.convertSync(result.description)
            // push newTitle & newDescription to eachResult
            eachResult.title = newTitle
            eachResult.description = newDescription

            // push eachResult to newContent
            newContent.content.push(eachResult)
            // take 0.5 second rest
            await sleep(500)
        } catch (e) {
            console.log(e)
        }
    }
    // 更新資料到 API
    await axios.patch(`https://api.pbn-content.inboundmarketing.com.tw/api/contents/${i}/`, newContent)
    // fs.writeFileSync(`./id.json`,JSON.stringify(newContent, null, 2))
    console.log('Translation completed!')
}
}
update()
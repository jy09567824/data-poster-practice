// 執行爬蟲輸入關鍵字爬取百度資料，爬取後翻譯成繁中並存檔、上傳 API

const fs = require('fs')
const line_to_array = require('./utils/lines-to-array.js')
const axios = require('axios')
const cralwer = require('./utils/baidu.js')
const saveErrorData = require('./utils/saveErrorData.js')
const converter = require('./utils/converter.js')
const shuffle = require('./utils/shuffle.js')

axios.defaults.headers.common['Authorization'] = `3W4o#Ib3%HUGpoQGjXm8Lh`

async function main() {
    // 1-a. get keywords list from API server
    const { data } = await axios.get('https://api.pbn-content.inboundmarketing.com.tw/api/keywords')

    // 2-a. ask robot for crawling
    for ( i = 501; i < 503 ; i ++ ) { // run 501 ~ 503
        let keyword = data.data
        //crawl each title & description
        const rawresult = await cralwer(keyword[i].title)
    
    // 1-b. get keywords list from keywords.json
    // const rawdata = JSON.parse(fs.readFileSync('./keywords.json'))
    // const data = rawdata.data
    // console.log(data)
    
    // 2-b. ask robot for crawling keyword results
    // for ( const keyword of data) {
    //     console.log(keyword.title)
    //     // crawl each keyword
    //     const rawresult = await cralwer(keyword.title)

    // 1-c. get keywords list from keywords.txt
    //const data = line_to_array('./keywords.txt')
    // 2-c. ask robot for crawling keywords.test results
    // for ( i = 0 ; i < data.length ; i ++ ) {
    //     const rawresult = await cralwer(data[i])
    //}

    // 3. translate data to zh-TW
        strRawResult = JSON.stringify(rawresult)
        const strResult = await converter(strRawResult)
        const allResult = JSON.parse(strResult)
    
    // 4. shuffle data
        const shuffledResult = shuffle(allResult)
        // get the first 10 value from result & post to API
        const result = shuffledResult.slice(0,11)

    // 5. post to API server
        // prepare API data format
        const data_to_send = {
            keyword_id: keyword[i].id,
            content: result
        }
        // prepare error data format
        const error_data = {
            id: '',
            keyword_id: keyword.keyword_id,
            title: keyword.title,
            sub_category_id: keyword.sub_category_id
        }
        console.log(data_to_send)

        try {
            // await axios.post('https://api.pbn-content.inboundmarketing.com.tw/api/contents', data_to_send)
            console.log('post successfully')
        } catch (e) {

            console.log(error_data)
            saveErrorData(error_data)
        }
    }
}
 
main()

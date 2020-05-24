// 新增 Backlink 到指定 PBN 上（ 目前用 Swagger API 取代 ）

const axios = require('axios')

axios.defaults.headers.common['Authorization'] = `3W4o#Ib3%HUGpoQGjXm8Lh`

async function addBacklink() {  
    const backlink = {
        name: '123',
        url: '123',
        subcategory_id: 123
    }  
    const { data } = await axios.post('https://api.pbn-content.inboundmarketing.com.tw/api/backlink/',backlink)
}

addBacklink()
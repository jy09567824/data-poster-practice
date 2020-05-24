// 讀取子分類列表 addSubcat.txt，新增 SubCategory 子分類到指定 PBN 上

const axios = require('axios')
const lines_to_array = require('./utils/lines-to-array')

axios.defaults.headers.common['Authorization'] = `3W4o#Ib3%HUGpoQGjXm8Lh`

// read subcat list & convert lines to array
async function addSubcat() {
    // 欲新增資料換行方式獵列於 add-subcat.txt
    const data = lines_to_array('./addSubcat.txt')
    console.log(data)
    
    let subcat = {
             name: '',
             category_id: ''
            }
    
    //  by for-loop
    for( i = 0; i < data.length; i++ ) {
        console.log(data[i])
    
        // put data in subcat 
        subcat.name = data[i]  // 每筆關鍵字名稱
        subcat.category_id = '2'  // 填要隸屬的分類ID
        console.log(subcat)
    
        // post subcat to api
        await axios.post( 'https://api.pbn-content.inboundmarketing.com.tw/api/sub_categories', subcat )  
    }
}

addSubcat()
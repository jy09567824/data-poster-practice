const puppeteer = require('puppeteer')
const fs = require('fs')

module.exports = (keyword) => {
    let scrape = async () => {
        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()
        // keyword 輸入要爬的關鍵字
        await page.goto('https://www.baidu.com/')
        await page.focus('#kw')
        await page.type('#kw',keyword,{delay: 300})
        await page.click('#su')
        await page.waitFor(3000) //等待時間
    
        let data = []
    
        // 迴圈條件輸入爬蟲爬取的頁面數量
        for (let i = 1; i <= 4; i++) {
            // 爬取每頁10筆資料
            data = await page.evaluate(async ({ i, data }) => {
                let elements = document.querySelectorAll('.result.c-container')
                // console.log(elements)
                // 迴圈執行每筆搜尋結果
                for ( var element of elements) {
    
                    const result = {}
    
                    result.title = element.querySelector('h3>a').innerText
                    result.description = element.querySelector('.c-abstract') ? element.querySelector('.c-abstract').innerText : '' 
                    result.url = element.querySelector('h3>a').href
    
                    data.push(result)
                }
                // 選取當前頁面的下一頁連結，如果不可選取則繼續執行
                console.log(i)

                let selector = '#page > a:nth-child('+(i+1)+')'
                if (i !== 1) {
                    selector = '#page > a:nth-child('+(i+2)+')'
                }

                // 點擊換頁，如果不能換頁繼續執行
                try {
                    const ele = await document.querySelector(selector)
                    await ele.click({delay: 2000})
                    console.log('selector', selector)
                } catch (e) {
                    console.log(e.name)
                    console.log(e.messgae)
                }
    
                return data
    
            }, { i, data })
    
            // data.push(results) // 將結果回傳
            await page.waitFor(1000) // 等待時間
        }
        
        fs.writeFileSync(`./keyword/${keyword}.json`, JSON.stringify(data, null, 2)) // 存成json檔
        await browser.close() // 關閉瀏覽器
        return data // 返回資料
    };
    
    // return scrape().then((value) => {
    //     console.log(value) // 爬取成功
    // })

    return scrape()
}

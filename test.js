const shuffle = require('./utils/shuffle')

function test() {
    // const data = JSON.parse(fs.readFileSync('./keyword/2018彩妝趨勢.json'))
    const results = [1,2,3,4,5]
    const result = shuffle(results)

    console.log(result)
    
    // get the first 10 value from result & post to API
    for (let i = 0; i < 10; i++) {
        // console.log(shuffled[i].title)
        // console.log(shuffled[i].description)
    }
}

test()
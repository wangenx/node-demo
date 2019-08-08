const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 文件名
const fileName = path.resolve(__dirname, '../', '../', 'logs', 'access.log');

// 创建 read stream
const readStream = fs.createReadStream(fileName);

// 创建 readline
const rl = readline.createInterface({
    input: readStream
})

let ChromeNum = 0;
let Sum = 0;

// 逐行读取
rl.on('line', lineData => {
    if(!lineData) {
        return;
    }

    // 记录总行数
    Sum++;

    const arr = lineData.split(' -- ');
    if(arr[2] && arr[2].indexOf('Chrome') > 0) {
        // 累加 Chrome 的数量
        ChromeNum++
    }
}) 

// 监听读取完成
rl.on('close', ()=> {
    console.log('Chrome 的占比：' + ChromeNum / Sum);
})
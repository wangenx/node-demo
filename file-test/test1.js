const fs = require('fs');
const path = require('path');

// 读取文件
const fileName = path.resolve(__dirname, 'data.txt');

// 读取文件内容
fs.readFile(fileName, (err, data) => {
    if(err) {
        console.error(err);
        return 
    }
    // data 是二进制类型， 需要转换成字符串
    console.log(data.toString())
})

// 写入文件
const content = '这是要写入的内容\n';
const opt = {
    flag: 'a'  // 追加写入 a , 覆盖写入 w
}

fs.writeFile(fileName, content, opt, (err) => {
    if(err) {
        console.error(err);
    }
})

// 判断文件是否存在
fs.exists(fileName, (exists) => {
    console.log('exists: ' + exists)
})
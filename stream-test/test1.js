// 标准的输入输出
// process.stdin.pipe(process.stdout);

const http = require('http');
const fs = require('fs');
const path = require('path');

// const server = http.createServer((req, res) => {
//     if(req.method === 'POST') {
//         req.pipe(res);
//     }
// })

// server.listen(8000)

// 复制文件

// const fileNme1 = path.resolve(__dirname, 'data.txt');
// const fileNme2 = path.resolve(__dirname, 'data-bak.txt');

// const readStream = fs.createReadStream(fileNme1);
// const writeStream = fs.createWriteStream(fileNme2);

// readStream.pipe(writeStream);
// readStream.on('data', chunk => {
//     console.log(chunk.toString())
// })
// readStream.on('end', () => {
//     console.log('copy done');
// })

// 结合http返回文件内容
const fileNme1 = path.resolve(__dirname, 'data.txt');
const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        const readStream =  fs.createReadStream(fileNme1);
        readStream.pipe(res);
    }
})
server.listen(8000)
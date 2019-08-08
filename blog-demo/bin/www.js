const http = require('http');
const PORT = 8000;
const serverHandle = require('../app')

// 创建 http 链接
const server = http.createServer(serverHandle);

server.listen(PORT);

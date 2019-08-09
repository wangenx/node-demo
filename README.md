node 文件操作
    1、读取文件路径 path.resolve()
    2、读取文件内容 readFile(path, (err, data) => {})
    3、写入文件内容 writeFile(path, content, opt, (err) => {})  // opt：flag为a时追加内容，flag为w时覆盖内容
    4、判断文件是否存在 exists(path, (exists) => {}) // exists为true（存在），为false（不存在）

stream 操作
    1、createReadStream()  // 创建读取操作
    2、createWriteStream() // 创建写入操作
    3、pipe() // 链接操作

http 操作
    1、createServer((req, res) => {}) // 创建http链接

.gitignore 操作

async await 要点:
    1、await 后面可以再追加 promise 对象，获取 resolve 的值
    2、await 必须包裹在 async 函数里面
    3、async 函数执行也是返回一个 promise 对象
    4、try-catch 截获 promise 中 reject 的值
    
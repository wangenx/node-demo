const http = require('http');
const querystring = require('querystring');


const server = http.createServer((req, res) => {
    console.log("method:", req.method) //GET
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    console.log('url:', url);
    query = querystring.parse(url.split('?')[1]);
    console.log("query:", req.query);
    // 设置返回的格式 json
    res.setHeader('Content-type', 'application/json')

    // 返回数据
    const resData = {
        method,
        url,
        path,
        query
    }

    // 返回
    if(method === 'GET') {
        res.end(
            JSON.stringify(resData)
        )
    }

    if(method === 'POST') {
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString  ();
        })
        req.on('end', ()=> {
            resData.postData = postData;
            // 返回
            res.end(
                JSON.stringify(resData)
            )
        })
    }
});

server.listen(8000)
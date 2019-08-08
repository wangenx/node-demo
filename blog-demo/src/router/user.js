const { SuccessModel, ErrorModel } = require('../model/resModel');

const { login } = require('../controller/user');

const { set } = require('../db/redis');

const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];

    const { username, password } = req.body;
    if(method === 'POST' && path === '/api/user/login') {
        const result = login(username, password);
        return result.then(data => {
           if(data.username) {
               // 设置 session
               req.session.username = data.username;
               req.session.realname = data.realname;
               // 同步到 redis
               set(req.sessionId, req.session);

               return new SuccessModel();
           }
           return ErrorModel('登录失败')
        })
    }
}

module.exports = handleUserRouter;
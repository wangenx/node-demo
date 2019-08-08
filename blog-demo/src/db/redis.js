const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('err', err => {
    console.log(err);
})

// 设置 redis
function set(key, val) {
    if(typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
}

// 获取 redis
function get(key) {
    const promise = new Promise((reslove, reject) => {
        redisClient.get(key, (err, val) => {
            if(err) {
                reject(err);
                return;
            }
            if(val == null) {
                reslove(null);
                return;
            }
            try {
                reslove(
                    JSON.parse(val)
                )
            }catch(ex) {
                reslove(val)
            }
        })
    })
    return promise;
}

module.exports = {
    set, 
    get
}
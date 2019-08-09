const http = require('http');
const slice = Array.prototype.slice;

class likeExpress {
  constructor (){
    // 存放中间件
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }

  register (path) {

    const info = {};
    if(typeof path === 'string') {
      info.path = path;
      // 从第二个参数开始存入 stack
      info.stack = slice.call(arguments, 1);
    }else {
      info.path = '/';
      // 从第一个参数存入 stack
      info.stack = slice.call(arguments, 0);
    }
    return info;
  }
  all() {
    const info = this.register.apply(this, arguments);
    this.routes.all.push(info);
  }
  get() {
    const info = this.register.apply(this, arguments);
    this.routes.get.push(info);
  }
  post() {
    const info = this.register.apply(this, arguments);
    this.routes.get.push(info);
  }

  // 核心 next 机制
  hadl(req, res, stack) {
    const next= () => {
      const middlewear = stack.shift();
      if(middlewear) {
        // 执行中间件
        middlewear(req, res, next)
      }
    }
    next()
  }


  match(url, method) {
    let stack = [];
    if(url === '/favicon.ico') {
      return stack;
    }

    // 获取routes
    let curRoutes = [];
    curRoutes = curRoutes.concat(this.routes.all);
    curRoutes = curRoutes.concat(this.routes[method]);

    curRoutes.forEach((routeInfo) => {
      if(url.indexOf(routeInfo.path) === 0) {
        stack = stack.concat(routeInfo.stack)
      }
    })
    return stack;
  }

  callback() {
    return (req, res) => {
      res.json = data => {
        res.setHeader('Content-type', 'application/json');
        res.end(
          JSON.stringify(data)
        )

        const url = req.url;
        const method = req.method.toLowerCase();

        // 区分访问哪一个中间件
        const resultList = this.match(url, method);
        this.hadl(req, res, resultList);
      }
    }
  }


  listen(...agrs){
    const server = http.createServer(this.callback());
    server.listen(...agrs);
  }
}

// 工厂函数
module.exports = () =>{
  return new likeExpress()
}
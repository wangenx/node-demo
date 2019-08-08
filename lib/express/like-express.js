const http = require('http');
const slice = Array.prototype.slice;

class LikeExpress {
  constructor() {
    // 存放中间件列表
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }

  register(path) {

    const info = {};
    if(typeof path === 'string') {
      info.path = path;
      // 从第二个参数开始，转换为数组，存入 stack
      info.stack = slice.call(arguments, 1);  // 数组
    }else {
      info.path = '/'
      // 从第一个参数开始，转换为数组，存入 stack
      info.stack = slice.call(arguments, 0); // 数组
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
    this.routes.post.push(info);
  }

  match(method, url) {
    let stack = [];
    if(url === '/favicon.ico') {
      return stack;
    }

    // 获取 routes
    let curRoutes = [];
    curRoutes = curRoutes.concat(this.routes.all);
    curRoutes = curRoutes.concat(this.routes[method]);

    curRoutes.forEach(routeInfo => {
      if(url.indexOf(routeInfo.path) === 0) {
        stack = stack.concat(routeInfo.stack);
      }
    })
    return stack;
  }

  // 核心 next 机制
  hadle(req, res, stack) {
    const next = () => {
      // 拿到第一个中间件函数
      const middleware = stack.shift();
      if(middleware) {
        // 执行中间件
        middleware(req, res, next);
      }
    }
    next()
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json');
        res.end(
          JSON.stringify(data)
        )
        const url = req.url;
        const method = req.method.toLowerCase();

        // 区分访问哪一个中间件
        const resultList = this.match(method, url);
        this.hadle(req, res, resultList);
      }
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

// 工厂函数
module.exports = () => {
  return new LikeExpress;
}
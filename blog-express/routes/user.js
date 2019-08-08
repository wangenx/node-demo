var express = require('express');
var router = express.Router();
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.post('/login', function(req, res, next) {
  const { username, password } = req.body;
  const result = login(username, password);

  return result.then(data => {
      // console.log(data)
      if(data.username) {
          // 设置 session
          req.session.username = data.username;
          req.session.realname = data.realname;

          res.json(new SuccessModel());
          return;
      }
      res.json(new ErrorModel('登录失败'));
  })
});

// 测试登录
router.get('/login-test', (req, res, next) => {
  if(req.session.username) {
    res.json({
      errno: 0,
      message: '登录成功'
    })
    return;
  }
  res.json({
    errno: -1,
    message: '未登录'
  })
})

module.exports = router;
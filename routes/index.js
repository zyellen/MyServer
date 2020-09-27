var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * 用户名和密码登录
 */
router.post('/api/login_pwd', (req, res) => {
  // 1. 获取数据
  const user_name = req.body.name;
  const user_pwd = req.body.pwd;;
  // const captcha = req.body.captcha.toLowerCase();
  // 3. 查询数据
  let sqlStr = "SELECT * FROM usertab WHERE username = '" + user_name + "' LIMIT 1";
  conn.query(sqlStr, (error, results, fields) => {
      if (error) {
          res.json({err_code: 0, message: '用户名不正确!'});
      } else {
          results = JSON.parse(JSON.stringify(results));
          if (results[0]) {  // 用户已经存在
              // 验证密码是否正确
              if (results[0].userpwd !== user_pwd) {
                  res.json({err_code: 0, message: '密码不正确1!'});
              } else {
                  // req.session.userId = results[0].id;
                  console.log(results[0]);
                  // 返回数据给客户端
                  res.json({
                      success_code: 200,
                      message: "成功登录"
                      });
              }
          } 
      }
     
  });
});



router.post('/api/test', function(req, res, next) {
  // res.render('index', { title: 'test' });
  res.json({code: 200, message: '密码正确!',token:'123456789132456789'});
});

module.exports = router;

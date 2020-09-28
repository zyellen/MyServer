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



router.post('/api/test', function(req, res) {
  const user_name = req.body.username;
  const user_pwd = req.body.password;

  if(user_name=='116230'&&user_pwd=='111111'){
    res.json({code: 20000,data:{roles:['admin'],name:'super'},message:'密码正确!',token:'admin-token'});
  }else{
    res.json({code: 210, message:'密码不正确!',token:'admin-token'});
  }

  // res.render('index', { title: 'test' });
  
});

router.get('/api/userinfo', function(req, res) {


    res.json({code: 20000, message:'密码不正确!',data:{avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    introduction: "I am a super administrator",
    name: "czy"},token:'admin-token'});
 

  // res.render('index', { title: 'test' });
  
});

module.exports = router;

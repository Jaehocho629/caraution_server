const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const carRouter = require('./car');

router.use('/auth', authRouter)
router.use('./car', carRouter)

router.use(function (req, res, next) {
  let addPath
  if (req.cookies) {
    const userPath = req.cookies.userPath;
    const addPath = userPath.concat([req.path]);
  } else {
    const addPath = req.path;
  }
  res.cookie('userPath', addPath)
})
/* GET home page. */
router.get('/', function (req, res, next) {

  // 쿠키 읽기(Request Cookie)
  console.log(req.cookies);


  // 쿠키쓰기(Response Cookie)
  // res.cookie("<key>","<value>","<option>")
  res.cookie('cookieName', 'cookieValue', {
    httpOnly: true,
    secure: false,
    signed: false
  });


  res.send("응답보냄.")
});

router.get('/sessionTest', function (req, res, next) {
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }

  console.log(req.session.viewCount);
  console.log(req.session.profile)
  re
  console.log("session: ");
  console.log(req.session);

  res.send("세션 테스트")
})

module.exports = router;

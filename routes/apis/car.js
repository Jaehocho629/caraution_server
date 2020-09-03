const express = require('exprss');
const router = express.Router();

const passport = require('passport');
router.use(passport.authenticate('jwt'))
router.get('/', function (req, res, next) {
    console.log("--------")
    console.log(req.user)
    res.send("결 과")
});

module.exports = router;
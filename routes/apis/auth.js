const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// bcrypt.hashSync(<password>, <secretKey Length>)
// bcrypt.hash(<password>, <secretKey Length>) // 비동기 호출

// bcrypt.compareSync(<password>, <hashedPassword>)
// bcrypt.compare(<password>, <hashedPassword>) // 비동기

// const passport = require('../../passportConfig')
const passport = require('passport');

const Model = require('../../models');
const UserModel = Model.User;


const JWT = require('jsonwebtoken');

// prefix: /api/auth/
router.get('/', function (req, res, next) {
    res.send("Hello Express");
})



router.post('/register', async function (req, res, next) {
    // json 통신. (postman이용)
    const data = req.body;
    const email = data.email;
    const password = data.password;

    const hashedPassword = bcrypt.hashSync(password, 10)

    const user = await UserModel.findOne({
        where: {
            email: email
        }
    })
    if (user) {
        res.json({
            result: {
                result: 'fail',
                message: "유저가 있습니다."
            }
        })
    }
    UserModel.create({
        email: email,
        password: hashedPassword
    })
    res.json({
        result: {
            result: 'success',
            message: "회원가입 완료"
        }
    });
})

router.post('/login', async function (req, res, next) {
    await passport.authenticate('local', (err, user) => {
        // 로그인 성공시 user 존재
        // 로그인 실패시 user=false 또는 err가 not null
        if (err || !user) {
            return res.status(400).json({
                result: 'fail',
                message: '로그인 중 오류 발생'
            })
        }

        req.login(user, function (err) {

            try {
                if (err) {
                    res.send(err);
                }
                console.log(user)
                const token = JWT.sign(JSON.stringfy(user), process.env.SECRET_KEY);

                return res.json({
                    result: 'success',
                    token: token
                })
            }
            catch (e) {
                console.log(e)
            }

        })


        // console.log("User");
        // console.log(user);

        // console.log("error");
        // console.log(err);

    })(req, res);

    // res.json({})
})



// login, register, logout, 

// passportjs.org
// Passport - Node.js의 인증 라이브러리

// npm install passport       =>  passport 기본 라이브러리
// npm install passport-local =>  passport Local Strategy
// npm install passport-jwt   =>  passport Json Web Token Strategy
// npm install jsonwebtoken   =>  Json Web Token 만들고 분해
// npm install bcryptjs       =>  bcrypt알고리즘 (해시(암호화) 알고리즘) 




module.exports = router;
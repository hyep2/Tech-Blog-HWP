const router = require ('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')



//REGISTERING ROUTE
router.post('/register', (req, res)=> {
  const { username } = req.body
  User.register(new User({username}), req.body.password, err=> {
    if(err) {console.log(err)}
    res.sendStatus(200)
  })
})

//LOGGING IN ROUTE
//will return a jsonwebtoken after inputting login info, which can be used to recognize who the user is and give access to what we want to look at AKA authentication aspect
//we need to hold this via local storage and get it when we need it
router.post('/login', ({body},res)=> {
  User.authenticate()(body.username, body.password, (err,user)=>{
    if(err) {console.log(err)}
    res.json(user ? jwt.sign({id:user.id},process.env.SECRET):null)
  })
})


//LOGOUT ROUTE
router.post('/logout', )

module.exports = router
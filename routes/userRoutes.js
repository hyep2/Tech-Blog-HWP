const router = require ('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')



//registering route
router.post('/register', (req, res)=> {
  const { username } = req.body
  User.register(new User({username}), req.body.password, err=> {
    if(err) {console.log(err)}
    res.json({message: 'User has been registered'})
  })
})

//logging in route


//will return a jsonwebtoken after inputting login info, which can be used to recognize who the user is and give access to what we want to look at; can restrict it to users only


//logging out route
router.post('/logout', ({session},res)=>{
  //when user logs out, you want to destroy the session
  if(session.loggedIn) {
    session.destroy(()=> {
      res.status(204).end()
    })
  }
  else {
    res.status(404).end();
  }
})


module.exports = router
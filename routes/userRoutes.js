const router = require ('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')


//registering route
router.post('/register', async({body,session},res)=> {
  try {
    const newUser = await User.create( {
      username: body.username,
      password: body.password
    })

  
    session.save( () => {
      session.id = newUser.id
      session.username = newUser.username
      session.loggedIn = true

      res.json(newUser)
    })

  } catch (error) {
    res.json({error})
  }
})

//logging in route
router.post('/login', async({body}, res) => {
  try {
    //search db for user with the provided email
    const dbUser = await User.findOne({where: {email: body.email}})

    //if provided email doesn't match
    if (!dbUser) {
      res.json({message: 'Login failed. Please try again'})
      return
    }

    //checking password

    //comparing provided pw with the hashed pw
    const validPassword = await bcrypt.compare(body.password, dbUser.password)

    //if provided pw doesnt match
    if(!validPassword) {
      res.json({message: 'Login failed. Please try again'})
    }

    //if they match:
    res.json({message: 'You are now logged'})

  } catch (error) {
    res.json({error})
  }
})


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
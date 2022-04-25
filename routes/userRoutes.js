const router = require ('express').Router()
const bcrypt = require('bcrypt')
const {User} = require('../models')


//logging in route
router.post('/login', async({body}, res => {
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
}))

module.exports = router
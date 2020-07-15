const environment     = process.env.NODE_ENV || 'development';    // set environment
const database        = require("./db.js")
const bcrypt          = require('bcrypt')                         // bcrypt will encrypt passwords to be saved in db
const crypto          = require('crypto')       

const signup = async (user) => {
    try{
        const hashedpw = await hashPassword(user.password)
        delete user.password
        user.password_digest = hashedpw
        token = await createToken()
        user.token = token
        user = await createUser(user)
        return user
    }catch(err){
        return err
    }
    
}
  const hashPassword = (password) => {
    return new Promise((resolve, reject) =>
      bcrypt.hash(password, 10, (err, hash) => {
        err ? reject(err) : resolve(hash)
      })
    )
  }
  
  // user will be saved to db - we're explicitly asking postgres to return back helpful info from the row created
  const createUser = (user) => {
return database.raw(
      "INSERT INTO users (username, password_digest, college, token, created_at) VALUES (?, ?,?,?, ?) RETURNING id, username, created_at, token, college",
      [user.username, user.password_digest,user.college, user.token, new Date()]
    )
    .then((data) => data.rows[0])
  }
  
  // crypto ships with node - we're leveraging it to create a random, secure token
  const createToken = () => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, data) => {
        err ? reject(err) : resolve(data.toString('base64'))
      })
    })
  }
  // don't forget to export!
  module.exports = {
    signup,
  }
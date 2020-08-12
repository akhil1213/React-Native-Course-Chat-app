const environment     = process.env.NODE_ENV || 'development';    // set environment
const database        = require("../db.js")
const bcrypt          = require('bcrypt')                         // bcrypt will encrypt passwords to be saved in db
const crypto          = require('crypto')       
const jwt = require("jsonwebtoken")
const auth = require("../userauth/middleware/auth")
const login = async (userRequest) => {
    try{
        const user = await findUser(userRequest)
        if(!user)return new Error('No user found')
        await checkPassword(userRequest.password,user.password_digest)
        const token = await createToken(user.id)
        // await updateUserToken(token,user)
        user.token = token
        delete user.password_digest
        console.log(user)
        return user
    }catch(err){
        return err
    }
}
const checkPassword = (passwordAttempt, actualPassword) => {
    return new Promise((resolve, reject) =>
      bcrypt.compare(passwordAttempt, actualPassword, (err, response) => {
          if (err) {
            reject(err)
          }
          else if (response) {
            resolve(response)
          } else {
            reject(new Error('Passwords do not match.'))
          }
      })
    )
}
const updateUserToken = (token, user) => {
    return database.raw("UPDATE users SET token = ? WHERE id = ? RETURNING id, username, token", [token, user.id])
      .then((data) => data.rows[0])
}
const createToken = async (userId) => {
    const payload = {
      id:userId
    }
    var token = ''
    return new Promise((resolve,reject) =>{
        jwt.sign(
          payload,
          "akhil_loves_react",
          {
            expiresIn:10000
          },
          (err,token) =>{
            if(err)reject(err)
            if(token) resolve(token)
          }
        )
    })
    
    // return new Promise((resolve, reject) => {
    //     crypto.randomBytes(16, (err, data) => {
    //     err ? reject(err) : resolve(data.toString('base64'))
    //     })
    // })
}
const findUser = (user) => {
    return new Promise((resolve,reject) =>{
      database.raw(
        "SELECT * FROM users where username = ?",
        [user.username]
      )
      .then((data) => resolve(data.rows[0]))
      .catch((err) => {reject(new Error('user not found'))})
      } 
    )}


//AUTHORIZE LOGIC!
const findUserWithToken = async (token) => {
  return database.raw(
    "SELECT * FROM users where token = ?",
    [token]
  ).then((data) => delete data.rows[0].password_digest)
}
const authorize = async (token) => {
  const userData = await findUserWithToken(token)
  delete userData.password_digest
  return userData
}

  // don't forget to export!
  module.exports = {
    login,
    authorize
  }
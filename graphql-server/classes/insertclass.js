const database = require("../db.js")
const insertClass = (classObj) =>{
    return new Promise((resolve,reject)=>{
        database.raw("insert into class (profname,coursename,time,username) \
        VALUES (?,?,?,?)",[classObj.profname,classObj.coursename,classObj.time,classObj.username])
        .then(()=>resolve('sucess'))
        .catch(()=>reject('class didn\t insert'))
    })
}
module.exports = {
    insertClass
}
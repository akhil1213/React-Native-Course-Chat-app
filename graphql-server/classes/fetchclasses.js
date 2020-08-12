const database = require("../db.js")

const fetchClasses = async (username) => {
    return new Promise((resolve,reject)=>{
        database.raw("select profname,coursename,time from class as class inner join \
        (select * from classes where username = ?)\
        as classes on class.id = classes.classid",[username])
      .then((data) => resolve(data.rows))
      .catch((err)=>reject(new Error('classes not found')))
    })
}
const fetchStudentsForSpecificClass = async (classname) => {
    return new Promise((resolve,reject)=>{
        database.raw("select distinct(username) from classes inner join (select id from class where coursename=?) as id\
        on classid = id.id",[classname])
            .then((data)=> resolve(data.rows))
            .catch((err)=>reject(new Error(err)))
    })
}

const fetchClassmates = (username) => {
    return database.raw("select distinct c2.username from classes c1, classes c2 \
    where c1.username = ? and c1.username <> c2.username and c1.classid = c2.classid"
    ,[username]).
    then((data)=>console.log(data.rows))
}
const fetchAllStudentsAlongWithTheirClasses = (username) => {
    return database.raw("select coursename,classmate from class inner join \
    (select c1.classid as classid,c1.username as user1, c2.username as classmate\
    from classes c1, classes c2 where c1.classid = c2.classid and \
    c1.username <> c2.username and c1.username = ?) as classmates_table\
    on class.id = classmates_table.classid",[username]).then((data)=>console.log(data.rows))
}
module.exports = {
    fetchClasses,
    fetchClassmates,
    fetchAllStudentsAlongWithTheirClasses,
    fetchStudentsForSpecificClass
}
//query users classmates along with that class taken by them


// query users classes
//select profname,coursename,time from class as class inner join (select * from classes where username = 'akhil1213') as classes on class.id = classes.classid
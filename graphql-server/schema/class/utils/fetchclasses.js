import database from "../../../database/knex/knex";

const fetchClasses = async (user_id) => {
    return new Promise((resolve, reject) => {
        database.raw("select professor_name,course_name,time from class as class inner join \
        (select * from user_class where user_id = ?)\
        as classes on class.id = classes.class_id", [user_id])
            .then((data) => {
                console.log(data.rows[0].time);
                resolve(data.rows)
            })
            .catch((err) => {
                console.log(err)
                reject(new Error('classes not found'))
            })
    })
}

const fetchClassmates = (username) => {
    return database.raw("select distinct c2.username from classes c1, classes c2 \
        where c1.username = ? and c1.username <> c2.username and c1.classid = c2.classid"
        , [username])
        .then((data) => console.log(data.rows))
}


export {
    fetchClasses,
    fetchClassmates,
}
//query users classmates along with that class taken by them


// query users classes
//select profname,coursename,time from class as class inner join (select * from classes where username = 'akhil1213') as classes on class.id = classes.classid
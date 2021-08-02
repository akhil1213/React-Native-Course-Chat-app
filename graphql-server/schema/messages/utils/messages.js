import database from "../../../database/knex/knex";

export const fetchChatters = async (username) => {
  return new Promise((resolve, reject) => {
    database
      .raw(
        "select username,messages_btw_users.created_at,body,seen from users inner join \
        (select * from messages inner join (select id from users where username = ?) \
        as usersid on messages.receiver = usersid.id or messages.sender = usersid.id order by created_at asc)\
        as messages_btw_users on (users.id = messages_btw_users.receiver or users.id = messages_btw_users.sender)\
         and username <> ?",
        [username]
      )
      .then((data) => resolve(data.rows))
      .catch((err) => reject(new Error("classes not found")));
  });
};

export const fetchAllClassmatesAlongWithTheirSimilarClasses = (username) => {
  return new Promise((resolve, reject) => {
    database.raw("select coursename,classmate from class inner join \
      (select c1.classid as classid,c1.username as user1, c2.username as classmate\
      from classes c1, classes c2 where c1.classid = c2.classid and \
      c1.username <> c2.username and c1.username = ?) as classmates_table\
      on class.id = classmates_table.classid", [username])
      .then((data) => { console.log(data.rows); resolve(data.rows) })
      .catch((err) => reject(new Error(err)))
  })
}

export const fetchStudentsForSpecificClass = async (classname, username) => {
  return new Promise((resolve, reject) => {
    database.raw("select distinct(username) from classes inner join (select id from class where coursename=?) as id\
      on classid = id.id where username <> ?", [classname, username])
      .then((data) => resolve(data.rows))
      .catch((err) => reject(new Error(err)))
  })
}

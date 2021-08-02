import database from "../../../database/knex/knex";
// with last message
export const fetchChatters = async (userId) => {
  // recent messages returns the last message received and sent to each chatter
  const { rows: userRecentMessages } = await database
    .raw(
      "select\
        body, \
        message.time_sent, \
        from_users.username as sender_user_name, \
        to_users.username as receiver_user_name,\
        message.from as from_user_id,\
        message.to as to_user_id\
        from\
        message\
        inner join(\
          select\
          max(message.time_sent) as max_msg_time_sent, \
          message.from\
          from\
          message\
          where\
          message.to = ? \
          or message.from = ? \
          group by \
          message.to, \
          message.from\
        ) as latest_time_from on max_msg_time_sent = message.time_sent\
        inner join users from_users on from_users.id = message.from\
        inner join users to_users on to_users.id = message.to",
      [userId, userId]
    )
  const lastMessages = userRecentMessages.reduce((acc, row) => {
    const { sender_user_name, receiver_user_name, time_sent, body, from_user_id, to_user_id, seen } = row;
    // get unique from_user to to_user combination as key and get latest message 
    const key = from_user_id + to_user_id;
    if (!acc[key] || (acc[key] && time_sent > acc[key])) {
      acc[key] = {
        time_sent,
        sender_user_name,
        receiver_user_name,
        lastMessageSent: {
          body,
          seen,
        },
        currentUserSentLast: userId === from_user_id
      }
    }
    return acc;
  }, {});

  return Object.values(lastMessages);
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

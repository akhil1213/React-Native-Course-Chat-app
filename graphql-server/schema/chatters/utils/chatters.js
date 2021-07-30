import database from "../../../database/knex/knex";

const fetchChatters = async (username) => {
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

export default fetchChatters;
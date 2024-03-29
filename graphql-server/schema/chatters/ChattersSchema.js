import { gql } from "apollo-server-express"

const ChattersSchema = `

  
  type Student {
    username: String
  }
  type StudentWithClass {
    classmate: String
    coursename: String
  }
  type Message {
      seen: Boolean
      body: String
  }
  type Chatter {
    time_sent: String!
    sender_user_name: String!
    receiver_user_name: String!
    lastMessageSent: Message!
    currentUserSentLast: Boolean
  }
  extend type Query {
    students(classname: String!, username: String!): [Student]
    studentsWithClasses(username: String!): [StudentWithClass]
    chatters(userId: Int!): [Chatter]
  }
`;

export default ChattersSchema;

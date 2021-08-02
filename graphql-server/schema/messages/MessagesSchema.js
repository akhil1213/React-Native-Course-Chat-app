import { gql } from "apollo-server-express" 

const ChattersSchema = `

  
  type Student {
    username: String
  }
  type StudentWithClass {
    classmate: String
    coursename: String
  }
  type Chatter {
    username: String
    created_at: String
    body: String
    seen: Boolean
  }
  extend type Query {
    students(classname: String!, username: String!): [Student]
    studentsWithClasses(username: String!): [StudentWithClass]
    chatters(username: String!): [Chatter]
  }
`;

export default ChattersSchema;

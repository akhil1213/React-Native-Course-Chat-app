import { gql } from "apollo-server-express" 

const typeDefs = gql`
  type User {
    username: String
    password: String
    college: String
    id: String
    token: String
    password_digest: String
  }
  type Class {
    course_name: String
    professor_name: String
    time: String
  }
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
  input RegisterUserInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    classes(user_id: Int!): [Class]
    students(classname: String!, username: String!): [Student]
    studentsWithClasses(username: String!): [StudentWithClass]
    chatters(username: String!): [Chatter]
  }
  type Mutation {
    createClass(
      coursename: String
      profname: String
      time: String
      username: String
    ): String
    signupUser(username: String, password: String, college: String): User!
    loginUser(username: String, password: String): User!
    authorize(token: String): User!
  }
`;

export {
  typeDefs
}
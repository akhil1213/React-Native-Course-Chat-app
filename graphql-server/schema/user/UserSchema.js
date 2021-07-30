import { gql } from "apollo-server-express" 

const UserSchema = `
  type User {
    username: String
    password: String
    college: String
    id: String
    token: String
    password_digest: String
  }

  input RegisterUserInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }


 type Mutation {
    signupUser(username: String, password: String, college: String): User!
    loginUser(username: String, password: String): User!
    authorize(token: String): User!
  }
`;


export default UserSchema;
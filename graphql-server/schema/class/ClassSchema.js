import { gql } from "apollo-server-express"

const ClassSchema = `
  scalar Date
  
  input ClassInput {
    course_name: String
    professor_name: String
    time: Date
    college: String
  }
  type ClassType {
    course_name: String
    professor_name: String
    time: Date
    college: String
  }
  type Query {
    classes(user_id: Int!): [ClassType]
  }
  extend type Mutation {
    createClass(
      classObj: ClassInput!
    ): ClassType
  }
`;

export default ClassSchema;
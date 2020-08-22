const { signup } = require("./userauth/signup");
const { login } = require("./userauth/login");
const {
  fetchClasses,
  fetchStudentsForSpecificClass,
  fetchAllClassmatesAlongWithTheirSimilarClasses,
} = require("./classes/fetchclasses");
const { insertClass } = require("./classes/insertclass");
const { fetchChatters } = require("./messageQueries/chatters");
const auth = require("./userauth/middleware/auth");

const resolvers = {
  Query: {
    classes: async (_, { username }) => {
      const classes = fetchClasses(username);
      return classes;
    },
    students: async (_, { classname, username }) => {
      const students = fetchStudentsForSpecificClass(classname, username);
      console.log(students);
      return students;
    },
    studentsWithClasses: async (_, { username }) => {
      const res = fetchAllClassmatesAlongWithTheirSimilarClasses(username);
      return res;
    },
    chatters: async (_, { username }) => {
      const chatters = fetchChatters(username);
      return chatters;
    },
  },
  Mutation: {
    createClass: async (_, classObject) => {
      const res = insertClass(classObject);
      return res;
    },
    signupUser: async (_, userObject) => {
      return signup(userObject);
    },
    loginUser: async (_, userObject) => {
      console.log(userObject);
      const res = login(userObject);
      console.log(res);
      return res;
    },
    authorize: async (_, { token }) => {
      console.log(auth);
      return auth(token);
    },
  },
};

module.exports = {
  resolvers,
};

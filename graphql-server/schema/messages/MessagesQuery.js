
import { fetchChatters, fetchAllClassmatesAlongWithTheirSimilarClasses, fetchStudentsForSpecificClass } from "./utils/chatters";

const ChattersQuery = {
    Query: {
        chatters: async (_, { username }) => {
            const chatters = fetchChatters(username);
            return chatters;
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
    },
};

export default ChattersQuery;
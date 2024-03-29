
import { fetchChatters, fetchAllClassmatesAlongWithTheirSimilarClasses, fetchStudentsForSpecificClass } from "./utils/chatters";

const ChattersQuery = {
    Query: {
        chatters: async (_, { userId }) => {
            const chatters = fetchChatters(userId);
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
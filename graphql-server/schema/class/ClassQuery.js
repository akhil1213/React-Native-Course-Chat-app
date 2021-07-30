import {
    fetchClasses,
    fetchStudentsForSpecificClass,
    fetchAllClassmatesAlongWithTheirSimilarClasses,
} from "./utils/fetchclasses"

const ClassQuery = {
    Query: {
        classes: async (_, { user_id }) => {
            console.log(user_id)
            const classes = fetchClasses(user_id);
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
    },

};

export default ClassQuery;
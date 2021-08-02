import {
    fetchClasses,
} from "./utils/fetchclasses"

const ClassQuery = {
    Query: {
        classes: async (_, { user_id }) => {
            console.log(user_id)
            const classes = fetchClasses(user_id);
            return classes;
        },
    },

};

export default ClassQuery;
import { login } from "./utils/login";
import { signup } from "./utils/signup";
import auth from "./utils/middleware/auth";




const UserMutation = {
    Mutation: {
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
}

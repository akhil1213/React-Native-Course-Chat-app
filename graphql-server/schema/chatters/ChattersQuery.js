
import { fetchChatters } from "./utils/chatters";

const ChattersQuery = {
    Query: {
        chatters: async (_, { username }) => {
            const chatters = fetchChatters(username);
            return chatters;
        },
    },

};

export default ChattersQuery;
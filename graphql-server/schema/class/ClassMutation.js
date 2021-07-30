import insertClass from "./utils/insertclass";
import dayjs from 'dayjs'
import { GraphQLScalarType, Kind } from 'graphql';
const ClassMutation = {
    Mutation: {
        createClass: async (_, classObject) => {
            const res = insertClass(classObject);
            return res;
        },
    },
    Date: new GraphQLScalarType({
        name: 'MyCustomScalar',
        description: 'Description of my custom scalar type',
        serialize(value) {
            const time = dayjs(value).format("hh:mm a");
            return time;
        },
        parseValue(value) {
            return new Date("1970-01-01 " + value);
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return new Date(ast.value);
            }
            return null;
        },
    }),
};

export default ClassMutation;
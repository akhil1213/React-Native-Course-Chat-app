import { makeExecutableSchema } from "graphql-tools"
import {
    ChattersQuery,
    ChattersSchema,
    ChattersMutation
} from './chatters'

import {
    ClassQuery,
    ClassSchema,
    ClassMutation
} from './class'

import {
    UserQuery,
    UserSchema,
    UserMutation
} from './user'

const typeDefs = [
    UserSchema,
    ClassSchema,
    ChattersSchema,
]

const resolvers = [
    ClassQuery,
    ChattersQuery,
    UserQuery,
    UserMutation,
    ClassMutation,
    ChattersMutation
]

export default makeExecutableSchema({ typeDefs, resolvers });
import Mutation from "./Mutation/index.js";
import Query from "./Query/index.js";

const resolvers = {
    Query: {
        ...Query
    },
    Mutation: {
        ...Mutation,
    }
}

export default resolvers;
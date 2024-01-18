import Client  from "./Client/index.js";

const resolvers = {
    Mutation: {
        ...Client,
    }
}

export default resolvers;
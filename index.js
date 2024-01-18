import 'colors';
import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './resolvers/index.js';
import { importSchema } from 'graphql-import';

const schemaPath = './schema/index.graphql';

const API_PORT = process.env.API_PORT || 4001;

const server = new ApolloServer({
    typeDefs: importSchema(schemaPath),
    resolvers,
});

async function main() {
    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
        listen: { port: API_PORT }
    });
    
    console.log(`😃 ${'Server is listening at: '.green} - ${url.cyan}`);
    console.log(`${'Query at:'.magenta} ${'https://studio.apollographql.com/dev'.yellow}`);
};

main();
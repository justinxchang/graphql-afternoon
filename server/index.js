const { readFileSync } = require('fs');
const { GraphQLServer } = require('graphql-yoga');
const typeDefs = readFileSync(`${__dirname}/schema/typeDefs.graphql`, 'utf8');
const resolvers = require('./schema/resolvers');

const options = {
    port: 3001,
    endpoint: '/graphql',
    playground: '/graphiql'
}

const server = new GraphQLServer({
    resolvers: resolvers,
    typeDefs: typeDefs,
    context: (req) => {
        return {
            ...req.request
        }
    }
})

server.start(options, () => console.log(`Server running on localhost: ${options.port}`)) 
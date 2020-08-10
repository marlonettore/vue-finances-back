const { GraphQLServer} = require('graphql-yoga')
const Binding = require('prisma-binding')
const { prisma } = require('./generated/prisma-client')

const { endpoint,playground,secret,origin } = require('./config')
const resolvers = require ('./resolvers') //busca o index.js

const server = new GraphQLServer({
    typeDefs: `${__dirname}/schema.graphql`,
    resolvers,
    context: request => ({ //tudo que for passado no context fica disponivel em todos os resolvers
        ...request,
        db: new Binding.Prisma({
            typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
            endpoint,
            secret
        }),
        prisma
    })
})

server.start({
    playground,
    cors: {
        origin
    }
}).then(() => console.log('Server Running on https://localhost:4000'))
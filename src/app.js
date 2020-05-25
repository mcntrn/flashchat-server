if(process.env.NODE_ENV !== "PROD"){
    require("dotenv").config()
}
const { ApolloServer } = require('apollo-server');
const { PubSub } = require('apollo-server');
const { init, getMessages, createMessage } = require('./models/message')
const { typeDefs } = require('./schema/gql-schema')
const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';

const resolvers = {
    Subscription: {
        message: {
            subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
        }
    },
    Query: {
        messages: () => getMessages(),
    },
    Mutation: {
        sendMessage(parent, args, context, info){ 
            let message = createMessage(args.text);
            pubsub.publish(MESSAGE_ADDED, { message: message});
            return message;
        }
    },
};

const server = new ApolloServer({typeDefs, resolvers});

init().then(() => {
    server.listen().then(({url}) => {
        console.log(`✨ flashchat-Server ready at ${url} ✨`)
    });
})


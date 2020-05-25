
const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    schema {
        query: Query,
        mutation: Mutation,
        subscription: Subscription
    }

    type Query {
        messages: [Message]
    }

    type Mutation {
        sendMessage(text: String!): Message!
    }

    type Subscription  {
        message: Message!
    }

    type Message {
        _id: String
        text: String
        count: Int
    }
`;

module.exports = { typeDefs }

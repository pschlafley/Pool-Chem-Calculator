import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    createdAt: String!
  }

  type Query {
    users: [User]
  }
`;

export default typeDefs;

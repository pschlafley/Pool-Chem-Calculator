import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    createdAt: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(
      username: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      createdAt: String!
    ): User
  }
`;

export default typeDefs;

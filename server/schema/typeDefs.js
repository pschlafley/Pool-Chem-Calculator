import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User!
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
    ): Auth
    login(email: String, username: String, password: String!): Auth
  }
`;

export default typeDefs;

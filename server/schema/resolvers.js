import { User } from '../models/index.js';

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find().select('-password');
      return users;
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      const user = await User.create(args);
      const newUser = {
        ...user._doc,
        createdAt: user._doc.createdAt.toString(),
      };
      return newUser;
    },
  },
};

export default resolvers;

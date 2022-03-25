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
      console.log('args', args);
      const user = await User.create(args);
      return { user };
    },
  },
};

export default resolvers;

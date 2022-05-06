import { User } from '../models/index.js';
import { signToken } from '../utils/auth.js';

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find().select('-password');
      return users;
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      const tempUser = await User.create(args);

      // getting user date from mongodb user._doc object
      const user = {
        ...tempUser._doc,
        createdAt: tempUser._doc.createdAt.toString(),
      };
      const token = signToken(user);

      return { token, user };
    },
  },
};

export default resolvers;

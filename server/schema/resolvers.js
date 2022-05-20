import { AuthenticationError } from 'apollo-server-express';

import { User } from '../models/index.js';
import { signToken } from '../utils/auth.js';
import validateEmail from '../utils/validateEmail.js';

const LOGIN_CONFIG = {
  email: 'email',
  username: 'username',
  errorMsg: 'Invalid credentials',
};

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find().select('-password');
      return users;
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      const hashedPassword = await bcrypt.hash(args.password, 12);
      const user = await User.create({ ...args, password: hashedPassword });
      const token = signToken(user);

      return { token, user };
    },

    login: async (_, { email, username, password }) => {
      const isEmail = validateEmail(email);
      const userLogin = isEmail ? LOGIN_CONFIG.email : LOGIN_CONFIG.username;

      const user = await User.findOne({
        [userLogin]: isEmail ? email : username,
      });

      if (!user) throw new AuthenticationError(LOGIN_CONFIG.errorMsg);

      const isCorrectPw = await user.isCorrectPassword(password);

      if (!isCorrectPw) throw new AuthenticationError(LOGIN_CONFIG.errorMsg);

      const token = signToken(user);

      return { user, token };
    },
  },
};

export default resolvers;

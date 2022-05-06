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
      const tempUser = await User.create(args);

      // getting user date from mongodb user._doc object
      const user = {
        ...tempUser._doc,
        createdAt: tempUser._doc.createdAt.toString(),
      };
      const token = signToken(user);

      return { token, user };
    },

    login: async (_, { emailOrUsername, password }) => {
      const isEmail = validateEmail(emailOrUsername);
      const userLogin = isEmail ? LOGIN_CONFIG.email : LOGIN_CONFIG.username;

      console.log({ emailOrUsername, userLogin, isEmail });

      const user = await User.findOne({
        [userLogin]: emailOrUsername,
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

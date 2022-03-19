import { data } from './index.js';

const resolvers = {
  Query: {
    users: () => data,
  },
};

export default resolvers;

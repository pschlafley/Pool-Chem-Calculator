import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

const getUniqueId = () => Math.random().toString().slice(2);

const data = [
  {
    username: 'tc123',
    firstName: 'Tom',
    lastName: 'Narberth',
    email: 'tom@mail.com',
    password: '123456',
    createdAt: Date(),
    id: getUniqueId(),
  },
  {
    username: 'yennefer1',
    firstName: 'Yennefer',
    lastName: 'Something',
    email: 'yen@mail.com',
    password: '694949',
    createdAt: Date.now(),
    id: getUniqueId(),
  },
  {
    username: 'monsterslayer99',
    firstName: 'Geralt',
    lastName: 'of Rivia',
    email: 'geralt@mail.com',
    password: 'wolf',
    createdAt: Date.now(),
    id: getUniqueId(),
  },
];

export { typeDefs, resolvers, data };

import mongoose from 'mongoose';
import process from 'process';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/pool-calc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose.connection;

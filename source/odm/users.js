import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({ name: String });
const users = mongoose.model('users', userSchema);

export { users };

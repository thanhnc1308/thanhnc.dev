import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
}

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, 'Please provide a name for this user.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email for this user.'],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
  },
});

// Next middleware does not fully support Mongoose on Edge runtime
// as Mongoose requires Node runtime. Optinal chaining is a workaround
// to prevent the error.
export default mongoose.models?.User ||
  mongoose.model<User>('User', UserSchema);

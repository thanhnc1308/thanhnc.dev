import mongoose from 'mongoose';

export interface Guest extends mongoose.Document {
  name: string;
  memberCount: number;
  status: string;
}

const GuestSchema = new mongoose.Schema<Guest>({
  name: {
    type: String,
    required: [true, 'Please provide a name for this guest.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  memberCount: {
    type: Number,
  },
  status: {
    type: String,
  },
});

export default mongoose.models.Guest ||
  mongoose.model<Guest>('Guest', GuestSchema);

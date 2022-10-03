import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    require: true,
    min: 5
  }
});

export default mongoose.model('User', userSchema);

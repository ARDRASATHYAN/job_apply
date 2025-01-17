import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true },
    qualification: { type: String, required: true },
    password: { type: String, required: true },
    file: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, 
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User; 



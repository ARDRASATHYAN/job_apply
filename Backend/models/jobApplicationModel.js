import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',
   
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  resume: {
    type: String,  // Path to the uploaded resume file
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

// This is where the issue occurred. You should export the correct model:
const JobApply= mongoose.model('JobApplication', jobApplicationSchema);

export default JobApply; // Correct export


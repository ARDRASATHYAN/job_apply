// jobRoutes.js
import express from 'express';
import { deleteJob, getAllApplications, getAllJobs, getAppliedJobs, JobApplication, postJob, updateJob } from '../controller/jobController.js';
import multer from 'multer';
import authMiddleware from '../middleware/authMiddleware.js';
import jobMiddleware from '../middleware/jobMiddleware.js';

const jobrouter = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
  
  const upload = multer({ storage });
// Route to post a new job
jobrouter.post('/jobs', postJob);
jobrouter.get('/jobs', getAllJobs);
jobrouter.put('/jobs/:id', updateJob);
jobrouter.delete('/jobs/:id', deleteJob);
jobrouter.post('/jobs/:jobId/apply', upload.single('resume'),authMiddleware,JobApplication);
jobrouter.get('/applied-jobs',jobMiddleware, getAppliedJobs);
jobrouter.get('/applications',getAllApplications);

export default jobrouter;

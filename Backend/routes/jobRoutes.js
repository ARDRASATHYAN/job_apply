// jobRoutes.js
import express from 'express';
import { deleteJob, getAllJobs, JobApplication, postJob, updateJob } from '../controller/jobController.js';
import multer from 'multer';

const jobrouter = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify your upload directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
  });
  
  const upload = multer({ storage });
// Route to post a new job
jobrouter.post('/jobs', postJob);
jobrouter.get('/jobs', getAllJobs);
jobrouter.put('/jobs/:id', updateJob);
jobrouter.delete('/jobs/:id', deleteJob);
jobrouter.post('/jobs/:jobId/apply', upload.single('resume'),JobApplication);

export default jobrouter;

import JobApply from '../models/jobApplicationModel.js';
import Job from '../models/jobModel.js';


export const postJob = async (req, res) => {
  const { title, description, requirements, location, salary, jobType } = req.body;


  if (!title || !description || !requirements || !location || !salary || !jobType) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newJob = new Job({
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
    });

    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully.', job: newJob });
  } catch (error) {
    console.error('Post Job Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
};


// Get All Jobs Controller
export const getAllJobs = async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (error) {
      console.error('Get Jobs Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  };


  // jobController.js
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { title, description, requirements, location, salary, jobType } = req.body;
  
    try {
      const updatedJob = await Job.findByIdAndUpdate(
        id,
        { title, description, requirements, location, salary, jobType },
        { new: true }
      );
  
      if (!updatedJob) {
        return res.status(404).json({ error: 'Job not found' });
      }
  
      res.status(200).json(updatedJob);
    } catch (error) {
      console.error('Update Job Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  };

  
  // jobController.js
export const deleteJob = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedJob = await Job.findByIdAndDelete(id);
  
      if (!deletedJob) {
        return res.status(404).json({ error: 'Job not found' });
      }
  
      res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
      console.error('Delete Job Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  };
  







  export const JobApplication = async (req, res) => {
    const { jobId } = req.params;
    console.log(jobId);
    
    const { name, email, phone, currentLocation, education } = req.body;
    const resume = req.file ? req.file.filename : null;
    const userId = req.user.id; 
  console.log(req.body);
  
    if (!resume) {
      return res.status(400).json({ message: 'Resume upload failed' });
    }
  
    try {
    
      const newApplication = new JobApply({
        jobId,
        userId,
        name,
        email,
        phone,
        currentLocation,
        education,
        resume,
      });
  console.log(newApplication);
  
     
      const savedApplication = await newApplication.save();
      res.status(200).json({ message: 'Application submitted successfully', application: savedApplication });
    } catch (error) {
      console.error('Error saving application:', error);  // Log error for debugging
      res.status(500).json({ message: 'Error saving application', error });
    }
  };



 // Function to get applied jobs for a user
export const getAppliedJobs = async (req, res) => {
  const userId = req.user.id; 
console.log(userId);

  try {
     
      const appliedJobs = await JobApply.find({ userId }).populate('jobId'); 
      res.status(200).json(appliedJobs);
  } catch (error) {
      console.error('Error fetching applied jobs:', error); 
      res.status(500).json({ message: 'Error fetching applied jobs', error });
  }
};
  
// Function to get all job applications
export const getAllApplications = async (req, res) => {
  try {
     
      const applications = await JobApply.find()
          .populate('jobId')
          .populate('userId'); 
      res.status(200).json(applications);
  } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ message: 'Error fetching applications', error });
  }
};

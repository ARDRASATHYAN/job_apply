import express from 'express'; // Import express
import { signup,signin } from '../controller/authController.js'; // Import your controller functions

// import multer from 'multer';
const router = express.Router(); // Create a router instance

// Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); 
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({ storage: storage });
// Define the signup route
router.post('/signup', signup);

// Define the signin route
// Signin route
router.post('/signin', signin);


export default router; // Export the router

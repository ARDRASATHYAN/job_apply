import express from 'express';
import dotenv from 'dotenv';
import authrouter from './routes/authRoutes.js';
import connectDB from './utils/db.js'; 
import cors from 'cors';
import jobrouter from './routes/jobRoutes.js';


dotenv.config();
const app = express();
app.use(cors()); 
// Middleware
app.use(express.json());

// Connect to the database
connectDB(); // Call the connectDB function here

app.use('/api/auth', authrouter);
app.use('/api',jobrouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});

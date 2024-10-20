import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import upload from './multerConfig.js';


// Signup Controller
export const signup = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    const { fullname, email, phoneNo, qualification, password, confirmPassword,role } = req.body;

   
    if (!fullname || !email || !phoneNo || !qualification || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match." });
    }

    try {
     
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

     
      const newUser = new User({
        fullname,
        email,
        phoneNo,
        qualification,
        password: hashedPassword,
        file: req.file.filename, 
        role: role || 'user',
      });

      await newUser.save();
      res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      console.error('Signup Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  });
};

// Signin Controller
export const signin = async (req, res) => {
  const { email, password } = req.body;

 
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

   
    const token = jwt.sign({ id: user._id,role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    
    res.status(200).json({
      userId: user._id,
      role: user.role, 
      token,
  });
  } catch (error) {
    console.error('Signin Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
};
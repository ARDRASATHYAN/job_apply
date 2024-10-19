import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phoneNo: '',
        qualification: '',
        password: '',
        confirmPassword: '',
        file: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, file: files[0] }); // handle file upload
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fullname, email, phoneNo, qualification, password, confirmPassword, file } = formData;

        const form = new FormData();
        form.append('fullname', fullname);
        form.append('email', email);
        form.append('phoneNo', phoneNo);
        form.append('qualification', qualification);
        form.append('password', password);
        form.append('confirmPassword', confirmPassword);
        form.append('file', file);

        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Signup successful:', response.data);
            // Handle successful signup (e.g., redirect to login page)
        } catch (error) {
            console.error('Signup failed:', error.response.data);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="form-input"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="form-input"
            />
            <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="form-input"
            />
            <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Qualification"
                required
                className="form-input"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="form-input"
            />
            <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="form-input"
            />
            <input
                type="file"
                name="file"
                onChange={handleChange}
                className="form-input"
            />
            <button type="submit" className="form-button">Signup</button>
        </form>
    );
};

export default Signup;

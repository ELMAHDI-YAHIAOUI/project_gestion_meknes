import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // State for password confirmation
    const [role, setRole] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        // Check if the passwords match
        if (password !== confirmPassword) {
            console.error("Passwords do not match!");
            return; // Optionally show an error message to the user.
        }

        const userData = {
            name,
            email,
            password,
            password_confirmation: confirmPassword, // Include the confirmation field
            role,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', userData, { withCredentials: false });
            console.log('User registered:', response.data);
        } catch (error) {
            console.error('Error registering user:', error.response ? error.response.data : error.message);
        }
    };


    return (
        <form onSubmit={handleRegister}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            /><br />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            /><br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />
            <input
                type="password" // Password confirmation input
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            /><br />
            <input
                type="text"
                placeholder="Role" // Field for role
                value={role}
                onChange={(e) => setRole(e.target.value)}
            /><br />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;

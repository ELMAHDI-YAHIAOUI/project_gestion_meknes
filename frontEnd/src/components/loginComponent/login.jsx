import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: false,
            });

            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Login failed:', error.response?.data); // Use optional chaining to avoid errors
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            /><br></br>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br></br>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

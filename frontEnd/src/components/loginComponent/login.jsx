import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
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
            setSuccessMessage('L\'utilisateur a été connecter avec succès!');

        } catch (error) {
            console.error('Login failed:', error.response?.data);
        }
    };


    return (
        <form onSubmit={handleLogin} className="LoginForm max-w-sm mx-auto ">
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    votre email
                </label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    votre mode de pass
                </label>
                <input
                    type="password"
                    placeholder="Mode de pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    se connecter
                </button><br />
            {successMessage && (
                <p className="mt-4 text-green-600 font-medium">{successMessage}</p>
            )}
                        <div className="mt-4">
                 <a onClick={() => navigate('/register')} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Sinscrire</a>
            </div>
        </form>
    );
};

export default Login;

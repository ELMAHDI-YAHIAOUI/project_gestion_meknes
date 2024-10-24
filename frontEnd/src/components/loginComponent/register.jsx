import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.error("Les mots de passe ne correspondent pas !");
            return;
        }

        const userData = {
            name,
            email,
            password,
            password_confirmation: confirmPassword,
            role,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', userData, { withCredentials: false });
            console.log('Utilisateur enregistré:', response.data);
            setSuccessMessage('L\'utilisateur a été enregistré avec succès!');

            setTimeout(() => {
                navigate('/login');
            }, 2000); 

        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleRegister} className="registerForm max-w-sm mx-auto ">
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    votre nom
                </label>
                <input
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
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
            <div className="mb-5">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    confirme le mode de pass
                </label>
                <input
                    type="password"
                    placeholder="Confirme le mode de pass"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="roles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    choisir un rôle
                </label>
                <select
                    id="roles"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                >
                    <option value="" disabled>Choisir un rôle</option>
                    <option value="admin">Admin</option>
                    <option value="utilisateur">Utilisateur</option>
                    <option value="chef">Chef</option>
                </select>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                enregistrer
            </button>
            {successMessage && (
                <p className="mt-4 text-green-600 font-medium">{successMessage}</p>
            )}
            <div className="mt-4">
                <p>Déjà un compte ? <a onClick={() => navigate('/login')} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Se connecter</a></p>
            </div>
        </form>
    );
};

export default Register;

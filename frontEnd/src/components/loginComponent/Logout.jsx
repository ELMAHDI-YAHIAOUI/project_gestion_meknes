import { useState } from 'react';
import { logout } from '../../authService';

const Logout = () => {
    const [message, setMessage] = useState('');

    const handleLogout = () => {
        logout();
        setMessage('You have been successfully logged out.'); // Set the success message
    };

    return (
        <div>
            <button onClick={handleLogout}>
                Déconnexion
            </button>
            {message && <p>{message}</p>} {/* Display the message if it exists */}
        </div>
    );
};

export default Logout;


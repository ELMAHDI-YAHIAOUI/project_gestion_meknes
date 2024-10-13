import axios from 'axios';

// Définit l'URL de base de l'API
const API_URL = 'http://127.0.0.1:8000/api'; // Assurez-vous que cette URL correspond à votre configuration Laravel

// Fonction d'inscription
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; // Retourne les données de la réponse
    } catch (error) {
        throw error.response.data; // Retourne l'erreur si la requête échoue
    }
};

// Fonction de connexion
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        // Sauvegarder le token dans le local storage ou dans un autre endroit sécurisé
        localStorage.setItem('token', response.data.token);
        return response.data; // Retourne les données de la réponse
    } catch (error) {
        throw error.response.data; // Retourne l'erreur si la requête échoue
    }
};

// Fonction de déconnexion
export const logout = () => {
    // Retire le token du local storage
    localStorage.removeItem('token');
};

// Fonction pour obtenir les produits (par exemple)
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Inclut le token d'authentification
            },
        });
        return response.data; // Retourne les données de la réponse
    } catch (error) {
        throw error.response.data; // Retourne l'erreur si la requête échoue
    }
};

// Fonction pour supprimer un produit
export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Inclut le token d'authentification
            },
        });
    } catch (error) {
        throw error.response.data; // Retourne l'erreur si la requête échoue
    }
};

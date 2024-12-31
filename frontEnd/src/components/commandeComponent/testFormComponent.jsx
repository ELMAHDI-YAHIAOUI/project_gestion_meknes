import { useState , useEffect } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    nom_complet: '',
    telephone: '',
    niveau: '',
    cycle: '',
    specialite: '',
    ecole: '',
    qualite: '',
    commandes: '', // Ajout du champ manquant dans l'état initial
  });
  useEffect(() => {
    axios.get('http://localhost:8000/sanctum/csrf-cookie').then(() => {
      console.log('CSRF cookie set');
    });
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/formTest', formData);
      console.log('Données envoyées avec succès:', response.data);
      alert('Formulaire soumis avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
      alert('Erreur lors de l\'envoi du formulaire');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom complet:</label>
        <input type="text" name="nom_complet" value={formData.nom_complet} onChange={handleChange} required />
      </div>
      <div>
        <label>Téléphone:</label>
        <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required />
      </div>
      <div>
        <label>Niveau:</label>
        <input type="text" name="niveau" value={formData.niveau} onChange={handleChange} required />
      </div>
      <div>
        <label>Cycle:</label>
        <input type="text" name="cycle" value={formData.cycle} onChange={handleChange} required />
      </div>
      <div>
        <label>Spécialité:</label>
        <input type="text" name="specialite" value={formData.specialite} onChange={handleChange} required />
      </div>
      <div>
        <label>École:</label>
        <input type="text" name="ecole" value={formData.ecole} onChange={handleChange} required />
      </div>
      <div>
        <label>Qualité:</label>
        <input type="text" name="qualite" value={formData.qualite} onChange={handleChange} required />
      </div>
      <div>
        <label>Commandes:</label>
        <input type="text" name="commandes" value={formData.commandes} onChange={handleChange} required />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default FormComponent;

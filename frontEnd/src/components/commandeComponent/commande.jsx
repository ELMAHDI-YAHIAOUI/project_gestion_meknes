import { useEffect, useState } from 'react';
import axios from 'axios';

const CommandeForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    phone: '',
    niveau: '',
    cycle: '',
    specialite: '',
    21: '',
    allCommands: false,
    books: false,
    notebooks: false,
    fournitures: false,
    goodQuality: false,
    averageQuality: false,
    schoolSearch: '',
    selectedSchool: [],
  });

  const [ecoles, setEcoles] = useState([]);
  const [filteredEcoles, setFilteredEcoles] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [specialtes, setSpecialtes] = useState([]);

  const [selectedEcole, setSelectedEcole] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [selectedNiveau, setSelectedNiveau] = useState(null);
  const [selectspecialite, setselectspecialite] = useState(null);

  const ec = ecoles.filter((x) => x.id_ecole == selectedEcole).map((v) => v.nom_ecole).join(', ');
  const cy = cycles.filter((x) => x.id_cycle == selectedCycle).map((v) => v.libelle).join(', ');
  const ni = niveaux.filter((x) => x.id_niveau == selectedNiveau).map((v) => v.libelle).join(', ');

  useEffect(() => {
    axios.get("http://localhost:8000/api/ecoles")
      .then(response => {
        setEcoles(response.data);
        setFilteredEcoles(response.data);
      })
      .catch(error => console.error("Error fetching ecoles:", error));
  }, []);

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    const filtered = ecoles.filter(ecole =>
      ecole.nom_ecole.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEcoles(filtered);
  };

  const handleEcoleChange = (ecoleId) => {
    console.log('École sélectionnée :', ecoleId); // Debug
    setSelectedEcole(ecoleId);
    axios.get(`http://localhost:8000/api/ecole/${ecoleId}/cycles`)
      .then(response => setCycles(response.data))
      .catch(error => console.error("Error fetching cycles:", error));
  };

  const handleCycleChange = (cycleId) => {
    setSelectedCycle(cycleId);
    axios.get(`http://localhost:8000/api/cycle/${cycleId}/niveaux`)
      .then(response => setNiveaux(response.data))
      .catch(error => console.error("Error fetching niveaux:", error));
  };

  const handleNiveauChange = (niveauId) => {
    setSelectedNiveau(niveauId);
    axios.get(`http://localhost:8000/api/niveau/${niveauId}/specialtes`)
      .then(response => setSpecialtes(response.data))
      .catch(error => console.error("Error fetching specialtes:", error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value || '',
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    // Vérifier que l'école est sélectionnée
    if (!selectedEcole) {
      console.error('Veuillez sélectionner une école');
      alert('Veuillez sélectionner une école');
      return;
    }

    // Vérifier que l'ID de l'école est valide
    const isEcoleValid = ecoles.some(ecole => ecole.id_ecole == selectedEcole);
    if (!isEcoleValid) {
      console.error('École invalide');
      alert('École invalide');
      return;
    }

    let qualite = {
      "goodQuality": formValues.goodQuality,
      "averageQuality": formValues.averageQuality,
    };
    const quality = Object.keys(qualite).find(key => qualite[key] === true);

    const dataToSend = {
      nom_complet: formValues.fullName,
      telephone: formValues.phone,
      niveau: ni,
      cycle: cy,
      specialite: selectspecialite,
      commandes: {
        allCommands: formValues.allCommands,
        books: formValues.books,
        notebooks: formValues.notebooks,
        fournitures: formValues.fournitures,
      },
      qualite: quality,
      ecole: ec, // Nom de l'école
      id_ecole: selectedEcole, // Inclure l'id_ecole sélectionné
    };

    console.log('Données à envoyer:', dataToSend); // Debug

    try {
      const response = await axios.post('http://localhost:8000/api/commandes', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Données envoyées avec succès:', response.data);
      alert('Commande créée avec succès');
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error.response ? error.response.data : error);
      alert("Erreur lors de l'envoi des données");
    }
  };

  const toggleCommandCheckboxes = (name) => {
    setFormValues((prev) => {
      const newValues = { ...prev };

      if (name === 'allCommands') {
        // Si "Toutes les commandes" est coché, décochez les autres cases
        newValues.allCommands = !prev.allCommands;
        newValues.books = false;
        newValues.notebooks = false;
        newValues.fournitures = false;
      } else {
        // Si une autre case est cochée, décochez "Toutes les commandes"
        newValues.allCommands = false;
        newValues[name] = !prev[name];

        // Si toutes les cases sont cochées, cochez "Toutes les commandes" et décochez les autres
        if (newValues.books && newValues.notebooks && newValues.fournitures) {
          newValues.allCommands = true;
          newValues.books = false;
          newValues.notebooks = false;
          newValues.fournitures = false;
        }
      }

      return newValues;
    });
  };

  const updateQualityCheckboxes = (checkedId, otherId) => {
    setFormValues((prev) => ({
      ...prev,
      [checkedId]: true,
      [otherId]: false,
    }));
  };

  return (
    <form onSubmit={submitForm} className="bg-white p-5 rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex justify-center">Formulaire de la Commande</h1>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom Compléte</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formValues.fullName || ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
            placeholder="Nom Compléte"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formValues.phone || ''}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-12 p-2.5 w-full"
              placeholder="123-456-7890"
              required
            />
          </div>
        </div>

        {/* École Select with Search */}
        <div className="mb-6">
          <label htmlFor="schoolSearch" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">École :</label>
          <input
            type="text"
            id="schoolSearch"
            name="schoolSearch"
            value={formValues.schoolSearch || ''}
            onChange={handleSearchChange}
            placeholder="Rechercher une école..."
            className="block w-full p-2 border rounded-lg"
          />
          <select
            multiple
            id="school"
            className="mt-2 block w-full p-2 border rounded-lg"
            onChange={e => handleEcoleChange(e.target.value)}
          >
            {filteredEcoles.map(ecole => (
              <option key={ecole.id_ecole} value={ecole.id_ecole}>
                {ecole.nom_ecole}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cycle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cycle</label>
          <select
            onChange={e => handleCycleChange(e.target.value)} disabled={!selectedEcole}
            id="cycle"
            name="cycle"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
            required
          >
            <option value="">Sélectionner un cycle</option>
            {cycles.map(cycle => (
              <option key={cycle.id_cycle} value={cycle.id_cycle}>
                {cycle.libelle}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="niveau" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Niveau</label>
        <select
          onChange={e => handleNiveauChange(e.target.value)} disabled={!selectedCycle}
          id="niveau"
          name="niveau"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
          required
        >
          <option value="">Sélectionner un niveau</option>
          {niveaux.map(niveau => (
            <option key={niveau.id_niveau} value={niveau.id_niveau}>
              {niveau.libelle}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="specialite" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Spécialité</label>
        <select
          id="specialite"
          name="specialite"
          disabled={!selectedNiveau}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
          required
          onChange={(e)=>setselectspecialite(e.target.value)}
        >
          <option value="">Sélectionner une spécialité</option>
          {specialtes.map(specialte => (
            <option key={specialte.id_specialite} value={specialte.libelle}>
              {specialte.libelle}
            </option>
          ))}
        </select>
      </div>



      <div className="flex flex-col mt-6">
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Commande :</h3>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="allCommands"
              type="checkbox"
              name="allCommands"
              checked={formValues.allCommands}
              onChange={() => toggleCommandCheckboxes('allCommands')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="allCommands" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Toutes les commandes
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="books"
              type="checkbox"
              name="books"
              checked={formValues.books}
              onChange={() => toggleCommandCheckboxes('books')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="books" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Livres
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="notebooks"
              type="checkbox"
              name="notebooks"
              checked={formValues.notebooks}
              onChange={() => toggleCommandCheckboxes('notebooks')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="notebooks" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Cahiers
            </label>
          </div>
        </li>
        <li className="w-full dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="fournitures"
              type="checkbox"
              name="fournitures"
              checked={formValues.fournitures}
              onChange={() => toggleCommandCheckboxes('fournitures')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="supplies" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Fournitures
            </label>
          </div>
        </li>
      </ul>
    </div>
      <div className="flex flex-col mt-4">
        <label className="text-sm font-medium text-gray-900 dark:text-white">Qualité :</label>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="goodQuality"
            name="goodQuality"
            checked={formValues.goodQuality}
            onChange={() => updateQualityCheckboxes('goodQuality', 'averageQuality')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="goodQuality" className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Bonne</label>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="averageQuality"
            name="averageQuality"
            checked={formValues.averageQuality}
            onChange={() => updateQualityCheckboxes('averageQuality', 'goodQuality')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="averageQuality" className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>moyenne</label>
        </div>
      </div>

      <div className="flex justify-center">

<button type="submit" className="w-52 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Valider</button>
</div>
    </form>
  );
};

export default CommandeForm;

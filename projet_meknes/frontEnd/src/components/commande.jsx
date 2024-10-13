import axios from 'axios';
import { useEffect, useState } from 'react';

const CommandeForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    phone: '',
    niveau: '',
    cycle: '',
    schoolSearch: '',
    selectedSchool: [],
    allCommands: false,
    books: false,
    notebooks: false,
    fournitures: false,
    goodQuality: true,
    averageQuality: false,
  });

  // select functions
  const [ecoles, setEcoles] = useState([]);
  const [filteredEcoles, setFilteredEcoles] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [specialtes, setSpecialtes] = useState([]);

  const [selectedEcole, setSelectedEcole] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [selectedNiveau, setSelectedNiveau] = useState(null);

  // Fetch ecoles (assuming you already have an API for fetching ecoles)
  useEffect(() => {
    axios.get("http://localhost:8000/api/ecoles")
      .then(response => {
        setEcoles(response.data);
        setFilteredEcoles(response.data); // Initialize with all écoles
      })
      .catch(error => console.error("Error fetching ecoles:", error));
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

    // Filter the écoles based on the search input
    const filtered = ecoles.filter(ecole =>
      ecole.nom_ecole.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEcoles(filtered); // Update filtered écoles
  };

  // Fetch cycles when ecole is selected
  const handleEcoleChange = (ecoleId) => {
    setSelectedEcole(ecoleId);
    axios.get(`http://localhost:8000/api/ecole/${ecoleId}/cycles`)
      .then(response => setCycles(response.data))
      .catch(error => console.error("Error fetching cycles:", error));
  };

  // Fetch niveaux when cycle is selected
  const handleCycleChange = (cycleId) => {
    setSelectedCycle(cycleId);
    axios.get(`http://localhost:8000/api/cycle/${cycleId}/niveaux`)
      .then(response => setNiveaux(response.data))
      .catch(error => console.error("Error fetching niveaux:", error));
  };

  // Fetch specialtes when niveau is selected
  const handleNiveauChange = (niveauId) => {
    setSelectedNiveau(niveauId);
    axios.get(`http://localhost:8000/api/niveau/${niveauId}/specialtes`)
      .then(response => setSpecialtes(response.data))
      .catch(error => console.error("Error fetching specialtes:", error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulaire soumis !');
    // Handle form submission logic here
  };

  const toggleCommandCheckboxes = (name) => {
    setFormValues((prev) => {
      const newValues = {
        ...prev,
        [name]: !prev[name], // Toggle the checkbox state (books, notebooks, fournitures)
      };

      // If "allCommands" is checked, uncheck the others
      if (name === 'allCommands') {
        return {
          ...newValues,
          books: false,
          notebooks: false,
          fournitures: false,
        };
      }

      // Check if all specific boxes are checked
      const allChecked =
        newValues.books && newValues.notebooks && newValues.fournitures;

      if (allChecked) {
        // If all three are checked, uncheck and check "allCommands"
        newValues.books = false;
        newValues.notebooks = false;
        newValues.fournitures = false;
        newValues.allCommands = true; // Check "allCommands"
      } else {
        // If "allCommands" is unchecked, uncheck others
        newValues.allCommands = false;
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
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex justify-center">Formulaire de la Commande</h1>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom Compléte</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formValues.fullName}
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
              value={formValues.phone}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-12 p-2.5 w-full"
              placeholder="123-456-7890"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
            value={formValues.schoolSearch}
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
        <label htmlFor="niveau" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Spécialité</label>
        <select
          id="Specialite"
          name="Specialite"
          disabled={!selectedNiveau}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
        required
      >
        <option value="">Sélectionner un Specialite</option>
        {specialtes.map(specialte => (
                    <option key={specialte.id_specialite} value={specialte.id_specialite}>
                        {specialte.libelle}
                    </option>
                ))}
      </select>
    </div>


  <div className="mb-6">
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
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label htmlFor="allCommands" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Toute la commande</label>
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
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label htmlFor="books" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Livres</label>
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
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label htmlFor="notebooks" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cahiers</label>
        </div>
      </li>
      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center ps-3">
          <input
            id="fournitures"
            type="checkbox"
            name="fournitures"
            checked={formValues.fournitures}
            onChange={() => toggleCommandCheckboxes('fournitures')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label htmlFor="fournitures" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fournitures</label>
        </div>
      </li>
    </ul>
  </div>

  <div className="mb-6">
    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Qualité :</h3>
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        id="goodQuality"
        name="goodQuality"
        checked={formValues.goodQuality}
        onChange={() => updateQualityCheckboxes('goodQuality', 'averageQuality')}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />
      <label htmlFor="goodQuality" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bonne qualité</label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="averageQuality"
        name="averageQuality"
        checked={formValues.averageQuality}
        onChange={() => updateQualityCheckboxes('averageQuality', 'goodQuality')}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />
      <label htmlFor="averageQuality" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Qualité moyenne</label>
    </div>
  </div>
<div className='flex justify-center'>  <button type="submit" className="w-52 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Valider</button>
</div>

</form>

  );
};

export default CommandeForm;

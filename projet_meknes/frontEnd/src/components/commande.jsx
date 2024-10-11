import { useState } from 'react';

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const schools = ['école 1', 'école 2', 'école 3', 'école 4', 'école 5'];

  const filterSchools = () => {
    const input = formValues.schoolSearch.toLowerCase();
    return schools.filter((school) =>
      school.toLowerCase().startsWith(input)
    );
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
        [name]: !prev[name], // Change l'état de la case cochée (livres, cahiers, fournitures)
      };

      // Si "tout la commande" est cochée, décocher les autres cases
      if (name === 'allCommands') {
        return {
          ...newValues,
          books: false,
          notebooks: false,
          fournitures: false,
        };
      }

      // Vérifiez si toutes les cases spécifiques sont cochées
      const allChecked =
        newValues.books && newValues.notebooks && newValues.fournitures;

      if (allChecked) {
        // Si les trois sont cochées, décocher et cocher "toute la commande"
        newValues.books = false;
        newValues.notebooks = false;
        newValues.fournitures = false;
        newValues.allCommands = true; // Coche "toute la commande"
      } else {
        // Si "toute la commande" est décochée, décocher les autres
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

  const niveaux = ['Débutant', 'Intermédiaire', 'Avancé'];
  const cycles = ['Cycle 1', 'Cycle 2', 'Cycle 3'];

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

    <div>
      <label htmlFor="niveau" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Niveau</label>
      <select
        id="niveau"
        name="niveau"
        value={formValues.niveau}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
        required
      >
        <option value="">Sélectionner un niveau</option>
        {niveaux.map((niveau) => (
          <option key={niveau} value={niveau}>
            {niveau}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="cycle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cycle</label>
      <select
        id="cycle"
        name="cycle"
        value={formValues.cycle}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
        required
      >
        <option value="">Sélectionner un cycle</option>
        {cycles.map((cycle) => (
          <option key={cycle} value={cycle}>
            {cycle}
          </option>
        ))}
      </select>
    </div>
  </div>

  <div className="mb-6">
    <label htmlFor="schoolSearch" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">École :</label>
    <input
      type="text"
      id="schoolSearch"
      name="schoolSearch"
      value={formValues.schoolSearch}
      onChange={handleChange}
      placeholder="Rechercher une école..."
      className="block w-full p-2 border rounded-lg"
    />
    <select multiple id="school" className="mt-2 block w-full p-2 border rounded-lg">
      {filterSchools().map((school) => (
        <option key={school} value={school}>
          {school}
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

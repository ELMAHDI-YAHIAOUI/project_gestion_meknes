export default function AffectationCommande () {
    return (
    <>
<form className="bg-white p-5 rounded-lg shadow-md w-full h-screen ">
<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex justify-center">Formulaire daffectation</h1>

        <div>
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom Compléte</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full "
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-12 p-2.5 w-full"
              placeholder="123-456-7890"
              required
            />
          </div>
          <div>
         <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
  <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

    <option>United States</option>
    <option>Canada</option>
    <option>France</option>
    <option>Germany</option>
  </select>
        </div>
          </div>


      <div className="flex justify-center">

<button type="submit" className="w-52 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Valider</button>
</div>
    </form>
    </>
    )
}

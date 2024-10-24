// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { fetchProducts, deleteProduct } from '../authService';

export default function Index() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const response = await fetchProducts();
//         setData(response.data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des produits :", error);
//       }
//     };

//     loadProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await deleteProduct(id);
//       setData(data.filter(item => item.id !== id));
//     } catch (error) {
//       console.error("Erreur lors de la suppression du produit :", error);
//     }
//   };

  return (
    <>
    <h1>welcome</h1>
      {/* <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.created_at}</td>
              <td>
                <Link to={`/show/${item.id}`}>
                  <button>Show</button>
                </Link>
                <Link to={`/edit/${item.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
}

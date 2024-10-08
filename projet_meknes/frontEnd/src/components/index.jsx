import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [data, setData] = useState([]); // Initialize as an empty array

  // Fetch the product details when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/product");
        setData(response.data); // Set the fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle the delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/product/${id}`);
      setData(data.filter(item => item.id !== id)); // Update the state after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <table border={1}>
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
      </table>
    </>
  );
}

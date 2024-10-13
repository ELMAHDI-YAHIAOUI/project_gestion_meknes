import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams(); // Destructure id from useParams
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Fetch the product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {

        const response = await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
        const { name, price } = response.data.product;
        setName(name);
        setPrice(price);

    };

    fetchProduct();
  }, [id]);

  // Handle the update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = { name, price, _method: "PUT" };

  
      const response = await axios.post(`http://127.0.0.1:8000/api/product/${id}`, data);
      console.log("Product updated successfully:", response.data);
      navigate("/"); // Redirect after successful update
  
  };

  return (
    <>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <button type="submit">Update</button>
      </form>
    </>
  );
}

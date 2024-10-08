import axios from "axios";
import { useState, useEffect } from "react";

export default function Index() {
  const [data, setData] = useState([]); // Initialize as an empty array

  // Fetch the product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {

        const response = await axios.get("http://127.0.0.1:8000/api/product");
        const data = response.data;
        setData(data); // Set the fetched data

    };

    fetchProduct();
  }, []);

  return (
    <>
      {
        data.map((item, index) => (
          <div key={index}>
            <h1>{item.name}</h1> {/* Access the correct item property */}
            <p>Price: {item.price}</p>
          </div>
        ))}

    </>
  );
}

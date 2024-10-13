import axios from "axios";
import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";

export default function Show() {
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


  return (
    <>


price  <h1>{price} </h1>
name  <h1>{name} </h1>


    </>
  );
}

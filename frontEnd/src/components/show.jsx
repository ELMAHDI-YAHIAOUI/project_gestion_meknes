import axios from "axios";
import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";

export default function Show() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {

        const response = await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
        const { name, price } = response.data.product;
        setName(name);
        setPrice(price);

    };fetchProduct();}, [id]);
  return (
        <>
        price  <h1>{price} </h1>
        name  <h1>{name} </h1>
    </>
  );
}

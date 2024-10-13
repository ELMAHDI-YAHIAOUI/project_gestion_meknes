import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [price, setPrice] = useState("");




  const add = async (e) => {
    e.preventDefault();

    const data = { name: name, price: price };


      const response = await axios.post("http://127.0.0.1:8000/api/product", data);
      console.log("Success", response.data);
      navigate("/");

  };


  return (
    <>
      <form onSubmit={add}>
        <div>
          <label>Title:</label>
          <input type="text" onChange={(e) => setname(e.target.value)} />
        </div>

        <div>
          <label>Price:</label>
          <input type="text" onChange={(e) => setPrice(e.target.value)} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

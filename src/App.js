//hooks
import { useEffect, useState } from "react";

//style
import "./App.css";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:3000/products";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  //1-Regastando dados
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url);

  //     const data = await res.json();

  //     setProducts(data);
  //   }
  //   fetchData();
  // }, []);

  //4-custom hook
  const { data: itens, httpConfig } = useFetch(url);

  //add de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
    };

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(product),
    // });

    // //3- dynamic reload
    // const addedProduct = await res.json();
    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    // setName("");
    // setPrice("");

    //5- refactor config
    httpConfig(product, "POST");
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {itens &&
          itens.map((product) => (
            <li key={product.id}>
              {product.name} - R${product.price}
            </li>
          ))}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="Criar produto" />
        </form>
      </div>
    </div>
  );
}

export default App;

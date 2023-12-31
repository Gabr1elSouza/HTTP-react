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

  //4-custom hook
  const { data: itens, httpConfig, loading, error } = useFetch(url);

  //1-Regastando dados
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url);

  //     const data = await res.json();

  //     setProducts(data);
  //   }
  //   fetchData();
  // }, []);

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

    setName("");
    setPrice("");

    //5- refactor config
    httpConfig(product, "POST");
  };

  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {/*Loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
        <ul>
          {itens &&
            itens.map((product) => (
              <li key={product.id}>
                {product.name} - R${product.price}
                <button onClick={() => handleRemove(product.id)}>
                  Excluir
                </button>
              </li>
            ))}
        </ul>
      )}
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
          {/*Loading */}
          {loading && <input type="submit" disabled value="AGUARDE" />}
          {!loading && <input type="submit" value="Criar produto" />}
        </form>
      </div>
    </div>
  );
}

export default App;

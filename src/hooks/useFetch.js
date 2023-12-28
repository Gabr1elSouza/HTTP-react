import { useState, useEffect } from "react";

// 4- custom hook

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  //5- Refactor post
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  //6- loading
  const [loading, setLoading] = useState(false);

  //7- tratando erro
  const [error, setError] = useState(null);

  //8- desafio 6
  const [itemId, setItemId] = useState(null);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    } else if (method === "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
      });
      setMethod(method);
      setItemId(data);
    }
  };

  useEffect(() => {
    const FetchData = async () => {
      //6- loading
      setLoading(true);
      try {
        const res = await fetch(url);

        const json = await res.json();

        setData(json);
      } catch (error) {
        console.log(error.message);
        setError("Houve algum erro ao carregar os dados!");
      }
      setLoading(false);
    };
    FetchData();
  }, [url, callFetch]);

  //5- Refactor post

  useEffect(() => {
    const httpQuest = async () => {
      let json;
      if (method === "POST" && config) {
        let fetchOption = [url, config];

        const res = await fetch(...fetchOption);

        json = await res.json();

        setCallFetch(json);
      } else if (method === "DELETE") {
        const deleteUrl = `${url}/${itemId}`;
        const res = await fetch(deleteUrl, config);

        json = await res.json();

        setCallFetch(json);
      }
    };
    httpQuest();
  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};

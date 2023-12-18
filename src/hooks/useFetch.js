import { useState, useEffect } from "react";

// 4- custom hook

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  //5- Refactor post
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    }
  };

  useEffect(() => {
    const FetchData = async () => {
      const res = await fetch(url);

      const json = await res.json();

      setData(json);
    };
    FetchData();
  }, [url]);

  //5- Refactor post

  useEffect(() => {
    const httpQuest = async () => {
      if (method === "POST") {
        let fetchOption = [url, config];

        const res = await fetch(...fetchOption);

        const json = await res.json();

        setCallFetch(json);
      }
    };
    httpQuest();
  }, [config, method, url]);

  return { data, httpConfig };
};

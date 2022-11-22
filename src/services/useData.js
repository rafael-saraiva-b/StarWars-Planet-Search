import { useState, useEffect } from 'react';

function useFetch(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const response = await fetch(url);

        if (!response.ok) {
          const newError = await response.json();
          throw newError.message;
        }

        const dataJson = await response.json();
        dataJson.results.map((item) => delete item.residents);
        setData(dataJson);
      } catch (error) {
        setErrors(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (url) {
      fetchData();
    }
  }, [url]);

  return { isLoading, data, errors };
}

export default useFetch;

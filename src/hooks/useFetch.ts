import { useState, useEffect } from 'react'

const useFetch = <T,>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchFunction()
      .then((response) => {
        setData(response)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      });
  }, [fetchFunction])

  return { data, loading, error };
};

export default useFetch;
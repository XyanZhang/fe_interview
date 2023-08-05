import { useState, useEffect, useCallback } from 'react';

export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);
    setLoading(true);

    return asyncFunction()
      .then((response) => {
        setValue(response);
        setStatus('success');
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setStatus('error');
        setLoading(false);
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error, loading };
};
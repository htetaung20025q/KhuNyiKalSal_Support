import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext({
  isLoading: false,
  loadingType: 'spinner', // 'spinner' or 'skeleton'
  message: '',
  showLoading: () => {},
  hideLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState('spinner');
  const [message, setMessage] = useState('');

  const showLoading = useCallback((type = 'spinner', msg = '') => {
    setLoadingType(type);
    setMessage(msg);
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
    setMessage('');
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, loadingType, message, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

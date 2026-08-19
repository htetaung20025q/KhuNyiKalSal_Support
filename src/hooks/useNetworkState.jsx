import { useState, useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';

const useNetworkState = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      hideLoading();
    };

    const handleOffline = () => {
      setIsOnline(false);
      showLoading('spinner', 'You are offline. Waiting for connection...');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showLoading, hideLoading]);

  return isOnline;
};

export default useNetworkState;

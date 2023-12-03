import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useTokenExpiration = () => {
  useEffect(() => {
    const checkTokenExpiration = () => {
      const authToken = localStorage.getItem('authToken');
    
      try {
        const decodedToken = JSON.parse(atob(authToken.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000;
        const warningTime = 5 * 60 * 1000;
        if (Date.now() >= expirationTime - warningTime) {
          toast.warn('Tu sesión está a punto de expirar. Por favor, vuelve a iniciar sesión.', {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        }
    
        if (Date.now() >= expirationTime) {
          console.log('Token removed due to expiration');
          setTimeout(() => {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }, 5000); 
        }
        
      } catch (error) {
        console.error('Error decoding or checking token expiration:', error);
        console.log('Token removed due to decoding error');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    };    
    const intervalId = setInterval(checkTokenExpiration, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default useTokenExpiration;

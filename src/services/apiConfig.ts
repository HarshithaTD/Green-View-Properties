

const PORT = 3001;

const LOCAL_IP =
  '192.168.1.40';

const USE_PRODUCTION = true;

const PRODUCTION_URL =
  'https://greenview-backend.onrender.com';

const getHost = () => {
  if (USE_PRODUCTION) {
    return PRODUCTION_URL;
  }

  return `http://${LOCAL_IP}:${PORT}`;
};

export const API_HOST = getHost();

export const API_BASE_URL =`${API_HOST}/api`;  

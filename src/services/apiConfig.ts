import {Platform} from 'react-native';

const PORT = 3001;

// Set this to your computer Wi-Fi IP for real Android/iPhone testing.
// Keep it empty for Android emulator/iOS simulator defaults.
const REAL_DEVICE_HOST = '';

const getHost = () => {
  if (REAL_DEVICE_HOST) {
    return `http://${REAL_DEVICE_HOST}:${PORT}`;
  }

  if (Platform.OS === 'android') {
    return `http://192.168.1.40:${PORT}`;
  }

  return `http://10.0.2.2:${PORT}`;
};

export const API_HOST = getHost();

export const API_BASE_URL = `${API_HOST}/api`;

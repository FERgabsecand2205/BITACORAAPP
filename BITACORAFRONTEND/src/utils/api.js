export const API_URL_LOCAL = 'http://localhost:3001/api';
export const API_URL_RENDER = 'https://bitacoraapp.onrender.com/api';
export const API_URL = window.location.hostname === 'localhost' ? API_URL_LOCAL : API_URL_RENDER;

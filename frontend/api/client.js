import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  //baseURL: 'https://app-searchly-latest.onrender.com' || 'http://localhost:8080'
});

export default client;

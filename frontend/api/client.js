import axios from 'axios';

const client = axios.create({
  //baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  baseURL: 'https://app-shortly.onrender.com/api/v1/' || 'http://localhost:5000/api/v1'
});

export default client;

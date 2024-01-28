import axios from 'axios';

const baseURL =
  import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:5100';

const fetchUrl = axios.create({
  baseURL: `${baseURL}/api/v1`,
  withCredentials: true,
});

export default fetchUrl;

import axios from 'axios';

const fetchUrl = axios.create({
  baseURL: 'http://localhost:5100/api/v1',
  withCredentials: true,
});

export default fetchUrl;

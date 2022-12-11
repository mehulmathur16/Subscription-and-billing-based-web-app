import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_DEPLOYMENT_KEY;

export default axios;
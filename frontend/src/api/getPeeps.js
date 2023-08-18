import axios from 'axios';

const apiURL = import.meta.env.VITE_APP_API_URL;

export const getPeeps = async () => {
  try {
    const response = await axios.get(`${apiURL}/`);
    return { peepData: response.data }
  } catch (error) {
    return { peepData: [], error: error.message };
  }
}
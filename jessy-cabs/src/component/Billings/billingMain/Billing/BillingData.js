import axios from 'axios';
import { APIURL } from "../../../url";
const apiUrl = APIURL;

export const fetchBankOptions = async () => {
  try {
    const response = await axios.get(`http://${apiUrl}/bankoptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bank options:', error);
    throw error;
  }
};
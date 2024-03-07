import axios from 'axios';
import { APIURL } from "../../../url";
const apiUrl = APIURL;

export const Organization = async () => {
  try {
    const response = await axios.get(`http://${apiUrl}/organizationoptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bank options:', error);
    throw error;
  }
};
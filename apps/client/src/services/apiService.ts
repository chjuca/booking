import axios from 'axios';

export const postData = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data, {
      headers: data instanceof FormData ? {} : { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Network response was not ok');
  }
};

export const getData = async (url: string): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Network response was not ok');
  }
};
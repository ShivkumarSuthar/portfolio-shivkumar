// src/api/apiCall.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Refresh Token Logic
const getNewAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token found');

  const response = await axios.post('/auth/refresh', { refreshToken });
  return response.data.accessToken;
};

// Main API Call Function
export const serverRequest = async ({
  method = 'get',
  url = '',
  data = {},
  params = {},
  headers = {},
  retry = true,
}) => {
  try {
    const token = localStorage.getItem('accessToken');
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      headers: {
        ...authHeaders,
        ...headers,
      },
    });

    return response.data;
  } catch (error) {
    // Handle token expiration (401 Unauthorized)
    if (
      error.response?.status === 401 &&
      retry &&
      !url.includes('/auth/refresh')
    ) {
      try {
        const newToken = await getNewAccessToken();
        localStorage.setItem('accessToken', newToken);

        // Retry original request with new token
        return await serverRequest({
          method,
          url,
          data,
          params,
          headers,
          retry: false, // Avoid infinite retry loop
        });
      } catch (refreshError) {
        console.error('Token refresh failed. Logging out...');
        localStorage.clear();
        window.location.href = '/login';
        throw refreshError;
      }
    }

    console.error(`API Error [${method.toUpperCase()}] ${url}:`, error.response?.data || error.message);
    throw error;
  }
};

export default serverRequest;

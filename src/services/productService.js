import api from '../services/api';

export const fetchProducts = async (page, size) => {
  const params = { page, size };

  const { data } = await api.get('/producttypes', { params, timeout: 20000 });
  return data;
};

export const filterProductsByName = async (name, page, size) => {
  const params = { name, page, size };

  const { data } = await api.get('/producttypes', { params, timeout: 20000 });
  return data;
};

// import axios from 'axios';

// export const fetchProducts = async (page, size, token) => {
//     const params = { page, size };
    
//     const config = {
//         headers: { Authorization: `Bearer ${token}` },
//         params,
//         timeout: 20000,
//     };
    
//     console.log(`Fetching products with params:`, params);
//     const { data } = await axios.get(`https://account.agridential.vn/api/v1/producttypes`, config);
//     return data;
// };

// export const filterProductsByName = async (name, page, size, token) => {
//     const params = { name, page, size };
    
//     const config = {
//         headers: { Authorization: `Bearer ${token}` },
//         params,
//         timeout: 20000,
//     };
    
//     console.log(`Filtering products with params:`, params);
//     const { data } = await axios.get(`https://account.agridential.vn/api/v1/producttypes`, config);
//     return data;
// };

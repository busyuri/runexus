import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
    baseURL: '/api', // isteğe bağlı, token için gerekli değil
=======
    baseURL: '/api',
    withCredentials: true, // isteğe bağlı, token için gerekli değil
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
});

// 🔥 Token'ı otomatik olarak tüm isteklere ekle
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

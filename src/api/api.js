import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true, // isteğe bağlı, token için gerekli değil
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

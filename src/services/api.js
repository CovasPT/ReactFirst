import axios from 'axios';

// <---------------- Alterado por gemini: Configuração centralizada da API
const api = axios.create({
    // 🛑 IMPORTANTE: Substitui o IP abaixo pelo TEU IPv4 que viste no ipconfig
    // Mantém a porta :8000 e o /api no fim.
    baseURL: 'http://172.20.10.4:8000/api', 
});

export default api;
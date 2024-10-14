import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000', // Ajuste para a URL correta do seu backend
});

// Interceptor de requisição
api.interceptors.request.use(
    config => {
        // Adicione lógica antes de enviar a requisição, como adicionar tokens
        return config;
    },
    error => {
        // Lide com erros de requisição
        return Promise.reject(error);
    }
);

// Interceptor de resposta
api.interceptors.response.use(
    response => {
        // Qualquer lógica de resposta bem-sucedida
        return response;
    },
    error => {
        // Lide com erros de resposta
        if (error.response && error.response.status === 401) {
            // Exemplo: redirecionar para login se não autorizado
        }
        return Promise.reject(error);
    }
);

export default api;


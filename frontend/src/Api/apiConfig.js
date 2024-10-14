// Configuração da URL base da API
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/';

// Função para obter headers padrão
export const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };

    // Adiciona o token de autenticação, se disponível
    const token = localStorage.getItem('authToken');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

// Função para lidar com erros da API
export const handleApiError = (error) => {
    if (error.response) {
        // O servidor respondeu com um status fora do intervalo 2xx
        console.error('Erro na resposta da API:', error.response.data);
        return error.response.data;
    } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        console.error('Sem resposta da API:', error.request);
        return { message: 'Não foi possível conectar ao servidor.' };
    } else {
        // Algo aconteceu na configuração da requisição que causou o erro
        console.error('Erro na configuração da requisição:', error.message);
        return { message: 'Ocorreu um erro ao processar a requisição.' };
    }
};

// Configurações padrão para requisições axios
export const axiosConfig = {
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 segundos
    headers: getHeaders(),
};

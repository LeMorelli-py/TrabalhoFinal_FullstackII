import api from './api';

class CandidatoService {
    async obterTodos() {
        const response = await api.get('/candidatos');
        return response.data;
    }

    async adicionar(candidato) {
        const response = await api.post('/candidatos', candidato);
        return response.data;
    }

    async atualizar(cpf, candidato) {
        const response = await api.put(`/candidatos/${cpf}`, candidato);
        return response.data;
    }

    async delete(cpf) {
        await api.delete(`/candidatos/${cpf}`);
    }

    async filtrar(termoBusca) {
        const response = await api.get(`/candidatos/filtrar/${termoBusca}`);
        return response.data;
    }
}

export default new CandidatoService();

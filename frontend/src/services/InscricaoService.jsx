const API_BASE_URL = 'http://localhost/:4000';

class InscricaoService {
    async obterTodos() {
        try {
            const response = await fetch(`${API_BASE_URL}/inscricoes`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Ocorreu um erro ao listar inscricoes');
            }

            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }

    

    async adicionar(inscricoesDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/inscricoes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inscricoesDados)
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar inscricao');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async atualizar(id_inscricao, inscricoesDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/inscricoes/${id_inscricao}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inscricoesDados)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar inscricao');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id_inscricao) {
        try {
            const response = await fetch(`${API_BASE_URL}/inscricoes/${id_inscricao}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar inscricao');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async filtrar(termoBusca) {
        try {
            const response = await fetch(`${API_BASE_URL}/inscricoes/filtrar/${termoBusca}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Ocorreu um erro ao filtrar inscricoes');
            }

            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default InscricaoService;
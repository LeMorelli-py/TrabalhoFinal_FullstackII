const API_BASE_URL = 'http://localhost:4000';

class VagaService {
    async obterTodos() {
        try {
            const response = await fetch(`${API_BASE_URL}/vagas`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Ocorreu um erro ao listar vagas');
            }

            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }

    async obterPorCod_Vaga(cod_vaga) {
        try {
            const response = await fetch(`${API_BASE_URL}/vagas/${cod_vaga}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Ocorreu um erro ao obter vaga');
            }

            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async adicionar(vagasDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/vagas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vagasDados)
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar vaga');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async atualizar(cod_vaga, vagasDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/vagas/${cod_vaga}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vagasDados)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar vaga');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(cod_vaga) {
        try {
            const response = await fetch(`${API_BASE_URL}/vagas/${cod_vaga}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar vaga');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async filtrar(termoBusca) {
        try {
            const response = await fetch(`${API_BASE_URL}/vagas/filtrar/${termoBusca}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Ocorreu um erro ao filtrar vagas');
            }

            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}4

export default VagaService;
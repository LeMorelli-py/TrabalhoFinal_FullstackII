import React, { useState, useEffect, useCallback } from 'react';
import { Container, Alert } from 'react-bootstrap';
import CandidatoForm from '../Components/CandidatoForm';
import api from '../services/api';

const CandidatosPagina = () => {
    const [candidatos, setCandidatos] = useState([]);
    const [candidatoAtual, setCandidatoAtual] = useState(null);
    const [mensagem, setMensagem] = useState(null);

    const carregarCandidatos = useCallback(async () => {
        try {
            const response = await api.get('/candidatos');
            setCandidatos(response.data);
        } catch (error) {
            console.error('Erro ao carregar candidatos:', error);
            exibirMensagem('Erro ao carregar candidatos', 'danger');
        }
    }, []);

    useEffect(() => {
        carregarCandidatos();
    }, [carregarCandidatos]);

    const gravarCandidato = async (candidato) => {
        try {
            const response = await api.post('/candidatos', candidato);
            console.log('Candidato gravado:', response.data);
            await carregarCandidatos();
            exibirMensagem('Candidato cadastrado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao gravar candidato:', error);
            exibirMensagem('Erro ao cadastrar candidato', 'danger');
        }
    };

    const atualizarCandidato = async (cpf, candidato) => {
        try {
            const response = await api.put(`/candidatos/${cpf}`, candidato);
            console.log('Candidato atualizado:', response.data);
            await carregarCandidatos();
            setCandidatoAtual(null);
            exibirMensagem('Candidato atualizado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao atualizar candidato:', error);
            exibirMensagem('Erro ao atualizar candidato', 'danger');
        }
    };

    const excluirCandidato = async (cpf) => {
        try {
            await api.delete(`/candidatos/${cpf}`);
            console.log('Candidato excluído');
            await carregarCandidatos();
            setCandidatoAtual(null);
            exibirMensagem('Candidato excluído com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao excluir candidato:', error);
            exibirMensagem('Erro ao excluir candidato', 'danger');
        }
    };

    const exibirMensagem = (texto, tipo) => {
        setMensagem({ texto, tipo });
        setTimeout(() => setMensagem(null), 5000); // Remove a mensagem após 5 segundos
    };

    return (
        <Container className="candidatos-pagina">
            <h1 className="text-center">Gerenciamento de Candidatos</h1>
            {mensagem && (
                <Alert variant={mensagem.tipo} onClose={() => setMensagem(null)} dismissible>
                    {mensagem.texto}
                </Alert>
            )}
            <CandidatoForm 
                candidatos={candidatos}
                candidatoAtual={candidatoAtual}
                setCandidatoAtual={setCandidatoAtual}
                onGravar={gravarCandidato}
                onAtualizar={atualizarCandidato}
                onExcluir={excluirCandidato}
            />
        </Container>
    );
};

export default CandidatosPagina;

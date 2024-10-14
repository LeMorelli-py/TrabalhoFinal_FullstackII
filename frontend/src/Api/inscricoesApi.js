import axios from 'axios';
import { API_BASE_URL, getHeaders, handleApiError } from './apiConfig';

const INSCRICOES_URL = `${API_BASE_URL}/inscricoes`;

export const getInscricoes = async () => {
    try {
        const response = await axios.get(INSCRICOES_URL, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getInscricao = async (id_inscricao) => {
    try {
        const response = await axios.get(`${INSCRICOES_URL}/${id_inscricao}`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const createInscricao = async (inscricaoData) => {
    try {
        const response = await axios.post(INSCRICOES_URL, inscricaoData, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const updateInscricao = async (id_inscricao, inscricaoData) => {
    try {
        const response = await axios.put(`${INSCRICOES_URL}/${id_inscricao}`, inscricaoData, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteInscricao = async (id_inscricao) => {
    try {
        const response = await axios.delete(`${INSCRICOES_URL}/${id_inscricao}`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

// Função adicional para buscar inscrições por CPF do candidato
export const getInscricoesByCandidatoCPF = async (cpf) => {
    try {
        const response = await axios.get(`${INSCRICOES_URL}/candidato/${cpf}`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

// Função adicional para buscar inscrições por código da vaga
export const getInscricoesByVagaCodigo = async (cod_vaga) => {
    try {
        const response = await axios.get(`${INSCRICOES_URL}/vaga/${cod_vaga}`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

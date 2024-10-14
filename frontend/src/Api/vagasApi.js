import axios from 'axios';
import { API_BASE_URL, getHeaders, handleApiError } from './apiConfig';

const VAGAS_URL = `${API_BASE_URL}/vagas`;

export const getVagas = async () => {
    try {
        const response = await axios.get(VAGAS_URL, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getVaga = async (cod_vaga) => {
    try {
        const response = await axios.get(`${VAGAS_URL}/${cod_vaga}`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const createVaga = async (vagaData) => {
    try {
        const response = await axios.post(VAGAS_URL, vagaData, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const updateVaga = async (cod_vaga, vagaData) => {
    try {
        const response = await axios.put(`${VAGAS_URL}/${cod_vaga}`, vagaData, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteVaga = async (cod_vaga) => {
    try {
        const response = await axios.delete(`${VAGAS_URL}/${cod_vaga}`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};


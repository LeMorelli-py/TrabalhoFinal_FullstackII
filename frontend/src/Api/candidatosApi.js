import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

const CANDIDATOS_URL = `${API_BASE_URL}/candidatos`;

export const getCandidatos = () => axios.get(CANDIDATOS_URL);

export const getCandidato = (cpf) => axios.get(`${CANDIDATOS_URL}/${cpf}`);

export const createCandidato = (candidatoData) => axios.post(CANDIDATOS_URL, candidatoData);

export const updateCandidato = (cpf, candidatoData) => axios.put(`${CANDIDATOS_URL}/${cpf}`, candidatoData);

export const deleteCandidato = (cpf) => axios.delete(`${CANDIDATOS_URL}/${cpf}`);

import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from './Paginas/Home.jsx';
import CandidatoForm from './Components/CandidatoForm.jsx'; 
import InscricaoForm from './Components/InscricaoForm.jsx';
import VagaForm from './Components/VagaForm.jsx';
import CandidatoPagina from './Paginas/CandidatosPagina.jsx';
import InscricoesPagina from './Paginas/InscricoesPagina.jsx';
import VagasPagina from './Paginas/VagasPagina.jsx';
import Navbar from './Components/Navbar.jsx';
import './App.css';
import api from './api';

const App = () => {
    const location = useLocation();
    const [candidatos, setCandidatos] = useState([]);
    const [candidatoAtual, setCandidatoAtual] = useState(null);

    useEffect(() => {
        fetchCandidatos();
    }, []);

    const fetchCandidatos = async () => {
        try {
            const response = await api.get('/candidatos');
            setCandidatos(response.data);
        } catch (error) {
            console.error('Erro ao buscar candidatos:', error);
        }
    };

    const handleGravar = (novoCandidato) => {
        setCandidatos([...candidatos, novoCandidato]);
    };

    const handleAtualizar = (candidatoAtualizado) => {
        setCandidatos(candidatos.map(c => c.cpf === candidatoAtualizado.cpf ? candidatoAtualizado : c));
    };

    const handleExcluir = (cpf) => {
        setCandidatos(candidatos.filter(c => c.cpf !== cpf));
    };

    return (
        <div className="App">
            {location.pathname !== '/home' && <Navbar />}
            <h1>Gerenciamento de Candidatos e Inscrições</h1>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/candidatos" element={<CandidatoForm />} />
                <Route path="/inscricoes" element={<InscricaoForm />} />
                <Route path="/vagas" element={<VagaForm />} />
                <Route path="/candidatos/:id" element={<CandidatoPagina />} />
                <Route path="/inscricoes/:id" element={<InscricoesPagina />} />
                <Route path="/vagas/:id" element={<VagasPagina />} />
                {/* Redireciona de / para /home */}
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<h2>Página não encontrada</h2>} />
            </Routes>
        </div>
    );
};

export default App;

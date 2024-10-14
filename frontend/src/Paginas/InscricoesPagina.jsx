import React from 'react';
import { Container } from 'react-bootstrap';
import InscricaoForm from '../Components/InscricaoForm';    


const InscricoesPagina = () => {
    return (
        <Container className="inscricoes-pagina">
            <h1 className="text-center">Gerenciamento de Inscrições</h1>
            <InscricaoForm />
        </Container>
    );
};

export default InscricoesPagina;
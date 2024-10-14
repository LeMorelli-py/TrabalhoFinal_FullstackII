import React from 'react';
import { Container } from 'react-bootstrap';
import VagaForm from '../Components/VagaForm';


const VagasPagina = () => {
    return (
        <Container className="vagas-pagina">
            <h1 className="text-center">Gerenciamento de Vagas</h1>
            <VagaForm />
        </Container>
    );
};

export default VagasPagina;
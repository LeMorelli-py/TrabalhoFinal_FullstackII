import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup, Row, Col } from 'react-bootstrap';
import './StyleForm.css';
import axios from 'axios';

const initialFormData = () => ({
    cargo: '',
    salario: '',
    cidade: '',
    estado: '',
    qtde_vaga: '',
});

const VagaForm = () => {
    const [vagas, setVagas] = useState([]);
    const [selectedVaga, setSelectedVaga] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState(initialFormData());

    useEffect(() => {
        fetchVagas();
    }, []);

    const fetchVagas = async () => {
        try {
            const response = await axios.get('/vagas');
            setVagas(response.data);
        } catch (error) {
            console.error('Erro ao buscar vagas:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedVaga) {
            await handleUpdate();
        } else {
            try {
                await axios.post('/vagas', formData);
                await refreshVagas();
                resetForm();
            } catch (error) {
                console.error('Erro ao criar vaga:', error);
            }
        }
    };

    const handleUpdate = async () => {
        if (!selectedVaga) return;

        try {
            await axios.put(`/vagas/${selectedVaga.cod_vaga}`, formData);
            await refreshVagas();
            resetForm();
        } catch (error) {
            console.error('Erro ao atualizar vaga:', error);
        }
    };

    const onDelete = async (cod_vaga) => {
        if (!cod_vaga) return;

        try {
            await axios.delete(`/vagas/${cod_vaga}`);
            await refreshVagas();
            resetForm();
        } catch (error) {
            console.error('Erro ao excluir vaga:', error);
        }
    };

    const refreshVagas = async () => {
        const response = await axios.get('/vagas');
        setVagas(response.data);
    };

    const resetForm = () => {
        setFormData(initialFormData());
        setSelectedVaga(null);
    };

    const handleSelectVaga = (vaga) => {
        setSelectedVaga(vaga);
        setFormData({
            cargo: vaga.cargo,
            salario: vaga.salario,
            cidade: vaga.cidade,
            estado: vaga.estado,
            qtde_vaga: vaga.qtde_vaga,
        });
    };

    const filteredVagas = vagas.filter(vaga =>
        vaga.cargo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="vaga-form">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="search" className="mb-3">
                            <Form.Label>Pesquisar Vaga</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o cargo"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <ListGroup className="mb-4">
                    {filteredVagas.map((vaga) => (
                        <ListGroup.Item 
                            key={vaga.cod_vaga} 
                            onClick={() => handleSelectVaga(vaga)}
                            action
                        >
                            {vaga.cargo} - {vaga.cidade}/{vaga.estado}
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formCargo" className="mb-3">
                            <Form.Label>Cargo</Form.Label>
                            <Form.Control
                                type="text"
                                name="cargo"
                                value={formData.cargo}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formSalario" className="mb-3">
                            <Form.Label>Salário</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="salario"
                                value={formData.salario}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formCidade" className="mb-3">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                name="cidade"
                                value={formData.cidade}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formEstado" className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formQtdeVaga" className="mb-3">
                            <Form.Label>Quantidade de Vagas</Form.Label>
                            <Form.Control
                                type="number"
                                name="qtde_vaga"
                                value={formData.qtde_vaga}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="me-2"
                        >
                            {selectedVaga ? 'Atualizar' : 'Gravar'}
                        </Button>
                        <Button 
                            variant="warning" 
                            type="button" 
                            className="me-2" 
                            onClick={handleUpdate}
                            disabled={selectedVaga === null}
                        >
                            Atualizar
                        </Button>
                        <Button 
                            variant="danger" 
                            type="button"
                            onClick={() => onDelete(selectedVaga?.cod_vaga)}
                            disabled={selectedVaga === null}
                        >
                            Excluir
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default VagaForm;

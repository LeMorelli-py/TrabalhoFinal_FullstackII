import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import './StyleForm.css';
import axios from 'axios';


const initialFormData = () => ({
    id_inscricao: '',
    data_inscricao: '',
    hora_inscricao: '',
    pk_cand_cpf: '',
    pk_cod_vaga: '',
    status_inscricao: 'Pendente',
});


const InscricaoForm = () => {
    console.log("Renderizando InscricaoForm");

    const [inscricoes, setInscricoes] = useState([]);
    const [candidatos, setCandidatos] = useState([]);
    const [vagas, setVagas] = useState([]);
    const [selectedInscricao, setSelectedInscricao] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState(initialFormData());

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [inscricaoResponse, candidatoResponse, vagaResponse] = await Promise.all([
                axios.get('/inscricoes'),
                axios.get('/candidatos'),
                axios.get('/vagas'),
            ]);

            setInscricoes(inscricaoResponse.data);
            setCandidatos(candidatoResponse.data);
            setVagas(vagaResponse.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
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
        const method = selectedInscricao ? 'put' : 'post';
        const url = selectedInscricao ? `/inscricoes/${formData.id_inscricao}` : '/inscricoes';

        try {
            await axios[method](url, formData);
            await refreshInscricoes();
            resetForm();
        } catch (error) {
            console.error('Erro ao salvar inscrição:', error);
        }
    };

    const onDelete = async (id_inscricao) => {
        try {
            await axios.delete(`/inscricoes/${id_inscricao}`);
            await refreshInscricoes();
            resetForm();
        } catch (error) {
            console.error('Erro ao excluir inscrição:', error);
        }
    };

    const refreshInscricoes = async () => {
        const response = await axios.get('/inscricoes');
        setInscricoes(response.data);
    };

    const resetForm = () => {
        setFormData(initialFormData());
        setSelectedInscricao(null);
    };

    const filteredInscricoes = inscricoes.filter(inscricao =>
        inscricao.pk_cand_cpf.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="inscricao-form">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="search" className="mb-3">
                            <Form.Label>Pesquisar Inscrição (CPF do candidato)</Form.Label>
                            <InputMask
                                mask="999.999.999-99"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        placeholder="Digite o CPF do candidato"
                                    />
                                )}
                            </InputMask>
                        </Form.Group>
                    </Col>
                </Row>

                <ListGroup className="mb-4">
                    {filteredInscricoes.map((inscricao) => (
                        <ListGroup.Item 
                            key={inscricao.id_inscricao} 
                            onClick={() => setFormData(inscricao)}
                            action
                        >
                            CPF: {inscricao.pk_cand_cpf} - Vaga: {inscricao.pk_cod_vaga}
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formIdInscricao" className="mb-3">
                            <Form.Label>ID da Inscrição</Form.Label>
                            <Form.Control
                                type="text"
                                name="id_inscricao"
                                value={formData.id_inscricao}
                                onChange={handleChange}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formDataInscricao" className="mb-3">
                            <Form.Label>Data da Inscrição</Form.Label>
                            <Form.Control
                                type="date"
                                name="data_inscricao"
                                value={formData.data_inscricao}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formHoraInscricao" className="mb-3">
                            <Form.Label>Hora da Inscrição</Form.Label>
                            <Form.Control
                                type="time"
                                name="hora_inscricao"
                                value={formData.hora_inscricao}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formPkCandCpf" className="mb-3">
                            <Form.Label>CPF do Candidato</Form.Label>
                            <Form.Control
                                as="select"
                                name="pk_cand_cpf"
                                value={formData.pk_cand_cpf}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione um candidato</option>
                                {candidatos.map((candidato) => (
                                    <option key={candidato.cpf} value={candidato.cpf}>
                                        {candidato.nome} - {candidato.cpf} {/* Exibe o nome e o CPF */}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formPkCodVaga" className="mb-3">
                            <Form.Label>Código da Vaga</Form.Label>
                            <Form.Control
                                as="select"
                                name="pk_cod_vaga"
                                value={formData.pk_cod_vaga}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione uma vaga</option>
                                {vagas.map((vaga) => (
                                    <option key={vaga.cod_vaga} value={vaga.cod_vaga}>
                                        {vaga.cargo}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formStatusInscricao" className="mb-3">
                            <Form.Label>Status da Inscrição</Form.Label>
                            <Form.Control
                                as="select"
                                name="status_inscricao"
                                value={formData.status_inscricao}
                                onChange={handleChange}
                                required
                            >
                                <option value="Pendente">Pendente</option>
                                <option value="Aprovado">Aprovado</option>
                                <option value="Rejeitado">Rejeitado</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <Button variant="primary" onClick={() => handleSubmit()} className="me-2">Gravar</Button>
                        <Button variant="warning" onClick={() => handleSubmit()} className="me-2">Atualizar</Button>
                        <Button variant="danger" onClick={() => onDelete(formData.id_inscricao)}>Excluir</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default InscricaoForm;

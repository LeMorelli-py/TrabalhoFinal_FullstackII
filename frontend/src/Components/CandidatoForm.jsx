import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import CandidatoService from '../services/CandidatoService'; // Certifique-se de que está importando corretamente
import axios from 'axios';
import './StyleForm.css';

const CandidatoForm = ({ candidatos = [], candidatoAtual, setCandidatoAtual, onGravar, onAtualizar, onExcluir }) => {
    const [form, setForm] = useState({
        cpf: '',
        nome: '',
        dt_nasc: '',
        cep: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        telefone: '',
        email: '',
        estado_civil: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCandidatos, setFilteredCandidatos] = useState([]);

    useEffect(() => {
        if (candidatoAtual) {
            setForm(candidatoAtual);
        }
    }, [candidatoAtual]);

    useEffect(() => {
        const buscarCandidatos = async () => {
            if (searchTerm) {
                try {
                    const candidatosFiltrados = await CandidatoService.filtrar(searchTerm);
                    setFilteredCandidatos(candidatosFiltrados);
                } catch (error) {
                    console.error('Erro ao filtrar candidatos:', error);
                    setFilteredCandidatos([]);
                }
            } else {
                setFilteredCandidatos(candidatos);
            }
        };

        buscarCandidatos();
    }, [searchTerm, candidatos]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleGravar = async () => {
        try {
            console.log('Gravando novo candidato');
            await CandidatoService.adicionar(form);
            if (typeof onGravar === 'function') {
                onGravar(form);
            }
            limparFormulario();
        } catch (error) {
            console.error('Erro ao gravar candidato:', error);
        }
    };

    const handleAtualizar = async () => {
        if (candidatoAtual) {
            try {
                console.log('Atualizando candidato');
                await CandidatoService.atualizar(candidatoAtual.cpf, form);
                if (typeof onAtualizar === 'function') {
                    onAtualizar(form);
                }
                limparFormulario();
            } catch (error) {
                console.error('Erro ao atualizar candidato:', error);
            }
        }
    };

    const handleExcluir = async () => {
        if (candidatoAtual && candidatoAtual.cpf) {
            try {
                await CandidatoService.delete(candidatoAtual.cpf);
                if (typeof onExcluir === 'function') {
                    onExcluir(candidatoAtual.cpf);
                }
                limparFormulario();
            } catch (error) {
                console.error('Erro ao excluir candidato:', error);
            }
        }
    };

    const limparFormulario = () => {
        setForm({
            cpf: '',
            nome: '',
            dt_nasc: '',
            cep: '',
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
            telefone: '',
            email: '',
            estado_civil: '',
        });
        if (typeof setCandidatoAtual === 'function') {
            setCandidatoAtual(null);
        }
    };

    const handleCandidatoSelect = (candidato) => {
        setForm(candidato);
        if (typeof setCandidatoAtual === 'function') {
            setCandidatoAtual(candidato);
        }
    };

    const buscarCep = async (cep) => {
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const { logradouro, bairro, localidade, uf } = response.data;
                setForm(prevForm => ({
                    ...prevForm,
                    endereco: logradouro,
                    bairro,
                    cidade: localidade,
                    estado: uf
                }));
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        }
    };

    const handleCepChange = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        setForm(prevForm => ({ ...prevForm, cep }));
        if (cep.length === 8) {
            buscarCep(cep);
        }
    };

    return (
        <Container className="candidato-form">
            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="search" className="mb-3">
                            <Form.Label>Pesquisar Candidato</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o nome do candidato"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {Array.isArray(filteredCandidatos) && filteredCandidatos.length > 0 && (
                    <ListGroup className="mt-3">
                        {filteredCandidatos.map((candidato) => (
                            <ListGroup.Item 
                                key={candidato.cpf} 
                                onClick={() => handleCandidatoSelect(candidato)}
                                action
                            >
                                {candidato.nome} - {candidato.cpf}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formCpf" className="mb-3">
                            <Form.Label>CPF</Form.Label>
                            <InputMask
                                mask="999.999.999-99"
                                value={form.cpf}
                                onChange={handleChange}
                            >
                                {(inputProps) => <Form.Control {...inputProps} type="text" name="cpf" required />}
                            </InputMask>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formDtNasc" className="mb-3">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                type="date"
                                name="dt_nasc"
                                value={form.dt_nasc}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formCep" className="mb-3">
                            <Form.Label>CEP</Form.Label>
                            <InputMask
                                mask="99999-999"
                                value={form.cep}
                                onChange={handleCepChange}
                            >
                                {(inputProps) => <Form.Control {...inputProps} type="text" name="cep" required />}
                            </InputMask>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formEndereco" className="mb-3">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                type="text"
                                name="endereco"
                                value={form.endereco}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formNumero" className="mb-3">
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                                type="text"
                                name="numero"
                                value={form.numero}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formBairro" className="mb-3">
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control
                                type="text"
                                name="bairro"
                                value={form.bairro}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formCidade" className="mb-3">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                name="cidade"
                                value={form.cidade}
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
                                value={form.estado}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formTelefone" className="mb-3">
                            <Form.Label>Telefone</Form.Label>
                            <InputMask
                                mask="(99) 99999-9999"
                                value={form.telefone}
                                onChange={handleChange}
                            >
                                {(inputProps) => <Form.Control {...inputProps} type="text" name="telefone" required />}
                            </InputMask>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formEstadoCivil" className="mb-3">
                            <Form.Label>Estado Civil</Form.Label>
                            <Form.Control
                                as="select"
                                name="estado_civil"
                                value={form.estado_civil}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="solteiro">Solteiro(a)</option>
                                <option value="casado">Casado(a)</option>
                                <option value="divorciado">Divorciado(a)</option>
                                <option value="viuvo">Viúvo(a)</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <Button variant="primary" type="button" onClick={handleGravar} className="me-2">Gravar</Button>
                        <Button variant="warning" type="button" onClick={handleAtualizar} className="me-2">Atualizar</Button>
                        <Button variant="danger" type="button" onClick={handleExcluir}>Excluir</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default CandidatoForm;
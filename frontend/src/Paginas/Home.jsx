import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Home.css'; 



const Home = () => {
    return (
        <Container className="home-container">
            <h1 className="text-center">Bem-vindo ao NetVagas</h1>
            <p className="text-center">
                A NetVagas é uma plataforma dedicada a conectar candidatos e empresas,
                facilitando o processo de busca por oportunidades de emprego e recrutamento.
            </p>
            <Row className="mt-4">
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Para Candidatos</Card.Title>
                            <Card.Text>
                                Encontre vagas que se adequam ao seu perfil e aplique-se facilmente.
                            </Card.Text>
                            <Button variant="primary" href="/candidatos">Cadastrar-se</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Para Empresas</Card.Title>
                            <Card.Text>
                                Publique suas vagas e encontre os candidatos ideais para sua equipe.
                            </Card.Text>
                            <Button variant="primary" href="/vagas">Cadastra sua vaga</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Inscrições</Card.Title>
                            <Card.Text>
                                Acompanhe suas inscrições e o status das suas candidaturas.
                            </Card.Text>
                            <Button variant="primary" href="/inscricoes">Inscreva-se</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
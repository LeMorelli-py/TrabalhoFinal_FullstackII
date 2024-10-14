import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';

const Navbar = () => {
    return (
        <BootstrapNavbar bg="light" expand="lg">
            <BootstrapNavbar.Brand as={Link} to="/home">NETvagas</BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/candidatos">Candidatos</Nav.Link>
                    <Nav.Link as={Link} to="/inscricoes">Inscrições</Nav.Link>
                    <Nav.Link as={Link} to="/vagas">Vagas</Nav.Link>
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default Navbar;
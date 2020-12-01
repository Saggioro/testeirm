import React from "react";
import {
  Form,
  Navbar,
  Button,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Navbarirm() {
  function handleExit() {
    localStorage.clear("@IRM/nome");
    localStorage.clear("@IRM/email");
    localStorage.clear("@IRM/senha");
  }
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand as={Link} to="/">
          IRM
        </Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown
            className="link"
            title="Cadastro"
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item as={Link} to="/cadastro-paciente">
              Paciente
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/cadastro-profissional">
              Profissional
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/cadastro-categoria">
              Categoria
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/cadastro-procedimento">
              Procedimento
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            className="link"
            title="Pesquisar"
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item as={Link} to="/pesquisar-pacientes">
              Paciente
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/pesquisar-profissionais">
              Profissional
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/pesquisar-categorias">
              Categoria
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/pesquisar-procedimentos">
              Procedimento
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link as={Link} to="/atendimento">
            Atendimento
          </Nav.Link>
        </Nav>
        <Form className="nameNavbar">
          <Container>{localStorage.getItem("@IRM/nome")}</Container>
          <div>
            <Button onClick={() => handleExit()} as={Link} to="/">
              Sair
            </Button>
          </div>
        </Form>
      </Navbar>
    </>
  );
}

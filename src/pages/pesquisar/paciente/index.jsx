import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../../styles/global.css";
import { Table, Card, Form, Breadcrumb, Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { FaUser, FaSearch, FaUserMd } from "react-icons/fa";
import api from "../../../services/api";

import Navbar from "../../../components/template/Navbar";
import "./styles.css";

export default function Atendimento() {
  const [pacientes, setPacientes] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    api.get("/pacientes").then((response) => {
      setPacientes(response.data);
    });
  }, []);
  const onNewSearchChange = useCallback((event) => {
    setSearchList([]);
    let newList = [];
    const copyOfList = pacientes.slice();
    for (let index = 0; index < copyOfList.length; index++) {
      if (copyOfList[index].cpf.includes(event.target.value)) {
        newList.push(copyOfList[index]);
      }
    }
    setSearchList(newList);
    setNewSearch(event.target.value);
  },[pacientes]);

  return (
    <>
      <Navbar />
      <Form className="app">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/atendimento">Atendimento</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/cadastro-paciente">Cadastro Paciente</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Pesquisar Paciente</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Header>
            <Card.Title>
              <FaSearch className="icon" />
              Buscar Paciente
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Row>
              <Form.Group className="col-md-4">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  name="cpf"
                  placeholder="Digite o CPF"
                  value={newSearch}
                  onChange={onNewSearchChange}
                ></Form.Control>
              </Form.Group>

              <Button
                as={Link}
                to="/cadastro-paciente"
                size="lg"
                className="btn-cad"
              >
                Cadastrar paciente
              </Button>
            </Form.Row>
          </Card.Body>
        </Card>
        <Card className="ajusteCard">
          <Card.Header>
            <Card.Title>
              <FaUser className="icon" />
              Pacientes
            </Card.Title>
          </Card.Header>
          <Card.Body>
            {newSearch === "" && (
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Gênero</th>
                    <th class="acao">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {pacientes.map((paciente) => (
                    <>
                      <tr key={paciente.id}>
                        <td>{paciente.nome}</td>
                        <td>{paciente.cpf}</td>
                        <td>{paciente.email}</td>
                        <td>{paciente.telefone}</td>
                        <td>{paciente.genero}</td>
                        <td className="edit-icon ">
                          <div className="ajuste-icons-atend">
                            <Link to={`/cadastro-paciente/${paciente.id}`}>
                              <BiEdit className="icon-pesq" />
                            </Link>
                            <Link to={`/atendimento/${paciente.id}`}>
                              <FaUserMd className="icon-pesq" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            )}
            {newSearch !== "" && (
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Gênero</th>
                    <th class="acao">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {searchList.map((paciente) => (
                    <>
                      <tr key={paciente.id}>
                        <td>{paciente.nome}</td>
                        <td>{paciente.cpf}</td>
                        <td>{paciente.email}</td>
                        <td>{paciente.telefone}</td>
                        <td>{paciente.genero}</td>

                        <td className="edit-icon">
                          <div className="ajuste-icons-atend">
                            <Link to={`/cadastro-paciente/${paciente.id}`}>
                              <BiEdit className="icon-pesq" />
                            </Link>
                            <Link to={`/atendimento/${paciente.id}`}>
                              <FaUserMd className="icon-pesq" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}

/*
       <Card>
            <Card.Header>
                <Card.Title>
                    <FaUser className="icon" size={22} />
                    Pacientes
                </Card.Title>
            </Card.Header>
                <Card.Body>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Sexo</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.map(paciente => (
                                <tr key={paciente.id}>
                                    <td>{paciente.id}</td>
                                    <td>{paciente.nome}</td>
                                    <td>{paciente.cpf}</td>
                                    <td>{paciente.email}</td>
                                    <td>{paciente.telefone}</td>
                                    <td>{paciente.sexo}</td>
                                    <td className="edit-icon">
                                        <a onClick={()=>handleEdit(paciente.id)}><BiEdit size={20} color="#008000"/></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            </Card.Body>
        </Card>*/

import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../../styles/global.css";
import { Table, Card, Form, Breadcrumb } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { FaBriefcaseMedical, FaSearch } from "react-icons/fa";
import api from "../../../services/api";

import Navbar from "../../../components/template/Navbar";
export default function ListarProcedimentos() {

  const [procedimentos, setProcedimentos] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    api.get("/procedimentos").then((response) => {
      setProcedimentos(response.data);
    });
  }, []);
  const onNewSearchChange = useCallback((event) => {
    setSearchList([]);
    let newList = [];
    const copyOfList = procedimentos.slice();
    for (let index = 0; index < copyOfList.length; index++) {
      if (
        copyOfList[index].nome
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        newList.push(copyOfList[index]);
      }
    }
    setSearchList(newList);
    setNewSearch(event.target.value);
  },[procedimentos]);

  return (
    <>
      <Navbar />
      <Form className="app">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/atendimento">Atendimento</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/cadastro-procedimento">Cadastro Procedimento</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Pesquisar Procedimento</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <Card.Title>
              <FaSearch className="icon" />
              Buscar Procedimento
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Row>
              <Form.Group className="col-md-4">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  name="nome"
                  placeholder="Digite o nome"
                  value={newSearch}
                  onChange={onNewSearchChange}
                ></Form.Control>
              </Form.Group>
            </Form.Row>
          </Card.Body>
        </Card>
        <Card className="ajusteCard">
          <Card.Header>
            <Card.Title>
              <FaBriefcaseMedical className="icon" />
              Procedimetos
            </Card.Title>
          </Card.Header>
          <Card.Body>
            {newSearch === "" && (
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                  
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Categoria_id</th>
                    <th class="acao">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {procedimentos.map((procedimento) => (
                    <>
                      <tr>
                       
                        <td>{procedimento.nome}</td>
                        <td>
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(procedimento.valor)}
                        </td>
                        <td>{procedimento.categoria_id}</td>

                        <td className="edit-icon">
                          <Link to={`/cadastro-procedimento/${procedimento.id}`}>
                            <BiEdit className="icon-pesq" />
                          </Link>
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
                    <th>Valor</th>
                    <th>Categoria_id</th>
                    <th class="acao">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {searchList.map((procedimento) => (
                    <>
                      <tr>
                        
                        <td>{procedimento.nome}</td>
                        <td>
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(procedimento.valor)}
                        </td>
                        <td>{procedimento.categoria_id}</td>

                        <td className="edit-icon">
                          <Link to={`/cadastro-procedimento/${procedimento.id}`}>
                            <BiEdit className="icon-pesq" />
                          </Link>
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

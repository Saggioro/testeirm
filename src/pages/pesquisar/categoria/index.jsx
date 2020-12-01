import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../../styles/global.css";
import { Table, Card, Form, Breadcrumb } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import api from "../../../services/api";
import Navbar from "../../../components/template/Navbar";

export default function ListarCategorias() {

  const [categorias, setCategorias] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    api.get("/categorias").then((response) => {
      setCategorias(response.data);
    });
  }, []);
  const onNewSearchChange = useCallback((event) => {
    setSearchList([]);
    let newList = [];
    const copyOfList = categorias.slice();
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
  },[categorias]);
  
  return (
    <>
      <Navbar />
      <Form className="app">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/atendimento">Atendimento</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/cadastro-categoria">Cadastro Categoria</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Pesquisar Categoria</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <Card.Title>
              <FaSearch className="icon" />
              Buscar Categoria
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
              <BsFillGearFill className="icon" size={22} />
              Categoria
            </Card.Title>
          </Card.Header>
          <Card.Body>
            {newSearch === "" && (
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                   
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th class="acao">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((categoria) => (
                    <>
                      <tr>
                        
                        <td>{categoria.nome}</td>
                        <td>{categoria.descricao}</td>

                        <td className="edit-icon">
                          <Link to={`/cadastro-categoria/${categoria.id}`}>
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
                    <th>Descriçãso</th>
                    <th class="acao">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {searchList.map((categoria) => (
                    <>
                      <tr>
                     
                        <td>{categoria.nome}</td>
                        <td>{categoria.descricao}</td>
                        <td className="edit-icon">
                         <Link to={`/cadastro-categoria/${categoria.id}`}>
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

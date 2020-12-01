import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../../styles/global.css";
import { Table, Card, Form, Breadcrumb } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { FaUserMd, FaSearch } from "react-icons/fa";
import api from "../../../services/api";

import Navbar from "../../../components/template/Navbar";
export default function ListarProfissionais() {
  

  const [profissionais, setProfissionais] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    api.get("/profissionais").then((response) => {
      setProfissionais(response.data);
    });
  }, []);

  const onNewSearchChange = useCallback((event) => {
    setSearchList([]);
    let newList = [];
    const copyOfList = profissionais.slice();
    for (let index = 0; index < copyOfList.length; index++) {
      if (copyOfList[index].cpf.includes(event.target.value)) {
        newList.push(copyOfList[index]);
      }
    }
    setSearchList(newList);
    setNewSearch(event.target.value);
  },[profissionais]);


  return (
    <>
      <Navbar />
      <Form className="app">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/atendimento">Atendimento</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/cadastro-profissional">Cadastro Profissional</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Pesquisar Profissional</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <Card.Title>
              <FaSearch className="icon" />
              Buscar Profissionais
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
            </Form.Row>
          </Card.Body>
        </Card>
        <Card className="ajusteCard">
          <Card.Header>
            <Card.Title>
              <FaUserMd className="icon" />
              Profissionais
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
                    <th>Conselho</th>
                    <th>Número do conselho</th>
                    <th class="acao">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {profissionais.map((profissional) => (
                    <>
                      <tr>
                        
                        <td>{profissional.nome}</td>
                        <td>{profissional.cpf}</td>
                        <td>{profissional.email}</td>
                        <td>{profissional.telefone}</td>
                        <td>{profissional.conselho}</td>
                        <td>{profissional.nConselho}</td>

                        <td className="edit-icon">
                          <Link to={`/cadastro-profissional/${profissional.id}`}>
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
                    <th>CPF</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Conselho</th>
                    <th>Número do conselho</th>
                    <th class="acao">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {searchList.map((profissional) => (
                    <>
                      <tr>
                        
                        <td>{profissional.nome}</td>
                        <td>{profissional.cpf}</td>
                        <td>{profissional.email}</td>
                        <td>{profissional.telefone}</td>
                        <td>{profissional.conselho}</td>
                        <td>{profissional.nConselho}</td>

                        <td className="edit-icon">
                          <Link to={`/cadastro-profissional/${profissional.id}`}>
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

/* import React, { useEffect, useState, useCallback } from 'react';

    const [newSearch, setNewSearch] = useState('');
    const [searchList, setSearchList] = useState([]);


    const onNewSearchChange = useCallback((event) => {
        setSearchList([]);
        let newList = [];
        const copyOfList = meals.slice();
        for (let index = 0; index < copyOfList.length; index++) {
            if (copyOfList[index].name.includes(event.target.value)) {
                newList.push(copyOfList[index]);
            }
        }
        setSearchList(newList);
        setNewSearch(event.target.value);
    });


                {newSearch == '' && (
                    <Grid xs={12} container item direction="row" spacing={2}>
                        {meals.map(meal => (
                            <>
                            <Grid key={meal.name} onClick={() => handleAddMeal(meal.pk_id_meal)} 
                            item xs={12} sm={6} md={4} >

                                <Meal
                                    name={meal.name}
                                    deion={meal.deion}
                                    quantity={meal.qt}
                                    value={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meal.value)}
                                    
                                />
                            
                            </Grid>
                            <button onClick={() => handleRemoveMeal(meal.pk_id_meal)} type="button">
                            <IoIosRemove size={20} color="gray" />
                            </button>
                            </>
                        ))
                        }
                        
                    </Grid>
                )}
                {newSearch != '' && (
                    <Grid xs={12} container item direction="row" spacing={2}>
                        {searchList.map(meal => (
                            <Grid item key={meal.name} onClick={() => handleAddMeal(meal.pk_id_meal)} xs={12} sm={6} md={4} >

                                <Meal
                                    name={meal.name}
                                    deion={meal.deion}
                                    value={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meal.value)}

                                />    
                                                 
                            </Grid>
                        ))
                        }
                        
                    </Grid>
                )}

                ---------------------------------------------------------------------------------------------------------------
                        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Conselho</th>
              <th>Número do conselho</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {profissionais.map((profissional) => (
              <>
                <tr>
                  <td>{profissional.id}</td>
                  <td>{profissional.nome}</td>
                  <td>{profissional.cpf}</td>
                  <td>{profissional.email}</td>
                  <td>{profissional.telefone}</td>
                  <td>{profissional.conselho_nome}</td>
                  <td>{profissional.conselho_numero}</td>

                  <td className="edit-icon">
                    <Link to="/">
                      <BiEdit size={20} color="#008000" />
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>


        <TextField
          color="secondary"
          fullWidth="true"
          variant="outlined"
          placeholder="Nome do prato"
          value={newSearch}
          onChange={onNewSearchChange}
        />
                */

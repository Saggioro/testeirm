import React, { useState, useEffect,useCallback } from "react";
import { Form, Card, Table, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";

import "./styles.css";
import { ImUserCheck } from "react-icons/im";
import { FaStethoscope, FaRegCheckCircle } from "react-icons/fa";
import Navbar from "../../components/template/Navbar";
import api from "../../services/api";

export default function Atendimento() {
  const { id } = useParams();
  const history = useHistory();

  const initialStatePaciente = {
    nome: "",
    cpf: "",
    genero: "",
    telefone: "",
    email: "",
  };

  // const initialStateAtendimento = {
  //   profissional_id: "",
  //   paciente: { initialStatePaciente },
  //   paciente_id: "",
  //   procedimento_id: "",
  //   data: "",
  //   tipo_de_pagamento: "",
  //   valor: "",
  //   observacao: "",
  // };

  const initialState = {
    profissional_id: "",
    paciente_id: id,
    procedimento_id: "",
    data: Date.now(),
    tipo_de_pagamento: "",
    valor: "Selecione um procedimento",
    observacao: "",
  };

  const [newSearch, setNewSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [data, setData] = useState(initialState);
  const [atendimentos, setAtendimentos] = useState([]);
  const [paciente, setPaciente] = useState(initialStatePaciente);
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [procedimentos, setProcedimentos] = useState([]);
  const [validated, setValidated] = useState(false);

  // const [findPaciente, setFindPaciente] = useState();

  useEffect(() => {
    if (id) {
      api.get(`/pacientes/${id}`).then((response) => {
        setPaciente(response.data);
      });
    }
  }, [id]);

  useEffect(() => {
    let newAtendimentos = [...atendimentos];
    newAtendimentos.forEach((atendimento) => {
      const findPaciente = pacientes.find(
        (paciente) => Number(paciente.id) === Number(atendimento.paciente_id)
      );

      const findProcedimento = procedimentos.find(
        (procedimento) => Number(procedimento.id) === Number(atendimento.procedimento_id)
      );

      const findProfissional = profissionais.find(
        (profissional) => Number(profissional.id) === Number(atendimento.profissional_id)
      );

      if (findProfissional && findPaciente && findProcedimento) {
        
        atendimento.profissional = findProfissional.nome;
        atendimento.procedimento = findProcedimento.nome;
        atendimento.paciente = findPaciente.nome;
        const dataFormatada = new Date(atendimento.data);
        const day = dataFormatada.getDate();
        const month = dataFormatada.getMonth()+1;
        const year = dataFormatada.getFullYear();
        atendimento.dataFormatada = `${day}/${month}/${year}`;  
      }

      
    });
    

      setAtendimentos(newAtendimentos);


  }, [pacientes, procedimentos, profissionais]);

  useEffect(() => {
    api.get("/atendimentos").then((response) => {
      setAtendimentos(response.data);
    });
    api.get(`/pacientes/`).then((response) => {
      setPacientes(response.data);
    });
    api.get(`/procedimentos/`).then((response) => {
      setProcedimentos(response.data);
    });
    api.get(`/profissionais/`).then((response) => {
      setProfissionais(response.data);
      
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        await api.post("/atendimentos", data);
        history.push("/pesquisar-pacientes");
      } catch (err) {
        alert("Parece que algo deu errado");
      }
    }
    setValidated(true);
  }

  const onNewSearchChange = useCallback((event) => {
    setSearchList([]);
    const newList = atendimentos.filter(atendimento => atendimento.profissional_id === Number(event.target.value));
    console.log(newList)
    setSearchList(newList);
    setNewSearch(event.target.value);
  },[atendimentos]);

  return (
    <>
      <Navbar />

      {id ? (
        <Form
          className="app"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Card>
            <Card.Header>
              <Card.Title>
                <FaStethoscope className="icon" size={22} />
                Formalizar Atendimento
              </Card.Title>
            </Card.Header>

            <Card.Body>
              <Form.Row>
                <div className="use-card ">
                  <ImUserCheck className="use-img" />
                </div>

                <Form.Row className="jack">
                  <Form.Group className="col-md-8 jack-grup">
                    <Form.Label className="jack-label">Paciente</Form.Label>
                    <Form.Control
                      name="paciente"
                      value={paciente.nome}
                      disabled
                      className="style-input"
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="col-md-4 jack-grup">
                    <Form.Label className="jack-label">CPF</Form.Label>
                    <Form.Control
                      name="paciente"
                      value={paciente.cpf}
                      disabled
                      className="style-input"
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="col-md-6 jack-grup">
                    <Form.Label className="jack-label">Contato</Form.Label>
                    <Form.Control
                      name="paciente"
                      value={paciente.telefone}
                      disabled
                      className="style-input"
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="col-md-6 jack-grup">
                    <Form.Label className="jack-label">E-Mail</Form.Label>
                    <Form.Control
                      name="paciente"
                      value={paciente.email}
                      disabled
                      className="style-input"
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Form.Row>
              <hr className="margininferios" />

              <Form.Row>
                <Form.Group className="col-md-5">
                  <Form.Label>Profissional*</Form.Label>
                  <Form.Control
                    name="Profissional"
                    as="select"
                    onChange={(e) => {
                      setData({ ...data, profissional_id: e.target.value });
                    }}
                    defaultValue=""
                    value={data.profissional_id}
                    required
                  >
                    <option value="">Selecione...</option>
                    {profissionais.map((profissional) => (
                      <option key={profissional.id} value={profissional.id}>
                        {profissional.nome}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col-md-4">
                  <Form.Label>Procedimento*</Form.Label>
                  <Form.Control
                    name="procedimento"
                    as="select"
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        const procedimento = procedimentos.find(
                          (procedimento) => procedimento.id === Number(e.target.value)
                        );
                        setData({
                          ...data,
                          valor: procedimento.valor,
                          procedimento_id: e.target.value,
                        });
                      } else {
                        setData({
                          ...data,
                          valor: "Selecione um procedimento",
                          procedimento_id: e.target.value,
                        });
                      }
                    }}
                    placeholder="Categoria"
                    defaultValue=""
                    value={data.procedimento_id}
                    required
                  >
                    <option value="">Selecione...</option>
                    {procedimentos.map((procedimento) => (
                      <option key={procedimento.id} value={procedimento.id}>
                        {procedimento.nome}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-md-3">
                  <Form.Label>Valor</Form.Label>
                  <Form.Control
                    name="Valor"
                    disabled
                    value={data.valor}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button size="lg" type="submit" block>
                Salvar
              </Button>
            </Card.Body>
          </Card>
        </Form>
      ) : (
        <Card 
        className="app"
        >
          <Card.Header>
            <Card.Title>
              <FaStethoscope className="icon" size={22} />
              Pesquisar atendimentos
            </Card.Title>
          </Card.Header>

          <Card.Body>
            <Form.Row>
              {/* <Form.Group className="col-md-4">
                <Form.Label>Paciente*</Form.Label>
                <Form.Control name="paciente" as="select"></Form.Control>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group className="col-md-4">
                <Form.Label>Profissional*</Form.Label>

                <Form.Control
                  name="Profissional"
                  as="select"
                  onChange={
                    onNewSearchChange
                  }
                  defaultValue=""
                  value={newSearch}
                  required
                >
                  <option value="">Selecione...</option>
                  {profissionais.map((profissional) => (
                    <option key={profissional.id} value={profissional.id}>
                      {profissional.nome}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              {/* <Form.Group className="col-md-4">
                <Form.Label>Procedimento*</Form.Label>
                <Form.Control name="procedimento" as="select"></Form.Control>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group> */}
            </Form.Row>
            
          </Card.Body>
        </Card>
      )}

      <Card className="ajusteCard app">
        <Card.Header>
          <Card.Title>
            <FaRegCheckCircle className="icon" size={22} />
            Atendimentos Realizados
          </Card.Title>
        </Card.Header>

        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Data</th>
                <th>Paciente</th>
                <th>Profissional</th>
                <th>Procedimento</th>
                <th>Valor</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>

            {newSearch === "" && atendimentos && (
              
                atendimentos.map((atendimento) => {
                  console.log(atendimento);
                  return (
                    <tr key={atendimento.id}>
                      <td>{atendimento.dataFormatada}</td>
                      <td>{atendimento.paciente}</td>
                      <td>{atendimento.profissional}</td>
                      <td>{atendimento.procedimento}</td>
                      <td>{atendimento.valor}</td>
                      <td>icon</td>
                    </tr>
                  );
                })
            )}
            {newSearch !== "" && atendimentos && (
              
                searchList.map((atendimento) => {
                  console.log(atendimento);
                  return (
                    <tr key={atendimento.id}>
                      <td>{atendimento.dataFormatada}</td>
                      <td>{atendimento.paciente}</td>
                      <td>{atendimento.profissional}</td>
                      <td>{atendimento.procedimento}</td>
                      <td>{atendimento.valor}</td>
                      <td>icon</td>
                    </tr>
                  );
                })
            )}
            </tbody>
            
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

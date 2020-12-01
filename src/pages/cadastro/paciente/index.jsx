import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Form, Button, Card, Breadcrumb } from "react-bootstrap";

import MaskedInput from "react-maskedinput-ultimate";
import { formatToCPF } from "brazilian-values";
import { FaUserPlus } from "react-icons/fa";
import Navbar from "../../../components/template/Navbar";
import api from "../../../services/api";

export default function Paciente() {
  const { id } = useParams();
  const history = useHistory();

  const initialState = {
    nome: "",
    cpf: "",
    genero: "",
    telefone: "",
    email: "",
  };

  const [info, setInfo] = useState(initialState);

  const data = {
    genero: ["M", "F"],
    list: [],
  };

  useEffect(() => {
    if (id) {
      api.get(`/pacientes/${id}`).then((response) => {
        setInfo(response.data);
      });
    }
  }, [id]);

  const [validated, setValidated] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (id) {
        await api.patch(`/pacientes/${id}`, info);
        history.push("/pesquisar-pacientes");
      } else {
        await api.post(`/pacientes`, info);
        history.push("/pesquisar-pacientes");
      }
    }
    setValidated(true);
  }
  return (
    <>
      <Navbar />

      <Form
        className="app"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/atendimento">Atendimento</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Cadastro Paciente</Breadcrumb.Item>
        </Breadcrumb>
        <Card className="containerCard">
          <Card.Header>
            <Card.Title>
              <FaUserPlus className="icon" />
              Cadastro paciente
            </Card.Title>
          </Card.Header>

          <Card.Body>
            <Form.Row>
              <Form.Group className="col-md-7">
                <Form.Label>Nome*</Form.Label>
                <Form.Control
                  name="nome"
                  onChange={(e) => {
                    setInfo({ ...info, nome: e.target.value });
                  }}
                  placeholder="Digite o Nome"
                  value={info.nome}
                  minLength={3}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-md-1">
                <Form.Label>Gênero*</Form.Label>
                <Form.Control
                  name="genero"
                  as="select"
                  onChange={(e) => setInfo({ ...info, genero: e.target.value })}
                  value={info.genero}
                  required
                >
                  {" "}
                  <option value=""></option>
                  {data.genero.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-md-4">
                <Form.Label>CPF*</Form.Label>
                <Form.Control
                  name="cpf"
                  onChange={(e) => setInfo({ ...info, cpf: e.target.value })}
                  placeholder="Digite o CPF"
                  value={formatToCPF(info.cpf)}
                  minLength={14}
                  maxLength={14}
                  required
                />

                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                  name="email"
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  placeholder="Digite o E-mail"
                  value={info.email}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label>Celular*</Form.Label>
                <Form.Control
                  as={MaskedInput}
                  mask={"(11)11111-1111"}
                  isRevealingMask={true}
                  name="celular"
                  onChange={(e) =>
                    setInfo({ ...info, telefone: e.target.value })
                  }
                  placeholder="Informe seu nº de celular"
                  value={info.telefone}
                  minLength={3}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>

              <Button size="lg" type="submit" block>
                Salvar
              </Button>
            </Form.Row>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Form, Button, Card, Breadcrumb } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { FaUserMd } from "react-icons/fa";
import Navbar from "../../../components/template/Navbar";
import { formatToCPF, formatToPhone } from "brazilian-values";
import api from "../../../services/api";

export default function Profissional() {
  const { id } = useParams();
  const history = useHistory();

  const initialState = {
    nome: "",
    cpf: "",
    conselho: "",
    nConselho: "",
    especialidade: "",
    telefone: "",
    email: "",
  };
  const [conselhos] = useState(["CRM", "CRF", "CRO", "CREFITO", "CRN", "CRP"]);

  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (id) {
      api.get(`/profissionais/${id}`).then((response) => {
        setData(response.data);
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
        await api.patch(`/profissionais/${id}`, data);
        history.push("/pesquisar-profissionais");
      } else {
        await api.post(`/profissionais`, data);
        history.push("/pesquisar-profissionais");
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
          <Breadcrumb.Item active>Cadastro Profissional</Breadcrumb.Item>
        </Breadcrumb>

        <Card className="containerCard">
          <Card.Header>
            <Card.Title>
              <FaUserMd className="icon" />
              Cadastro Profissional
            </Card.Title>
          </Card.Header>

          <Card.Body>
            <Form.Row>
              <Form.Group className="col-md-8">
                <Form.Label>Nome*</Form.Label>
                <Form.Control
                  name="nome"
                  onChange={(e) => {
                    setData({ ...data, nome: e.target.value });
                  }}
                  placeholder="Digite o Nome"
                  value={data.nome}
                  minLength={3}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-md-4">
                <Form.Label>CPF*</Form.Label>
                <Form.Control
                  name="cpf"
                  onChange={(e) => {
                    setData({ ...data, cpf: e.target.value });
                  }}
                  placeholder="Digite o CPF"
                  value={formatToCPF(data.cpf)}
                  minLength={14}
                  maxLength={14}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-md-4">
                <Form.Label>Conselho*</Form.Label>
                <Form.Control
                  as="select"
                  name="conselho"
                  onChange={(e) => {
                    setData({ ...data, conselho: e.target.value });
                  }}
                  placeholder="Conselho"
                  defaultValue=""
                  value={data.conselho}
                  required
                >
                  <option value="">Selecione...</option>
                  {conselhos.map((conselho, index) => (
                    <option key={index} value={conselho}>
                      {conselho}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-md-4">
                <Form.Label>Nº do Conselho*</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  name="nConselho"
                  onChange={(e) => {
                    setData({ ...data, nConselho: e.target.value });
                  }}
                  placeholder="Número do concelho"
                  value={data.nConselho}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-md-4">
                <Form.Label>Especialidade*</Form.Label>
                <Form.Control
                  name="especialidade"
                  onChange={(e) => {
                    setData({ ...data, especialidade: e.target.value });
                  }}
                  placeholder="Especialidade"
                  value={data.especialidade}
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
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                  placeholder="Digite o E-mail"
                  value={data.email}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label>Celular*</Form.Label>
                <Form.Control
                  name="celular"
                  onChange={(e) => {
                    setData({
                      ...data,
                      telefone: formatToPhone(e.target.value),
                    });
                  }}
                  placeholder="Informe seu nº de celular"
                  value={data.telefone}
                  minLength={16}
                  maxLength={16}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>

              <Button size="lg" className="col-md-12" type="submit">
                Salvar
              </Button>
            </Form.Row>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}

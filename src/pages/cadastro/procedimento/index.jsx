import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Form, Button, Card, Breadcrumb } from "react-bootstrap";
import { FaBriefcaseMedical } from "react-icons/fa";
import Navbar from "../../../components/template/Navbar";

import api from "../../../services/api";

export default function Procedimento() {
  const { id } = useParams();
  const history = useHistory();

  const initialState = {
    nome: "",
    valor: "",
    categoria_id: "",
  };

  const [categorias, setCategorias] = useState([]);
  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (id) {
      api.get(`/procedimentos/${id}`).then((response) => {
        setData(response.data);
      });
    }
  }, [id]);

  useEffect(() => {
    api.get("/categorias").then((response) => {
      setCategorias(response.data);
    });
  }, []);

  const [validated, setValidated] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (id) {
        await api.patch(`/procedimentos/${id}`, data);
        history.push("/pesquisar-procedimentos");
      } else {
        await api.post(`/procedimentos`, data);
        history.push("/pesquisar-procedimentos");
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
          <Breadcrumb.Item>
            <Link to="/cadastro-categoria">Cadastro Categoria</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Cadastro Procedimento</Breadcrumb.Item>
        </Breadcrumb>
        <Card className="containerCard">
          <Card.Header>
            <Card.Title>
              <FaBriefcaseMedical className="icon" />
              Cadastro Procedimento
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Row>
              <Form.Group className="col-md-4">
                <Form.Label>Categoria*</Form.Label>
                <Form.Control
                  as="select"
                  name="categoria"
                  onChange={(e) => {
                    setData({ ...data, categoria_id: e.target.value });
                  }}
                  placeholder="Categoria"
                  defaultValue=""
                  value={data.categoria_id}
                  required
                >
                  <option value="">Selecione...</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label>Nome*</Form.Label>
                <Form.Control
                  name="nome"
                  onChange={(e) => {
                    setData({ ...data, nome: e.target.value });
                  }}
                  placeholder="Digite o Nome"
                  value={data.nome}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-md-2">
                <Form.Label>Valor*</Form.Label>
                <Form.Control
                  min="0"
                  type="number"
                  step="0.01"
                  name="valor"
                  onChange={(e) => {
                    setData({ ...data, valor: e.target.value });
                  }}
                  placeholder="Ex.: 100 = 100,00"
                  value={data.valor}
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

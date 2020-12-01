import React, { useState, useEffect } from "react";
import { Form, Button, Card, Breadcrumb } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { BsFillGearFill } from "react-icons/bs";

import api from "../../../services/api";
import Navbar from "../../../components/template/Navbar";

export default function Categoria() {
  const { id } = useParams();
  const history = useHistory();

  const initialState = {
    nome: "",
    descricao: "",
  };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (id) {
      api.get(`/categorias/${id}`).then((response) => {
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
        try {
          await api.patch(`/categorias/${id}`, data);
          history.push("/pesquisar-categorias");
        } catch (err) {
          alert("Parece que algo deu errado");
        }
      } else {
        try {
          await api.post("/categorias", data);
          history.push("/pesquisar-categorias");
        } catch (err) {
          alert("Parece que algo deu errado");
        }
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

          <Breadcrumb.Item active>Cadastro Categoria</Breadcrumb.Item>
        </Breadcrumb>
        <Card className="containerCard">
          <Card.Header>
            <Card.Title>
              <BsFillGearFill className="icon" />
              Cadastro Categoria
            </Card.Title>
          </Card.Header>

          <Card.Body>
            <Form.Row>
              <Form.Group className="col-md-12">
                <Form.Label>Nome*</Form.Label>
                <Form.Control
                  placeholder="Digite o Nome"
                  name="nome"
                  onChange={(e) => {
                    setData({ ...data, nome: e.target.value });
                  }}
                  value={data.nome}
                  minLength={3}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="col-md-12">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descricao"
                  onChange={(e) => {
                    setData({ ...data, descricao: e.target.value });
                  }}
                  placeholder="Descrição"
                  value={data.descricao}
                />
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
/**
function Categoria() {
    const [nome, setNome] = useState();
    const [descricao, setDescricao] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(nome);
    }

    return (
        <>
            <Card>
                <Card.Header>
                    <BsFillGearFill className="icon" size={22} />
                    Cadastro categoria
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group className="col-md-8" controlId="formGridEmail" >
                                <Form.Label>Nome da categoria</Form.Label>
                                <Form.Control
                                    placeholder="Adicione uma categoria"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    placeholder="Descrição"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>

                            <Button
                                variant="primary"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Salvar
                            </Button>

                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
export default Categoria;

*/

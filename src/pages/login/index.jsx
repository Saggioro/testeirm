import React, { useState } from "react";
import { FormGroup, FormControl, Form, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import "./styles.css";
import Alert from "react-bootstrap/Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [show, setShow] = useState(false);

  const history = useHistory();
  const loginCredentials = {
    email: "Cordel@email.com",
    senha: "123",
  };

  // function validateForm() {
  //   return email.length > 0 && senha.length > 0;
  // }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(email, senha);
    if (email === loginCredentials.email && senha === loginCredentials.senha) {
      localStorage.setItem("@IRM/email", email);
      localStorage.setItem("@IRM/senha", senha);
      localStorage.setItem("@IRM/nome", "Cordel");
      history.push("/atendimento");
    } else {
      setShow(!show);
    }
  }
  return (
    <>
      <Container className="background-container">
        <Container className="wrapper">
          <Container
            className="card card-custom-login text-center fadeInDown"
            id="formContent"
          >
            <Container className="card-header card-header-custom-login">
              <Container className="fadeIn first">
                <Image
                  className="Nexo-image"
                  src={require("../../assets/IRM-logo.png")}
                  rounded
                />
              </Container>
            </Container>
            <Form onSubmit={handleSubmit} className="card-body">
              <FormGroup>
                <Container>
                  <Alert
                    show={show}
                    key={1}
                    variant="danger"
                    onClose={() => setShow(!show)}
                    dismissible
                  >
                    Erro ao realizar o login do usuario.
                  </Alert>
                  <FormControl
                    type="email"
                    id="login"
                    className=" dist-input form-control form-control-lg text-center fadeIn second"
                    formControlName="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu E-Mail"
                  />
                </Container>

                <Container className="form-group">
                  <FormControl
                    type="password"
                    id="password"
                    className="form-control form-control-lg text-center fadeIn third"
                    formControlName="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua Senha"
                  />
                </Container>

                <Container className="form-row">
                  <Container className="col">
                    <input
                      type="submit"
                      className="btn btn-lg btn-info"
                      value="Acessar"
                    />
                    <p className="ml-3 text-info">
                      Esqueceu a senha?
                    </p>
                  </Container>
                </Container>
              </FormGroup>
            </Form>

            <Container className="card-footer text-muted" id="formFooter">
              {/* <a className="underlineHover">Ainda não é cadastrado?</a> */}
            </Container>
          </Container>
        </Container>
        <Alert
          className="temp-alert"
          show={true}
          key={2}
          variant="warning"
          dismissible
        >
          email: Cordel@email.com , senha: 123
        </Alert>
      </Container>
    </>
  );
}
// return (
//   <>
//     <Container className="container">
//       <Container className="Login">
//         <Form onSubmit={handleSubmit}>
//           <FormGroup controlId="email" bsSize="large">
//             <FormLabel>Email</FormLabel>
//             <FormControl
//               autoFocus
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </FormGroup>
//           <FormGroup controlId="senha" bsSize="large">
//             <FormLabel>senha</FormLabel>
//             <FormControl
//               value={senha}
//               onChange={(e) => setsenha(e.target.value)}
//               type="senha"
//             />
//           </FormGroup>
//           <Button
//             block
//             bsSize="large"
//             disabled={!validateForm()}
//             type="submit"
//           >
//             Login
//           </Button>
//         </Form>
//       </Container>
//     </Container>
//   </>
// );

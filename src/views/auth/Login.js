/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import { isItEmpty } from "../../utils/inputUtils";
import {
  setUser,
  setRoles,
  setToken,
  isAdmin,
  isMasterAdmin,
  isProvider,
} from "../../auth";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { logout } from '../../auth'

class Login extends React.Component {
  state = {
    providerEmail: "",
    providerPassword: "",
  };
  async componentDidMount() {
    logout()
  }
  render() {
    const { providerEmail } = this.state;
    const { providerPassword } = this.state;

    async function handleLogin(e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const validations = [];

      validations.push(isItEmpty(email));
      validations.push(isItEmpty(password));

      Promise.all(validations)
        .then(async function (res) {
          await api
            .post(`login`, {
              email: providerEmail,
              password: providerPassword,
            })
            .then(async (response) => {
              const user = response.data;
              setUser(user);
              setRoles(user.roles);
              setToken(user.token);

              if (isAdmin()) {
                window.location = `/app/admin/dashboard`;
                return;
              }
              if (isProvider) {
                // window.location = `/app/dashboard`;
                window.location = `/app/empresa`;
                return;
              }
            })
            .catch((err) => {
              Swal.fire({
                imageUrl: "../../assets/img/brand/logo.png",
                confirmButtonColor: "#0ee49d",
                title: "Erro de validação",
                text: "E-mail ou senha incorretos...",
              });
            });
        })
        .catch(function (err) {
          console.error("Promise.all error", err);
        });
    }
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <p>
                  <img
                    alt="..."
                    src={require("../../assets/img/brand/logo.png")}
                  />
                </p>
                <p>
                  Informe seu e-mail e senha para acessar o paínel
                  administrativo.
                </p>
              </div>
              <Form role="form" onSubmit={handleLogin}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Digite seu e-mail"
                      type="email"
                      id="email"
                      autoComplete="new-email"
                      onChange={(e) =>
                        this.setState({ providerEmail: e.target.value })
                      }
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) =>
                        this.setState({ providerPassword: e.target.value })
                      }
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Entrar
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Esqueceu sua senha ?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={() => (window.location = "/auth/register")}
              >
                <small>Criar minha conta.</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;

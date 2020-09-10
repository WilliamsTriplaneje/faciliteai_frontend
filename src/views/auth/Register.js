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
import { isEqual } from "../../utils/inputUtils";

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

class Register extends React.Component {
  state = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    roles: ["provider"],
  };

  render() {
    const { name } = this.state;
    const { lastname } = this.state;
    const { email } = this.state;
    const { password } = this.state;
    // const { roles } = this.state;

    async function handleRegister(e) {
      e.preventDefault();

      //VERIFICAR SE A SENHAS COINCIDEM
      const password = document.getElementById("password");
      const confirmPassword = document.getElementById("confirmPassword");
      isEqual(password, confirmPassword);

      

      await api
        .post(`/register`, {
          name,
          lastname,
          email,
          password,
          // roles,
        })
        .then((result) => {
          console.log(result.data);
          window.location = `/auth/login`;
        })
        .catch((err) => {
          console.log("Erro ao realizar cadastro");
          console.log(err);
        });
    }
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <p>
                  <img
                    alt="..."
                    src={require("../../assets/img/brand/logo.png")}
                  />
                </p>
                <p>Informe seus dados para realização do</p>
              </div>
              <Form role="form" onSubmit={handleRegister}>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Primeiro nome"
                      type="text"
                      value={name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Sobrenome"
                      type="text"
                      value={lastname}
                      onChange={(e) =>
                        this.setState({ lastname: e.target.value })
                      }
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="E-mail"
                      type="email"
                      autoComplete="new-email"
                      value={email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    {/* // TODO Implementar confirmação de email */}
                    <Input
                      placeholder="Confirme seu e-mail"
                      type="email"
                      autoComplete="new-email"
                      id="password"
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
                      placeholder="Senha"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
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
                    {/* // TODO Implementar confirmação de senha */}
                    <Input
                      placeholder="Confirme sua senha."
                      type="password"
                      autoComplete="new-password"
                      id="confirmPassword"
                    />
                  </InputGroup>
                </FormGroup>
                {/* <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row> */}
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;

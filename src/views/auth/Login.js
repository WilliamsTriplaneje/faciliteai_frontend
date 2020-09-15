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
  isClient
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
  constructor(props){
    super(props);

    const from = this.props.location.state ? this.props.location.state.from : null
    this.state = {
      email: "",
      password: "",
      returnUrl: from
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.redirectTo = this.redirectTo.bind(this);

  }

  async redirectTo(path) {
    this.props.history.push(path)
  }
  
  async handleLogin(e) {
    e.preventDefault();
    var self = this

    const { email, password, returnUrl } = this.state

    const validations = [];

    validations.push(isItEmpty(email));
    validations.push(isItEmpty(password));

    Promise.all(validations)
      .then(async function (res) {
        await api
          .post(`login`, {
            email,
            password,
          })
          .then(async (response) => {
            const user = response.data;
            setUser(user);
            setRoles(user.roles);
            setToken(user.token);

            if(returnUrl) {
              self.redirectTo(returnUrl)
              return
            }
            if (isAdmin()) {
              self.redirectTo(`/app/admin/dashboard`)
              return
            }
            
            if (isProvider()) {
              self.redirectTo(`/app/empresa`)
              return
            }
            
            if (isClient()) {
              self.redirectTo(`/`)
              return
            }
            
            self.redirectTo(`/`)
          })
          .catch((err) => {
            console.log(err)
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
      })
  }

  async componentDidMount() {
    logout()
  }
  render() {    
    return (
      <>
        <Col lg="10" md="7">
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
              <Form role="form" onSubmit={this.handleLogin}>
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
                      value={this.state.email}
                      onChange={(e) =>
                        this.setState({ email: e.target.value })
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
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
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

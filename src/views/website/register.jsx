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
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { passwordEqual, isItEmpty, emailEqual } from "../../utils/inputUtils";
import Swal from "sweetalert2";
import { logout } from '../../auth'
import AuthContainer from '../../layouts/AuthContainer'


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

const Register = () => {
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    useEffect(() => {
        logout()
    }, [])

    async function handleRegister(e) {
        e.preventDefault();
  
        //VERIFICAR SE A SENHAS COINCIDEM
        // const name = document.getElementById("firstname").value;
        // const lastname = document.getElementById("lastname").value;
        // const email = document.getElementById("email").value;
        // const confirmEmail = document.getElementById("confirmEmail").value;
        // const password = document.getElementById("password").value;
        // const confirmPassword = document.getElementById("confirmPassword").value;
  
        const validations = []
  
        //VERIFICANDO SE OS CAMPOS ESTÃO VAZIOS
        validations.push(isItEmpty(name));
        validations.push(isItEmpty(lastname));
        validations.push(isItEmpty(email));
        validations.push(isItEmpty(confirmEmail));
        validations.push(isItEmpty(password));
        validations.push(isItEmpty(confirmPassword))
  
        //VERIFICANDO SE AS SENHAS COINCIDEM
        validations.push(passwordEqual(password, confirmPassword)) ;
  
        //VERIFICANDO SE OS E-MAILS COINCIDEM
        validations.push(emailEqual(email, confirmEmail)) ;
  
        Promise.all(validations)
        .then(async function (res) {
          await api
          .post(`/register`, {
            name,
            lastname,
            email,
            password,
            isClient: true
          })
          .then(async (result) => {
            await Swal.fire({
              imageUrl: "../../assets/img/brand/logo.png",
              confirmButtonColor: "#0ee49d",
              title: "Sucesso",
              text: "Seu registro foi efetuado com sucesso !!",
            });
            window.location = `/auth/login`;
          })
          .catch((err) => {
            Swal.fire({
              imageUrl: "../../assets/img/brand/logo.png",
              confirmButtonColor: "#0ee49d",
              title: "Erro de validação",
              text: `${err}`,
            });
          });
        })
        .catch(function (err) {
          console.error("Promise.all error", err);
        });
  
       
    }

    return (
        <AuthContainer>
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
                  <p>Informe seus dados para realização do seu cadastro</p>
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
                        id="firstname"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        id="lastname"
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
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
                        id="email"
                        type="email"
                        autoComplete="new-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="Confirme seu e-mail"
                        id="confirmEmail"
                        type="email"
                        autoComplete="new-email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
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
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        placeholder="Confirme sua senha."
                        type="password"
                        autoComplete="new-password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="submit">
                      Criar Minha Conta
                    </Button>
                  </div>
                </Form>
              </CardBody>
              <span style={{ textAlign: "center", marginBottom: 16 }}>
                <a href="/auth/login">Já tenho uma conta</a>
              </span>
            </Card>
          </Col>
        </AuthContainer>
      );
}

export default Register
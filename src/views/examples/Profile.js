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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "../../components/Headers/UserHeader.js";

class Profile extends React.Component {
  state = {
    dataProvider: {},
    address: {},
    contact: {},

    provider: localStorage.getItem("providerId"),
    firstName: "",
    lastname: "",
    pessoalEmail: "",
    pessoalPhone: "",
    rg: "",
    cpf: "",
    nameFantasy: "",
    rSocial: "",
    cnpj: "",
    assignment: "",
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      cep: "",
      lat: "",
      long: "",
    },
    contact: {
      phone: "",
      email: "",
      instaPerfil: "",
      facebookPage: "",
    },
    description: "",
    isActive: false,

    file: null,
  };
  async componentDidMount() {
    const providerId = localStorage.getItem("providerId");
    const response = await api.get(`/provider/${providerId}`);
    //VERIFY NULL
    if (response.data == null) {
      Swal.fire({
        icon: "warning",
        title: "FaciliteAi",
        text: "É necessário preencher os dados da sua empresa!",
      });

      const btnShow = document.getElementById("btnShow");
      btnShow.style.display = "block";

      const servicesShow = document.getElementById("servicesShow");
      servicesShow.style.display = "grid";
    } else {
      if (response.data.isActive == false) {
        await Swal.fire({
          icon: "warning",
          title: "FaciliteAi",
          text: "Por favor aguarde a aprovação dos seus dados!",
        });
        window.location = "/admin/dashboard";
        const btnShow = document.getElementById("btnShow");
        btnShow.style.display = "none";

        //DISABLE EDIT SERVICES DIV
        const servicesShow = document.getElementById("servicesShow");
        servicesShow.style.display = "none";
      } else {
        //GET DATA's
        this.setState({ dataProvider: response.data });
        this.setState({ address: response.data.address });
        this.setState({ contact: response.data.contact });

        //DISABLE BUTTON
        const btnShow = document.getElementById("btnShow");
        btnShow.style.display = "none";

        //DISABLE EDIT SERVICES DIV
        const servicesShow = document.getElementById("servicesShow");
        servicesShow.style.display = "none";
      }
    }
  }

  render() {
    const { dataProvider } = this.state;
    const { address } = this.state;
    const { contact } = this.state;

    const { provider } = this.state;
    const { firstName } = this.state;
    const { lastname } = this.state;
    const { pessoalEmail } = this.state;
    const { pessoalPhone } = this.state;
    const { rg } = this.state;
    const { cpf } = this.state;
    const { nameFantasy } = this.state;
    const { rSocial } = this.state;
    const { cnpj } = this.state;
    const { assignment } = this.state;
    const { street } = this.state;
    const { number } = this.state;
    const { neighborhood } = this.state;
    const { city } = this.state;
    const { state } = this.state;
    const { cep } = this.state;
    const { lat } = this.state;
    const { long } = this.state;
    const { phone } = this.state;
    const { email } = this.state;
    const { instaPerfil } = this.state;
    const { facebookPage } = this.state;
    const { description } = this.state;
    const { isActive } = this.state;

    async function handleRegister() {
      try {
        await api.post("/register/data", {
          provider,
          firstName,
          lastname,
          pessoalEmail,
          pessoalPhone,
          rg,
          cpf,
          nameFantasy,
          rSocial,
          cnpj,
          assignment,
          address: {
            street,
            number,
            neighborhood,
            city,
            state,
            cep,
            lat,
            long,
          },
          contact: {
            phone,
            email,
            instaPerfil,
            facebookPage,
          },
          description,
          isActive,
        });
        await Swal.fire({
          icon: "success",
          title: "FaciliteAi",
          text: "Seus dados foram enviados para aprovação",
        });
        window.location = "/admin/profile";
      } catch (error) {
        const { data } = error.response;
        alert(data.error);
      }
    }
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("../../assets/img/theme/avatar-icon.png")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    {/* <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button> */}
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Serviços</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>{dataProvider.nameFantasy}</h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {address.city} - {address.state}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Category
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div>
                    <hr className="my-4" />
                    <p>{dataProvider.description}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Meus Dados</h3>
                    </Col>
                    {/* <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col> */}
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form role="form">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Primeiro Nome
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            value = {dataProvider.firstName}
                            placeholder="Digite seu primeiro nome."
                            type="text"
                            onChange={(e) =>
                              this.setState({ firstName: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Sobrenome
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Digite o seu sobrenome."
                            type="text"
                            value = {dataProvider.lastname}
                            onChange={(e) =>
                              this.setState({ lastname: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            E-mail
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Digite seu e-mail pessoal."
                            type="email"
                            value = {dataProvider.pessoalEmail}
                            onChange={(e) =>
                              this.setState({ pessoalEmail: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Telefone / Whatsapp
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Digite o seu telefone."
                            type="text"
                            value = {dataProvider.pessoalPhone}
                            onChange={(e) =>
                              this.setState({ pessoalPhone: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            RG
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Digite seu RG."
                            type="text"
                            value = {dataProvider.rg}
                            onChange={(e) =>
                              this.setState({ rg: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            CPF
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Digite o seu CPF."
                            type="text"
                            value = {dataProvider.cpf}
                            onChange={(e) =>
                              this.setState({ cpf: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Informações da empresa
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Nome Fantasia
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              placeholder="Digite o nome fantasia da sua empresa."
                              type="text"
                              value = {dataProvider.nameFantasy}
                              onChange={(e) =>
                                this.setState({ nameFantasy: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Razão social
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={dataProvider.rSocial}
                              id="input-email"
                              placeholder="Digite a razão social da sua empresa."
                              type="text"
                              onChange={(e) =>
                                this.setState({ rSocial: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              CNPJ
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-first-name"
                              value={dataProvider.cnpj}
                              placeholder="Digite o CNPJ da sua empresa."
                              type="text"
                              onChange={(e) =>
                                this.setState({ cnpj: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Atribuição
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="Last name"
                              type="select"
                              value = {dataProvider.assignment}
                              onChange={(e) =>
                                this.setState({ assignment: e.target.value })
                              }
                            >
                              <option>Selecionar</option>
                              <option>Sociedade Anônima</option>
                              <option>Sociedade Simples</option>
                              <option>
                                Sociedade Empresária Limitada (Ltda.)
                              </option>
                              <option>
                                Empresa Individual de Responsabilidade Limitada
                                (Eireli)
                              </option>
                              <option>Empresa individual</option>
                              <option>Microempreendedor Individual</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      informações de endereço
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="5">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Logradouro
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite o endereço de sua empresa"
                              type="text"
                              value = {address.street}
                              onChange={(e) =>
                                this.setState({ street: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="2">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Número
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite número"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="5">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Bairro
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite o nome do bairro"
                              type="text"
                              // value = {address.neighborhood}
                              onChange={(e) =>
                                this.setState({ neighborhood: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="5">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              CEP
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-city"
                              placeholder="Digite seu CEP."
                              type="text"
                              // value = {address.cep}
                              onChange={(e) =>
                                this.setState({ cep: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="5">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Cidade
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-country"
                              placeholder="Digite o nome da sua cidade."
                              type="text"
                              value = {address.city}
                              onChange={(e) =>
                                this.setState({ city: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="2">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Estado
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Digite o seu estado"
                              type="text"
                              value = {address.state}
                              onChange={(e) =>
                                this.setState({ state: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Latitude / Maps
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite a latitude."
                              type="text"
                              value = {address.lat}
                              onChange={(e) =>
                                this.setState({ lat: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Longitude / Maps
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite a longitude."
                              type="text"
                              value = {address.long}
                              onChange={(e) =>
                                this.setState({ long: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <span style={{ color: "gray" }}>
                        Informações de latitude e longitude, podem ser
                        encontrados no Google Maps, veja como clicando{" "}
                        <a href="#">aqui</a>.
                      </span>
                    </div>
                    {/* CONTACTS */}
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      informações de contato
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              E-mail comercial
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite o endereço de sua empresa"
                              type="text"
                              value = {contact.email}
                              onChange={(e) =>
                                this.setState({ email: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Telefone comercial
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite o endereço de sua empresa"
                              type="text"
                              value = {contact.phone}
                              onChange={(e) =>
                                this.setState({ phone: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Perfil Instagram
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Cole o link do seu perfil do instagram."
                              type="text"
                              value = {contact.instaPerfil}
                              onChange={(e) =>
                                this.setState({ instaPerfil: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Página do Facebook
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Cole o link da sua página do facebook."
                              type="text"
                              value = {contact.facebookPage}
                              onChange={(e) =>
                                this.setState({ facebookPage: e.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}

                    <div id="servicesShow">
                      <FormGroup encType="multipart/form-data">
                        <label>
                          <strong>Descrição da sua empresa.</strong>
                        </label>
                        <Input
                          className="form-control-alternative"
                          placeholder="Fale sobre sua empresa."
                          rows="6"
                          type="textarea"
                          onChange={(e) =>
                            this.setState({ description: e.target.value })
                          }
                        />
                      </FormGroup>
                      <h6 className="heading-small text-muted mb-4">Anexos</h6>
                      <div className="pl-lg-4">
                        <span>
                          Envio imagens dos seguintes documentos.{" "}
                          <strong>
                            RG, CPF, Cartão CNPJ, comprovante de residência.
                          </strong>{" "}
                          <hr className="my-4" />
                        </span>

                        <FormGroup>
                          <label>
                            <strong>RG</strong>{" "}
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Fale sobre seus serviços."
                            rows="6"
                            type="file"
                          />
                        </FormGroup>
                        <FormGroup encType="multipart/form-data">
                          <label>
                            <strong>Cartão CNPJ</strong>{" "}
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Fale sobre seus serviços."
                            rows="6"
                            type="file"
                          />
                        </FormGroup>
                        <FormGroup encType="multipart/form-data">
                          <label>
                            <strong>CPF</strong>{" "}
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Fale sobre seus serviços."
                            rows="6"
                            type="file"
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </Form>
                  <Button
                    style={{ background: "#0068e3", border: "none" }}
                    type="button"
                    id="btnShow"
                    className="float-right"
                    color="default"
                    size="md"
                    onClick={handleRegister}
                  >
                    Cadastrar
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;

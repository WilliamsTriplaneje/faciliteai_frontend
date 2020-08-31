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
  };
  async componentDidMount() {
    const providerId = localStorage.getItem("providerId");
    const response = await api.get(`/provider/${providerId}`);
    //VERIFY NULL
    if (response.data == null) {
      alert("Está vazio");

      const btnShow = document.getElementById("btnShow");
      btnShow.style.display = "block";

      const servicesShow = document.getElementById("servicesShow");
      servicesShow.style.display = 'grid'
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
      servicesShow.style.display = 'none'
    }
  }
  render() {
    const { dataProvider } = this.state;
    const { address } = this.state;
    const { contact } = this.state;
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
                          src={require("../../assets/img/theme/team-4-800x800.jpg")}
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
                    {/* <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Category
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div> */}
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
                  <Form>
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
                              value={dataProvider.nameFantasy}
                              id="input-username"
                              placeholder="Digite o nome fantasia da sua empresa."
                              type="text"
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
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Endereço
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              value={address.street}
                              placeholder="Digite o endereço de sua empresa"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Cidade
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-city"
                              placeholder="Digite a cidade."
                              value={address.city}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Estado
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-country"
                              value={address.state}
                              placeholder="Digite o estado"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              CEP
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              value={address.cep}
                              placeholder="Digite o CEP"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    {/* CONTACTS */}
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      informações de contato
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
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
                              value={contact.email}
                              placeholder="Digite o endereço de sua empresa"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Telefone Comercial
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              value={contact.phone}
                              placeholder="Digite o endereço de sua empresa"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <div id='servicesShow'>
                      <h6 className="heading-small text-muted mb-4">
                        Serviços
                      </h6>
                      <div className="pl-lg-4">
                        <FormGroup>
                          <label>Descrição dos serviços</label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Fale sobre seus serviços."
                            rows="6"
                            type="textarea"
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </Form>
                  <Button
                    type="submit"
                    id="btnShow"
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="md"
                  >
                    Concluir
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

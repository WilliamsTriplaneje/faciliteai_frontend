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
    workProvider: localStorage.getItem("providerId"),
    workName: "",
    workCategory: "",
    workSubcategory: "",
    value: "",
    workDescription: "",
    typePay: "",
    isActive: true,

    categorys: [],
    subcategorys: [],
  };
  async componentDidMount() {
    const response = await api.get("/admin/categorys");
    this.setState({ categorys: response.data });
  }

  render() {
    const { workName } = this.state;
    const { workProvider } = this.state;
    const { workCategory } = this.state;
    const { workSubcategory } = this.state;
    const { value } = this.state;
    const { workDescription } = this.state;
    const { typePay } = this.state;
    const { isActive } = this.state;

    const { categorys } = this.state;
    const { subcategorys } = this.state;

    async function handleRegister() {
      const response = await api.post("/register/work", {
        workName,
        workProvider,
        workCategory,
        workSubcategory,
        value,
        workDescription,
        typePay,
        isActive,
      });
      console.log(response.data);
    }

    async function handleSubcategory(categoryId) {
      const response = await api.get(`/admin/subcategory/filter?categoryId=${categoryId}`);
      return response.data
    }
    
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                    <h3></h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      <span style={{ fontSize: "18px" }}>
                        Ultimos serviços cadastrados
                      </span>
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      <ul>
                        <li>
                          <a href="#"> Nome do serviço</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Cadastro de serviço</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form role="form" onSubmit={handleRegister}>
                    {/* CONTACTS */}
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      informações do serviço
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Serviço
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Dê um nome para o seu serviço."
                              type="text"
                              onChange={(e) =>
                                this.setState({ workName: e.target.value })
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
                              Categoria
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite o endereço de sua empresa"
                              type="select"
                              onChange={async (e) =>
                                {
                                  this.setState({
                                    workCategory: e.target.value,
                                    subcategorys: await handleSubcategory(e.target.value)
                                  })
                                }
                              }
                            >
                              {" "}
                              <option>Selecionar</option>
                              {categorys && categorys.map((all) => (
                                <option value={all._id}>{all.category}</option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Nome do serviço
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite o endereço de sua empresa"
                              type="select"
                              onChange={(e) =>
                                this.setState({
                                  workSubcategory: e.target.value,
                                })
                              }
                            >
                              {" "}
                              {subcategorys.map((all) => (
                                <option>{all.subcategory}</option>
                              ))}
                              <option>Selecionar</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Valor do serviço
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite o endereço de sua empresa"
                              type="text"
                              onChange={(e) =>
                                this.setState({ value: e.target.value })
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
                              Tipo de cobrança
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite o endereço de sua empresa"
                              type="select"
                              onChange={(e) =>
                                this.setState({ typePay: e.target.value })
                              }
                            >
                              {" "}
                              <option>Selecionar</option>
                              <option>Integral</option>
                              <option>Por dias</option>
                              <option>Por horas</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Descrição do serviço
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite o endereço de sua empresa"
                              type="textarea"
                              onChange={(e) =>
                                this.setState({
                                  workDescription: e.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <Button
                      style={{ background: "#0068e3", border: "none" }}
                      type="submit"
                      id="btnShow"
                      className="float-right"
                      color="default"
                      size="md"
                    >
                      Cadastrar
                    </Button>
                  </Form>
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

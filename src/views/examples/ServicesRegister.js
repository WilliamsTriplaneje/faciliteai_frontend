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
import { getUser} from "../../auth";
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
    companyId: localStorage.getItem("providerId"),
    name: "",
    category: "",
    subcategory: "",
    price: 0,
    description: "",
    typePay: "",

    categories: [],
    subcategories: [],
  };
  async componentDidMount() {
    const { _id } = getUser()
    await api.get("/categories").then((result) => {
      console.log("Categorias listadas com sucesso")
      this.setState({ categories: result.data });
    }).catch((err) => {
      console.log("Falha ao listar categorias!")
      console.log(err)
    })

    await api.get(`/companies/users/${_id}`).then((result) => {
      const company = result.data
      console.log("Empresa do usuário obtida com sucesso")
      this.setState({
        companyId: company._id
      })
    })
    .catch((err) => {
      console.log("Erro ao obter empresa do usuário")
      console.log(err)
    })
    
  }

  render() {
    const { name } = this.state;
    const { companyId } = this.state;
    const { category } = this.state;
    const { subcategory } = this.state;
    const { price } = this.state;
    const { description } = this.state;
    const { typePay } = this.state;

    const { categories } = this.state;
    const { subcategories } = this.state;

    async function handleRegister(e) {
      e.preventDefault();
      await api.post("/services", {
        name,
        companyId,
        category,
        subcategory,
        price,
        description,
        typePay,
      }).then(async (result) => {
        console.log("Serviço cadastrado com sucesso!")
        await Swal.fire({
          icon: "success",
          title: "FaciliteAi",
          text: "Serviço cadastrado com sucesso!",
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log("Falha ao cadastrar serviço!")
        console.log(err)
      })
    }

    async function handleSubcategory(categoryId) {
      return await api.get(`/sub-categories?categoryId=${categoryId}`).then((result) => {
        return result.data
      })
      .catch((err) => {
        console.log(`Falha ao listar subcategorias da categoria ${categoryId}`)
        console.log(err)
        return []
      })
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
                                this.setState({ name: e.target.value })
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
                                    category: e.target.value,
                                    subcategories: await handleSubcategory(e.target.value)
                                  })
                                }
                              }
                            >
                              {" "}
                              <option>Selecionar</option>
                              {categories && categories.map((all) => (
                                <option value={all._id}>{all.name}</option>
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
                              Subcategoria
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Digite o endereço de sua empresa"
                              type="select"
                              onChange={(e) =>
                                this.setState({
                                  subcategory: e.target.value,
                                })
                              }
                            >
                              {" "}
                              {subcategories.map((all) => (
                                <option>{all.name}</option>
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
                              placeholder="Digite o preço do serviço"
                              type="text"
                              onChange={(e) =>
                                this.setState({ price: e.target.value })
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
                              placeholder="Selecione o tipo de cobrança"
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
                              placeholder="Digite a descrição do serviço"
                              type="textarea"
                              onChange={(e) =>
                                this.setState({
                                  description: e.target.value,
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

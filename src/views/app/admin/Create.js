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
import api from "../services/api";
import Swal from "sweetalert2";
// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Input,
  Form,
} from "reactstrap";

import Header from "../components/Headers/Header.js";

class Index extends React.Component {
  state = {
    adminData: {},
    categorys: [],
    subcategorys: [],

    category: "",
    createdBy: "",
    isAdmin: null,

    subcategory: "",
    categoryId: "",
  };
  async componentDidMount() {
    //GET DATA ADMIN
    const adminId = localStorage.getItem("AdminId");
    const response = await api.get(`/profile/admin/${adminId}`);
    this.setState({ adminData: response.data });
    this.setState({ createdBy: response.data.adminName });
    this.setState({ isAdmin: response.data.isAdmin });

    //GET CATEGORYS
    const allcategorys = await api.get("/admin/categorys");
    this.setState({ categorys: allcategorys.data });

    //GET SUBCATEBORYS
    const allsubcategorys = await api.get(`/admin/subcategorys`);
    this.setState({ subcategorys: allsubcategorys.data });
  }

  render() {
    //STATES FOR REGISTER CATEGORY
    const { category } = this.state;
    const { createdBy } = this.state;
    const { isAdmin } = this.state;

    //GET ALL CATEGORYS
    const { categorys } = this.state;

    //STATES FOR REGISTER SUBCATEGORY
    const { subcategory } = this.state;
    const { categoryId } = this.state;

    const { subcategorys } = this.state;

    async function handleRegisterCategory(e) {
      e.preventDefault();
      try {
        await api.post(`/admin/register/category`, {
          category,
          createdBy,
          isAdmin,
        });
        window.location = "/admin/new";
      } catch (error) {
        const { data } = error.response;
        alert(data.error);
      }
    }

    async function handleRegisterSubcategory(e) {
      e.preventDefault();

      await api.post("/admin/register/subcategory", {
        subcategory,
        categoryId,
      });
      await Swal.fire({
        icon: "success",
        title: "FaciliteAi",
        text: `Subcategoria registrada com sucesso !!`,
      });
      window.location = "/admin/new";
    }

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Cadastrar Categoria</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Row>
                  <Col>
                    <Form role="Form" onSubmit={handleRegisterCategory}>
                      <div style={{ textAlign: "center" }}>
                        <div className="col">
                          <label
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            Nome da categoria
                          </label>
                          <Input
                            type="text"
                            placeholder="Digite o nome da categoria"
                            onChange={(e) =>
                              this.setState({ category: e.target.value })
                            }
                          />
                        </div>
                        <Button className="my-4" color="primary" type="submit">
                          Registrar
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Categorias</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Criado por</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {categorys.map((allcat) => (
                      <tr>
                        <th scope="row">{allcat.category}</th>
                        <td>{allcat.createdBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Cadastrar Subcategoria</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Row>
                  <Col>
                    <Form role="Form" onSubmit={handleRegisterSubcategory}>
                      <div style={{ textAlign: "center" }}>
                        <div className="col">
                          <label
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            Categoria
                          </label>
                          <Input
                            type="select"
                            onChange={(e) =>
                              this.setState({ categoryId: e.target.value })
                            }
                          >
                            <option>Selecionar</option>
                            {categorys.map((allcat) => (
                              <option value={allcat._id}>
                                {allcat.category}
                              </option>
                            ))}
                          </Input>
                        </div>
                        <br />
                        <div className="col">
                          <label
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            Nome da Subcategoria
                          </label>
                          <Input
                            type="text"
                            placeholder="Digite o nome da subcategoria"
                            onChange={(e) =>
                              this.setState({ subcategory: e.target.value })
                            }
                          />
                        </div>
                        <Button className="my-4" color="primary" type="submit">
                          Registrar
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;

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
import { useHistory } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";
import { isItEmpty } from "../../../utils/inputUtils";

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

import Header from "../../../components/Headers/Header";

function Category() {
  const history = useHistory()

  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    async function loadCategorys() {
      await api
        .get("/categories")
        .then((result) => {
          setCategorys(result.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
    loadCategorys();
  }, [handleRegisterCategory]);


  const [subcategories, setSubcategories] = useState([]);
  useEffect(() => {
    async function loadSubcategorys() {
      await api
        .get("/sub-categories")
        .then((result) => {
          setSubcategories(result.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
    loadSubcategorys();
  }, []);

  //REGISTER CATEGORYS
  const [name, setName] = useState("");
  async function handleRegisterCategory(e) {
    e.preventDefault();
    const nameCategory = document.getElementById("nameCategory");
    isItEmpty(nameCategory);

    await api
      .post("/categories", {
        name,
      })
      .then(() => {
        return
      })
      .catch((err) => {
        alert(err);
      });
  }

  const [categoryId, setCategoryId] = useState("");
  const [nameSubcategory, setNameSubcategory] = useState("");
  //REGISTER SUBCATEGORYS
  async function handleRegisterSubcategory(e) {
    e.preventDefault();
    await api
      .post("/sub-categories", {
        name: nameSubcategory ,
        categoryId
      })
      .then(() => {
        window.location = '/app/admin/categorias'
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <Header />
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
                        <label style={{ fontSize: "15px", fontWeight: "bold" }}>
                          Nome da categoria
                        </label>
                        <Input
                          id="nameCategory"
                          type="text"
                          placeholder="Digite o nome da categoria"
                          onChange={(event) => setName(event.target.value)}
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
                  {categorys.map((category) => (
                    <tr key={category._id}>
                      <th scope="row">{category.name}</th>
                      <td>{category.createdBy}</td>
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
                        <label style={{ fontSize: "15px", fontWeight: "bold" }}>
                          Categoria
                        </label>
                        <Input
                          type="select"
                          onChange={(event) =>
                            setCategoryId(event.target.value)
                          }
                        >
                          <option>Selecionar</option>
                          {categorys.map((category) => (
                            <option value={category._id} key={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </Input>
                      </div>
                      <br />
                      <div className="col">
                        <label style={{ fontSize: "15px", fontWeight: "bold" }}>
                          Nome da Subcategoria
                        </label>
                        <Input
                          type="text"
                          placeholder="Digite o nome da subcategoria"
                          onChange={(event) =>
                            setNameSubcategory(event.target.value)
                          }
                        />
                      </div>
                      <Button className="my-4" color="primary" type="submit" id='btntest'>
                        Registrar
                      </Button>
                    </div>
                  </Form>
                </Col>
                <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Subcategorias</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Categora associada</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {subcategories.map((subcategories) => (
                    <tr key={subcategories._id}>
                      <th scope="row">{subcategories.name}</th>
                      <td>{subcategories.categoryName}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Category;

// class Index extends React.Component {
//   state = {
//     adminData: {},
//     categorys: [],
//     subcategorys: [],

//     name: "",
//     createdBy: "",
//     isAdmin: null,

//     subcategory: "",
//     categoryId: "",
//   };
//   async componentDidMount() {
//     //GET DATA ADMIN
//     const adminId = localStorage.getItem("AdminId");
//     const response = await api.get(`/profile/admin/${adminId}`);
//     this.setState({ adminData: response.data });

//     //GET CATEGORYS
//     const allcategorys = await api.get("/admin/categorys");
//     this.setState({ categorys: allcategorys.data });

//     //GET SUBCATEBORYS
//     const allsubcategorys = await api.get(`/admin/subcategorys`);
//     this.setState({ subcategorys: allsubcategorys.data });
//   }

//   render() {
//     //STATES FOR REGISTER CATEGORY
//     const { name } = this.state;
//     const {createdBy} = this.state
//     //GET ALL CATEGORYS
//     const { categorys } = this.state;

//     //STATES FOR REGISTER SUBCATEGORY
//     const { subcategory } = this.state;
//     const { categoryId } = this.state;

//     const { subcategorys } = this.state;

//     async function handleRegisterCategory(e) {
//       e.preventDefault();
//         await api.post(`/categories`, {
//           name,
//           createdBy,
//         }).then((result)=>{
//           console.log(result)
//         }).catch((err)=>{
//           alert(err)
//         });
//     }

//     async function handleRegisterSubcategory(e) {
//       e.preventDefault();

//       await api.post("/admin/register/subcategory", {
//         subcategory,
//         categoryId,
//       });
//       await Swal.fire({
//         icon: "success",
//         title: "FaciliteAi",
//         text: `Subcategoria registrada com sucesso !!`,
//       });
//       window.location = "/admin/new";
//     }

//     return (

//     );
//   }
// }

// export default Index;

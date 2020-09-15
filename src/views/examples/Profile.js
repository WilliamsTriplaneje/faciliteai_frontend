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
import { getUser } from "../../auth";

import Swal from "sweetalert2";
import FormData from "form-data";
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

  constructor(props) {
    super(props);

    this.state = {
      //LISTAGEM PÓS REGISTRO APROVADO
      nameFantasy: "",
      rSocial: "",
      cnpj: "",
      assignment: "",
      description: "",
  
      responsible: {
        name: "",
        lastname: "",
        phone: "",
        rg: "",
        cpf: "",
        email: "",
      },
  
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
  
      rgFile: null,
      cnpjFile: null,
      cpfFile: null,
      logoFile: null,
      proofOfResidenceFile: null,
  
      isInAnalysis: true,
      isActive: false,
  
      company: null,
      isLoading: true,
      logoUrl: null
    };

    this.renderBtnShow = this.renderBtnShow.bind(this);
    this.renderServiceShow = this.renderServiceShow.bind(this);
    this.renderUploadShow = this.renderUploadShow.bind(this);

}
  
  async componentDidMount() {
    const userId = getUser()._id
    
    await api.get(`/companies/users/${userId}`)
      .then(async (result) => {
        const company_ = result.data

        if(company_.isInAnalysis){
          await Swal.fire({
            icon: "warning",
            title: "FaciliteAi",
            text: "Por favor aguarde a aprovação dos seus dados!",
          });
          // window.location = "/app/servicos";
          // return
        }
        this.setState({
          company: company_,
          isInAnalysis: company_.isInAnalysis,
          isActive: company_.isActive,
          responsible: company_.responsible,
          address: company_.address,
          contact: company_.contact,
          nameFantasy: company_.nameFantasy,
          rSocial: company_.rSocial,
          cnpj: company_.cnpj,
          assignment: company_.assignment,
          description: company_.description,
          logoUrl: company_.logoUrl
        })
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: "FaciliteAi",
          text: "É necessário preencher os dados da sua empresa!",
        });
      })
    this.setState({
      isLoading: false
    })

    // //VERIFY NULL
    // if (response.data == null) {
      

    //   const btnShow = document.getElementById("btnShow");
    //   btnShow.style.display = "block";

    //   const servicesShow = document.getElementById("servicesShow");
    //   servicesShow.style.display = "grid";
    // } else {
    //   this.setState({
    //     isInAnalysis: response.data.isInAnalysis,
    //     isActive: response.data.isActive,
    //   });

    //   if (response.data.isInAnalysis === true) {
    //     await Swal.fire({
    //       icon: "warning",
    //       title: "FaciliteAi",
    //       text: "Por favor aguarde a aprovação dos seus dados!",
    //     });
    //     window.location = "/app/servicos";

    //     const btnShow = document.getElementById("btnShow");
    //     btnShow.style.display = "none";

    //     //DISABLE EDIT SERVICES DIV
    //     const servicesShow = document.getElementById("servicesShow");
    //     servicesShow.style.display = "none";
    //   } else {
    //     //GET DATA's
    //     this.setState({ nameFantasy: response.data.nameFantasy });
    //     this.setState({ rSocial: response.data.rSocial });
    //     this.setState({ cnpj: response.data.cnpj });
    //     this.setState({ assignment: response.data.assignment });
    //     this.setState({ description: response.data.description });
    //     this.setState({ responsible: response.data.responsible });
    //     this.setState({ address: response.data.address });
    //     this.setState({ contact: response.data.contact });

    //     //DISABLE BUTTON
    //     const btnShow = document.getElementById("btnShow");
    //     btnShow.style.display = "none";

    //     //DISABLE EDIT SERVICES DIV
    //     const servicesShow = document.getElementById("servicesShow");
    //     servicesShow.style.display = "none";

    //     const uploadLogo = document.getElementById("uploadLogo");
    //     uploadLogo.style.display = "none";
    //   }
    // }
  }

  isDisabled() {
    const { company } = this.state
    if(company){
      return true
    }
    return false
  }

  renderBtnShow(){
    return (
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
    )
   }

   renderUploadShow(){
     return (
       <div id = 'uploadLogo'>
         <label>
           <strong>Logo da empresa</strong>
         </label>
         <Input
           id="logoFileInput"
           className="form-control-alternative"
           type="file"
           name="logoFile"
           onChange={(e) => {
             this.setState({
               logoFile: e.target.files[0],
             });
           }}
         />
       </div>
     )
   }
   renderServiceShow(){
     return (
       <div id="servicesShow">
       <FormGroup encType="multipart/form-data">
         <label>
           <strong>Descrição da sua empresa.</strong>
         </label>
         <Input
           className="form-control-alternative"
           readOnly={this.isDisabled()}
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
             readOnly={this.isDisabled()}
             placeholder="Fale sobre seus serviços."
             rows="6"
             type="file"
             name="rgFile"
             onChange={(e) => {
               this.setState({
                 rgFile: e.target.files[0],
               });
             }}
           />
         </FormGroup>
         <FormGroup encType="multipart/form-data">
           <label>
             <strong>Cartão CNPJ</strong>{" "}
           </label>
           <Input
             id="cnpjFileInput"
             className="form-control-alternative"
             placeholder="Fale sobre seus serviços."
             readOnly={this.isDisabled()}
             rows="6"
             type="file"
             name="cnpjFile"
             onChange={(e) => {
               this.setState({
                 cnpjFile: e.target.files[0],
               });
             }}
           />
         </FormGroup>
         <FormGroup encType="multipart/form-data">
           <label>
             <strong>Comprovante de Residência</strong>{" "}
           </label>
           <Input
             id="proofOfResidenceFileInput"
             className="form-control-alternative"
             placeholder="Fale sobre seus serviços."
             readOnly={this.isDisabled()}
             rows="6"
             type="file"
             name="proofOfResidenceFile"
             onChange={(e) => {
               this.setState({
                 proofOfResidenceFile: e.target.files[0],
               });
             }}
           />
         </FormGroup>
         <FormGroup encType="multipart/form-data">
           <label>
             <strong>CPF</strong>{" "}
           </label>
           <Input
             className="form-control-alternative"
             placeholder="Fale sobre seus serviços."
             readOnly={this.isDisabled()}
             rows="6"
             type="file"
             name="cpfFile"
             onChange={(e) => {
               this.setState({
                 cpfFile: e.target.files[0],
               });
             }}
           />
         </FormGroup>
       </div>
     </div>
     )
   }

  render() {
    const { isLoading } = this.state;

    const { responsible, company } = this.state;
    const { address } = this.state;
    const { contact } = this.state;
    const { nameFantasy } = this.state;
    const { rSocial } = this.state;
    const { cnpj } = this.state;
    const { assignment } = this.state;
    const { description } = this.state;
    const { logoUrl } = this.state
    
    const {
      rgFile,
      cnpjFile,
      cpfFile,
      logoFile,
      isInAnalysis,
      isActive,
      proofOfResidenceFile,
    } = this.state;

    

    // function disableLogos(){
    //   //DISABLE BUTTON
    //   const btnShow = document.getElementById("btnShow");
    //   btnShow.style.display = "none";
  
    //   //DISABLE EDIT SERVICES DIV
    //   const servicesShow = document.getElementById("servicesShow");
    //   servicesShow.style.display = "none";
  
    //   const uploadLogo = document.getElementById("uploadLogo");
    //   uploadLogo.style.display = "none";
    // }

    async function handleRegister(e) {
      e.preventDefault();
      try {
        await api
          .post("/companies", {
            responsible,
            nameFantasy,
            rSocial,
            cnpj,
            assignment,
            address,
            contact,
            description,
          })
          .then((result) => {
            const data = new FormData();
            const company = result.data;

            data.append("cnpjFile", cnpjFile, cnpjFile.name);
            data.append("cpfFile", cpfFile, cpfFile.name);
            data.append("rgFile", rgFile, rgFile.name);
            data.append("logoFile", logoFile, logoFile.name);
            data.append(
              "proofOfResidenceFile",
              proofOfResidenceFile,
              proofOfResidenceFile.name
            );

            api.put(`/companies/${company._id}/uploads`, data, {
              headers: {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
              },
            });
          });
        await Swal.fire({
          icon: "success",
          title: "FaciliteAi",
          text: "Seus dados foram enviados para aprovação",
        });
        // window.location = '/app/dashboard'
        window.location = "/app/servicos";
      } catch (err) {
        console.log("Erro ao fazer upload das imagens!")
        console.log(err)
        await Swal.fire({
          icon: "error",
          title: "FaciliteAi",
          text: `Tivemos um problema ao realizar o upload dos arquivos, tente novamente em breve.`,
        });
      }
    }
    

    if(isLoading){
      return (
        <>
        ...
        </>
      )
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
                          src={logoUrl ? logoUrl : require("../../assets/img/theme/avatar-icon.png")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    {/* <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Serviços</span>
                        </div>
                        <div></div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div> */}
                    <div></div>
                    <div></div>
                    <div></div>
                    {company ? '': this.renderUploadShow()}
                  </Row>
                  <div className="text-center">
                    <h3>{nameFantasy}</h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {address.city} - {address.state}
                    </div>
                    <hr className="my-4" />
                    <p>{description}</p>
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
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form role="form" onSubmit={handleRegister}>
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
                            required
                            readOnly={this.isDisabled()}
                            
                            value={responsible.name}
                            placeholder="Digite seu primeiro nome."
                            type="text"
                            onChange={(e) =>
                              this.setState({
                                responsible: {
                                  ...responsible,
                                  name: e.target.value,
                                },
                              })
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
                            readOnly={this.isDisabled()}
                            id="input-email"
                            placeholder="Digite o seu sobrenome."
                            type="text"
                            value={responsible.lastname}
                            onChange={(e) =>
                              this.setState({
                                responsible: {
                                  ...responsible,
                                  lastname: e.target.value,
                                },
                              })
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
                            readOnly={this.isDisabled()}
                            placeholder="Digite seu e-mail pessoal."
                            type="email"
                            value={responsible.email}
                            onChange={(e) =>
                              this.setState({
                                responsible: {
                                  ...responsible,
                                  email: e.target.value,
                                },
                              })
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
                            mask = '(99)9 9999-9999'
                            id="input-email"
                            readOnly={this.isDisabled()}
                            placeholder="Digite o seu telefone."
                            type="text"
                            value={responsible.phone}
                            onChange={(e) =>
                              this.setState({
                                responsible: {
                                  ...responsible,
                                  phone: e.target.value,
                                },
                              })
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
                            readOnly={this.isDisabled()}
                            id="input-username"
                            placeholder="Digite seu RG."
                            type="text"
                            value={responsible.rg}
                            onChange={(e) =>
                              this.setState({
                                responsible: {
                                  ...responsible,
                                  rg: e.target.value,
                                },
                              })
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
                            readOnly={this.isDisabled()}
                            id="input-email"
                            placeholder="Digite o seu CPF."
                            type="text"
                            value={responsible.cpf}
                            onChange={(e) =>
                              this.setState({
                                responsible: {
                                  ...responsible,
                                  cpf: e.target.value,
                                },
                              })
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
                              readOnly={this.isDisabled()}
                              id="input-username"
                              placeholder="Digite o nome fantasia da sua empresa."
                              type="text"
                              value={nameFantasy}
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
                              readOnly={this.isDisabled()}
                              value={rSocial}
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
                              readOnly={this.isDisabled()}
                              id="input-first-name"
                              value={cnpj}
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
                              readOnly={this.isDisabled()}
                              disabled={this.isDisabled()}
                              id="inputAssigment"
                              placeholder="Last name"
                              type="select"
                              value={assignment}
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
                              readOnly={this.isDisabled()}
                              id="input-address"
                              placeholder="Digite o endereço de sua empresa"
                              type="text"
                              value={address.street}
                              onChange={(e) =>
                                this.setState({
                                  address: {
                                    ...address,
                                    street: e.target.value,
                                  },
                                })
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
                              readOnly={this.isDisabled()}
                              id="input-address"
                              placeholder="Digite número"
                              type="text"
                              value={address.number}
                              onChange={(e) =>
                                this.setState({
                                  address: {
                                    ...address,
                                    number: e.target.value,
                                  },
                                })
                              }
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
                              readOnly={this.isDisabled()}
                              id="input-address"
                              placeholder="Digite o nome do bairro"
                              type="text"
                              value={address.neighborhood}
                              onChange={(e) =>
                                this.setState({
                                  address: {
                                    ...address,
                                    neighborhood: e.target.value,
                                  },
                                })
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
                              readOnly={this.isDisabled()}
                              id="input-city"
                              placeholder="Digite seu CEP."
                              type="text"
                              value={address.cep}
                              onChange={(e) =>
                                this.setState({
                                  address: {
                                    ...address,
                                    cep: e.target.value,
                                  },
                                })
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
                              readOnly={this.isDisabled()}
                              id="input-country"
                              placeholder="Digite o nome da sua cidade."
                              type="text"
                              value={address.city}
                              onChange={(e) =>
                                this.setState({
                                  address: {
                                    ...address,
                                    city: e.target.value,
                                  },
                                })
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
                              readOnly={this.isDisabled()}
                              id="input-postal-code"
                              placeholder="Digite o seu estado"
                              type="text"
                              value={address.state}
                              onChange={(e) =>
                                this.setState({
                                  address: {
                                    ...address,
                                    state: e.target.value,
                                  },
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <Row>
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
                              readOnly={this.isDisabled()}
                              id="input-address"
                              placeholder="Digite a latitude."
                              type="text"
                              value={address.lat}
                              onChange={(e) =>
                                this.setState({
                                  address: {
                                    ...address,
                                    lat: e.target.value,
                                  },
                                })
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
                              readOnly={this.isDisabled()}
                              id="input-address"
                              placeholder="Digite a longitude."
                              type="text"
                              value={address.long}
                              onChange={(e) =>
                                this.setState({
                                  address: {
                                    ...address,
                                    long: e.target.value,
                                  },
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <span style={{ color: "gray" }}>
                        Informações de latitude e longitude, podem ser
                        encontrados no Google Maps, veja como clicando{" "}
                        <a href="#">aqui</a>.
                      </span> */}
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
                              readOnly={this.isDisabled()}
                              id="input-address"
                              placeholder="Digite o endereço de sua empresa"
                              type="text"
                              value={contact.email}
                              onChange={(e) =>
                                this.setState({
                                  contact: {
                                    ...contact,
                                    email: e.target.value,
                                  },
                                })
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
                              readOnly={this.isDisabled()}
                              id="input-address"
                              placeholder="Digite o endereço de sua empresa"
                              type="text"
                              value={contact.phone}
                              onChange={(e) =>
                                this.setState({
                                  contact: {
                                    ...contact,
                                    phone: e.target.value,
                                  },
                                })
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
                              readOnly={this.isDisabled()}
                              id="input-address"
                              placeholder="Cole o link do seu perfil do instagram."
                              type="text"
                              value={contact.instaPerfil}
                              onChange={(e) =>
                                this.setState({
                                  contact: {
                                    ...contact,
                                    instaPerfil: e.target.value,
                                  },
                                })
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
                              readOnly={this.isDisabled()}
                              id="input-address"
                              placeholder="Cole o link da sua página do facebook."
                              type="text"
                              value={contact.facebookPage}
                              onChange={(e) =>
                                this.setState({
                                  contact: {
                                    ...contact,
                                    facebookPage: e.target.value,
                                  },
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}

                    {company ? '' : this.renderServiceShow()}
                    
                    {company? '' : this.renderBtnShow()}
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

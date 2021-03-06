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
import api from "../../../services/api";
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
import UserHeader from "../../../components/Headers/UserHeader.js";

class Approval extends React.Component {
  state = {
    companyId: '',
    company: undefined,
    nameFantasy: "",
    rSocial: "",
    cnpj: "",
    assignment: "",
    description: "",

    responsible: {},
    address: {},
    contact: {},

    rgUrl: "",
    cpfUrl: "",
    cnpjUrl: "",
    logoUrl: "",
    proofOfResidenceUrl: "",
    isInAnalysis: true,
    isActive: false,
    isLoading: true
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({
      companyId: id
    })

    await api.get(`/companies/${id}`).then((result) => {
      const comp = result.data
      this.setState({
        company: comp,
        isLoading: false
      })
      // this.setState({ nameFantasy: comp.nameFantasy });
      // this.setState({ rSocial: comp.rSocial });
      // this.setState({ cnpj: comp.cnpj });
      // this.setState({ assignment: comp.assignment });
      // this.setState({ description: comp.description });
  
      // this.setState({ responsible: comp.responsible });
      // this.setState({ address: comp.address });
      // this.setState({ contact: comp.contact });
  
      // this.setState({ rgUrl: comp.rgUrl });
      // this.setState({ cpfUrl: comp.cpfUrl });
      // this.setState({ 
      //   cnpjUrl: comp.cnpjUrl,
      //   logoUrl: comp.logoUrl,
      //   proofOfResidenceUrl: comp.proofOfResidenceUrl
      //  });
    })

    //GET DATA's
    

  }
  render() {
    const { company, isLoading } = this.state;
    
    if(isLoading){
      return (
        <>
        </>
      )
    }
    const {responsible = {}, address= {}, contact= {}, companyId = ''} = company
    const { nameFantasy, rSocial, cnpj, assignment, description } = company;

    const { 
      rgUrl, cpfUrl, cnpjUrl, 
      proofOfResidenceUrl, logoUrl 
    } = company;

    console.log(company)
    async function approvalCompany() {
      await api.put(`/companies/${company._id}/approve`, {
        isApproved: true,
      }).then(async (result) => {
        await Swal.fire({
          icon: "success",
          title: "FaciliteAi",
          text: `A empresa foi aprovada com sucesso !!`,
        });
        window.location = "/app/admin/empresas";
      }).catch((err) => {
        console.log(`Falha ao aprovar empresa ${companyId}`)
        console.log(err)
      })

      
    }
    function showRg() {
      console.log(`Mostrando url: ${rgUrl}`)
      Swal.fire({
        imageUrl: `${rgUrl}`,
        imageHeight: 300,
        imageWidth: 300,
        imageAlt: "RG",
      });
    }
    function showCPF() {
      Swal.fire({
        imageUrl: `${cpfUrl}`,
        imageHeight: 300,
        imageWidth: 300,
        imageAlt: "CPF",
      });
    }
    function showCNPJ() {
      Swal.fire({
        imageUrl: `${cnpjUrl}`,
        imageHeight: 300,
        imageWidth: 300,
        imageAlt: "CNPJ",
      });
    }

    function showProofOfResidence() {
      Swal.fire({
        imageUrl: `${proofOfResidenceUrl}`,
        imageHeight: 300,
        imageWidth: 300,
        imageAlt: "Comprovante de residencia",
      });
    }

    function showLogo() {
      Swal.fire({
        imageUrl: `${logoUrl}`,
        imageHeight: 300,
        imageWidth: 300,
        imageAlt: "Logo",
      });
    }

    if(!company){
      return (
      <>
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
                  <span style={{ margin: 8, fontWeight: "bold" }}>
                    Verficar documentos
                  </span>
                </Row>
                <hr className="my-2" />
                <Button style={{ margin: 15 }} onClick={showRg}>
                  RG
                </Button>
                <Button style={{ margin: 15 }} onClick={showCPF}>
                  CPF
                </Button>
                <Button style={{ margin: 15 }} onClick={showCNPJ}>
                  CNPJ
                </Button>
                <Button style={{ margin: 15 }} onClick={showProofOfResidence}>
                  Comp. de Residência
                </Button>
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
                  <Form>
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
                            placeholder="Digite seu primeiro nome."
                            type="text"
                            value={company.responsible.name}
                            disabled="true"
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
                            value={responsible.lastname}
                            disabled="true"
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
                            type="text"
                            value={responsible.email}
                            disabled="true"
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
                            value={responsible.phone}
                            disabled="true"
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
                            value={responsible.rg}
                            disabled="true"
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
                            value={responsible.cpf}
                            disabled="true"
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
                              value={nameFantasy}
                              disabled="true"
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
                              value={rSocial}
                              disabled="true"
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
                              value={cnpj}
                              disabled="true"
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
                              type="text"
                              value={assignment}
                              disabled="true"
                            />
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
                              value={address.street}
                              disabled="true"
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
                              value={address.number}
                              disabled="true"
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
                              value={address.neighborhood}
                              disabled="true"
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
                              type="number"
                              value={address.cep}
                              disabled="true"
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
                              value={address.city}
                              disabled="true"
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
                              value={address.state}
                              disabled="true"
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
                              value={address.lat}
                              disabled="true"
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
                              value={address.long}
                              disabled="true"
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
                              value={contact.email}
                              disabled="true"
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
                              value={contact.phone}
                              disabled="true"
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
                              value={contact.instaPerfil}
                              disabled="true"
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
                              value={contact.facebookPage}
                              disabled="true"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                  <Button
                    style={{ background: "#00e595", border: "none" }}
                    type="submit"
                    id="btnShow"
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={approvalCompany}
                    size="md"
                  >
                    Aprovar Empresa
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

export default Approval;

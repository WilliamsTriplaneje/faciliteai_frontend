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
import { Button, Container, Row, Col } from "reactstrap";

class UserHeader extends React.Component {
  state = {
    provider: {},
  };
  //API DATA
  async componentDidMount() {
    const providerId = localStorage.getItem("providerId");
    const response = await api.get(`/profile/${providerId}`);
    this.setState({ provider: response.data });
  }
  render() {
    const { provider } = this.state;
    return (
      <>
        <div
          className="header pb-2 pt-2 pt-lg-4 d-flex align-items-center"
          style={{
            minHeight: "400px",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">
                  Olá {provider.providerName}
                </h1>
                <p className="text-white mt-0 mb-5">
                  Aqui estão todas as informações de sua empresa, algumas informações ficam
                  visíveis aos seus contratantes.
                  
                </p>
                {/* <Button
                  color="info"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Editar perfil
                </Button> */}
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;

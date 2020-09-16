import React from "react";
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";
import "./styles.css";

function Footers() {
  return (
    <footer style={{ background: "#424242" }}>
      <Container className="footerMain" xl="12" md="12" lg="12">
        <Col lg="6">
          <div className="copyright text-center text-xl-left text-muted follow">
            <strong>SIGA-NOS</strong>
            <span>Facebook</span>
            <a href="https://facebook.com/faciliteai" target="_blank">
              facebook.com/facileai
            </a>
            <span>Instagram</span>
            <a href="https://instagram.com/faciliteai" target="_blank">
              instagram.com/facileai
            </a>
            <img src="../../../assets/img/brand/logo.png" />
          </div>
        </Col>
        <Col lg="6">
          <div className="copyright text-center text-xl-center text-muted contact">
            <strong>CONTATO</strong>
            <span>E-mail</span>
            <p>suporte@faciliteai.com</p>
            <span>Telefone / Whatsapp - Alexandre</span>
            <p>(11)2985-3445 Oeste</p>
          </div>
        </Col>
      </Container>
    </footer>
  );
}

export default Footers;

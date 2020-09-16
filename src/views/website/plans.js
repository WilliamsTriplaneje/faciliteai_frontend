import "./payment.css";
import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";

import useRouter from "./hooks/useRouter";
import Checkout from "../../components/Website/Stripe/Checkout";
import api from "../../services/api";
import { STRIPE_PUBLIC } from "../../config/Constants";
import { loadStripe } from "@stripe/stripe-js";

import { Container, Col, Row, Button, Card } from "reactstrap";

import Header from "../../components/Website/Header/index";
import Footer from "../../components/Footers/SiteFooter";

import "./plans.css";

const stripePromise = loadStripe(STRIPE_PUBLIC);

function Plans({ history }) {
  const [plans, setPlans] = useState([]);
  const [clientEmail, setClientEmail] = useState("");

  // const [isPaying, setIsPaying] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    async function getPlans() {
      await api.get("/stripe/plans").then((res) => {
        setPlans(res.data);
        console.log(res.data);
      });
    }

    getPlans();
  }, []);

  function onSelectPlan(plan) {
    console.log(plan);

    setSelectedPlan(plan);
  }

  async function getCheckoutSection(costumerEmail) {
    const planId = selectedPlan.id;

    const session = await api
      .post("/stripe/plans/checkout", {
        planId,
        clientEmail: costumerEmail,
      })
      .then((res) => res.data);

    return session;
  }

  if (!selectedPlan) {
    return (
      <>
        <Header />
        <Container
          fluid
          className="bg-gradient-info"
          style={{ width: "100vw"}}
        >
          <div className="container">
            <br />
            <Row lg="12">
              {plans &&
                plans.map((plan) => (
                  <Col lg="4">
                    <Card className="cardPlans">
                      <div key={plan.id} className="service">
                        <h1>Nome dos planos</h1>
                        <span>Aqui deve ir a descrição dos planos</span>
                        <h4>R$ {plan.amount / 100}</h4>
                        <p>Plano Mensal</p>
                        <Button
                        type="button"
                        onClick={() => {
                          onSelectPlan(plan);
                        }}
                      >
                        Comprar
                      </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
          <br/>
         <Footer /> 
        </Container>
        
      </>
    );
  }
  //   return (<Checkout
  //       selectedService={selectedService}
  //       history={history}
  //   />)
  async function onSubmit(e) {
    e.preventDefault();

    const { id } = await getCheckoutSection(clientEmail);

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: id,
    });
    console.log(error);
  }
  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Pagar</button>
    </form>
  );
}

export default Plans;

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
        setPlans(res.data.filter((plan) => plan.name !== undefined));
      });
    }

    getPlans();
  }, []);

  async function getCheckoutSection(plan) {
    const planId = plan.id;

    const session = await api
      .post("/stripe/plans/checkout", {
        planId,
      })
      .then((res) => res.data);

    return session;
  }
  async function onSelectPlan(plan) {
    const { id } = await getCheckoutSection(plan);

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: id,
    });
    console.log(error);
  }

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
                      <h1>{plan.name}</h1>
                      <span>{plan.description}</span>
                      <h4>R$ {plan.amount / 100}</h4>
                      <p>{plan.interval === 'month' ? 'Plano mensal' : plan.interval}</p>
                      <Button
                      type="button"
                      onClick={() => {
                        setSelectedPlan(plan)
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

export default Plans;

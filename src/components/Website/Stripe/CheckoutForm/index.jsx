import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Card, Button, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import api from '../../../../services/api'
import CardField from '../CardField'
import './styles.css'

import Header from '../../Header/index'
import Footer from '../../../Footers/SiteFooter'

const CheckoutForm = ({ selectedService, history }) => {
  const stripe = useStripe();
  const elements = useElements();

  if (!selectedService) history.push('/')

  const [receiptUrl, setReceiptUrl] = useState('')
  const [clientEmail, setClientEmail] = useState('')


  const handleSubmit = async event => {
    event.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
      alert(result.error.message)
      return
    } else {
      console.log(result.token);
    }
    const { token } = result

    const order = await api.post('/stripe/payments/charges', {
      clientEmail: clientEmail,
      serviceId: selectedService._id,
      token: token
    })
    setReceiptUrl(order.data)
  }

  if (receiptUrl) {
    return (
      <div className="success">
        <h2>Payment Successful!</h2>
        <a href={receiptUrl}>View Receipt</a>
        <Link to="/">Home</Link>
      </div>
    )
  }
  return (
    <>
      <Header />
      <section className='product bg-gradient-info'>
        <Card style={{ padding: '8px', width: '60vw', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }} lg='12' md='12' xl='12'>
          <div className="checkout-form">
            <div className="product-info">
              <span>Produto:</span>
              <h4 className="product-price">{selectedService.name}</h4>
              <span>Preço:</span>
              <h4>R$  {selectedService.price}</h4>
              <form onSubmit={handleSubmit}>
                <span>E-mail:</span>
                <Input type="text" title="Email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                <br/>
                <span>Dados do cartão</span>
                <CardField  />
                <Button type="submit" disabled={!stripe}>
                  Pagar
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </section>
      <Footer />
    </>

  )
}

export default CheckoutForm
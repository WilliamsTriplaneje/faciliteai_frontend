import React, { useState } from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom'
import api from '../../../../services/api'
import CardField from '../CardField'
import './styles.css'

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
      // setReceiptUrl(order.data.charge.receipt_url)
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
    <div className="checkout-form">
      <div class="product-info">
        <h3 className="product-title">{selectedService.name}</h3>
        <h4 className="product-price">{selectedService.price}</h4>
      </div>
      <h3>{selectedService.name}</h3>
        <h4>{selectedService.price}</h4>
        <form onSubmit={handleSubmit}>
          <input type="text" title="Email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)}/>
          <CardField />
        <button type="submit" disabled={!stripe}>
            Pagar
        </button>
        </form>
    </div>
    )
}

export default CheckoutForm
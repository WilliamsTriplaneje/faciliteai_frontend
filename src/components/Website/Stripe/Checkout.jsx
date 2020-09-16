import React, { useEffect } from 'react'
import CheckoutForm from './CheckoutForm'
import { STRIPE_PUBLIC } from '../../../config/Constants'
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(STRIPE_PUBLIC);

const Checkout = ({ selectedService, history }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
        <Elements stripe={stripePromise}>
            <CheckoutForm selectedService={selectedService} history={history} />
        </Elements>
  )
}
export default Checkout
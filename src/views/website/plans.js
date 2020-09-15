import './payment.css'
import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { STRIPE_PUBLIC } from '../../config/Constants'
import useRouter from './hooks/useRouter';
import Checkout from '../../components/Website/Stripe/Checkout'
import api from '../../services/api'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(STRIPE_PUBLIC);

function Plans({ history }) {
    const [plans, setPlans] = useState([])
    const [clientEmail, setClientEmail] = useState('')

    // const [isPaying, setIsPaying] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState(null)

    useEffect(() => {
        async function getPlans() {
            await api.get('/stripe/plans').then((res) => {
                setPlans(res.data)
            })
        }

        getPlans()
    }, [])

    function onSelectPlan(plan) {
        console.log(plan)

        setSelectedPlan(plan)
    }

    async function getCheckoutSection(costumerEmail){
        const planId = selectedPlan.id

        const session = await api.post('/stripe/plans/checkout', {
            planId,
            clientEmail: costumerEmail
        }).then((res) => res.data)

        return session
    }

    if(!selectedPlan){
        return (
            <div className='container'>
                {plans && plans.map((plan) => (
                    <div key={plan.id} className="service">
                        {/* <span>{plan.name}</span> */}
                        <span>{plan.amount/100}</span>
                        <button type="button" onClick={() => {onSelectPlan(plan)}}>
                            Comprar
                        </button>
                    </div>
                ))}
            </div>
        )
    }
    // return (<Checkout 
    //     selectedService={selectedService}
    //     history={history}
    // />)
    async function onSubmit(e){
        e.preventDefault()

        const { id } = await getCheckoutSection(clientEmail)
        
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId: id,
        });


        console.log(error)
    }
    return(
        <form onSubmit={onSubmit}>
            <button type="submit">Pagar</button>
        </form>
    )
}

export default Plans;
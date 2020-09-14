import './payment.css'
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { STRIPE_PUBLIC } from '../../config/Constants'
import useRouter from './hooks/useRouter';
import Checkout from '../../components/Website/Stripe/Checkout'
// import { Container } from './styles';

function Payment({ history, location }) {

    
    const router = useRouter();
    const [services, setServices] = useState([
        {
            _id: '5f5a5fe40e9f9ece8b3e9ee2',
            name: 'Serviço I',
            price: 1200.00,
            description: 'Uma descrição legal',
            image: ''
        },
        {
            _id: '5f5a5fe40e9f9ece8b3e9ee2',
            name: 'Serviço II',
            price: 120.00,
            description: 'Uma descrição legal II',
            image: ''
        }
    ])

    // const [isPaying, setIsPaying] = useState(false)
    const [selectedService, setSelectedService] = useState(null)

    function onSelectService(service) {
        console.log(service)
    }

    // return (
    //     <button type="button" onClick={() => {
    //         const l = {
    //             pathname: '/auth/login', // Para onde encaminhar
    //             state: {from: location} // Para onde retornar após autentificado
    //         }
            
    //         console.log(`Location: ${location}`)
    //         console.log(location)
    //         history.push(l);
    //     }}>Ir para login</button>
    // )
    if(!selectedService){
        return (
        
            <div className='container'>
                {services && services.map((service) => (
                    <div key={service._id} className="service">
                        <span>{service.name}</span>
                        <span>{service.price}</span>
                        <button type="button" onClick={() => {setSelectedService(service)}}>
                            Comprar
                        </button>
                    </div>
                ))}
            </div>
        )
    }
    return (<Checkout 
        selectedService={selectedService}
        history={history}
    />)
}

export default Payment;
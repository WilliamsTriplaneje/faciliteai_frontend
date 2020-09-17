import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../../../services/api'

// import { Container } from './styles';

function ConfirmationEmail() {
    const { confirmationId } = useParams();
    const [message, setMessage] = useState('Processando...')
    useEffect(() => {
        async function confirmEmail(){
            await api.post('/confirm-email', {
                confirmationEmailId: confirmationId
            }).then((res) => {
                setMessage('Email confirmado com sucesso')
            }).catch((err) => {
                setMessage('Falha ao confirmar email')
            })
        }
        confirmEmail()
    }, [])
  return message
}

export default ConfirmationEmail;
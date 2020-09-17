import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../../../services/api'

// import { Container } from './styles';

function RecoveryPassword() {
    const { recoveryId } = useParams();
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState(null)
    async function changePassword(e){
        e.preventDefault()
        
        await api.put('/recovery-password', {
            recoveryPasswordId: recoveryId,
            password
        }).then((res) => {
            setMessage('Senha recuperada com sucesso')
        }).catch((err) => {
            setMessage('Falha ao recuperar senha')
        })
    }
    if(message){
        return message
    }
  return (
      <form onSubmit={changePassword}>
          <input type="password" title="password"
          value={password}
          onChange={(e) => {
              setPassword(e.target.value)
          }}
          ></input>
          <button type="submit">Mudar senha</button>
      </form>
  )
}

export default RecoveryPassword;
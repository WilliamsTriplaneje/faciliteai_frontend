import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import {
  isAdmin,
  isMasterAdmin,
  isProvider,
  isClient
} from "../../auth";

// import { Container } from './styles';

function Home() {
  const history = useHistory()


  function redirectTo(path){
    console.log(`Redirecionando usuário para: ${path}`)
    history.push(path)
  }

  useEffect(() => {
    console.log("Reconhecendo")
    if (isAdmin() || isMasterAdmin()) {
      redirectTo(`/app/admin/dashboard`)
      return
    }
    
    if (isProvider()) {
      redirectTo(`/app/empresa`)
      return
    }
    
    if (isClient()) {
      redirectTo(`/`)
      return
    }
    
    redirectTo(`/`)
  }, [])
  return (
    <div></div>
  )
}

export default Home;
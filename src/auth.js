export  const isAuthenticated = () => {
    const providerId = localStorage.getItem('providerId')
    if(!providerId){
        return false
    }
    return true
}
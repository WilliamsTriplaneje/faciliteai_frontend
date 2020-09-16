require('dotenv').config()

export const LOCAL_ADMIN_ID = 'AdminId'
export const LOCAL_PROVIDER_ID = 'ProviderId'
export const LOCAL_TOKEN_ID = 'JWTToken'
export const LOCAL_ROLE = 'Role'
export const LOCAL_USER = 'User'

export const AUTHENTICATED_ROUTE_PREFIX = 'app'

console.log(`Reconhecendo a chave do stripe: ${process.env.REACT_APP_STRIPE_PUBLIC}`)
export const STRIPE_PUBLIC = process.env.REACT_APP_STRIPE_PUBLIC

export const API_URL =  process.env.REACT_APP_API_URL






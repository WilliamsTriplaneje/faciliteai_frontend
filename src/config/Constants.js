require('dotenv').config()

export const LOCAL_ADMIN_ID = 'AdminId'
export const LOCAL_PROVIDER_ID = 'ProviderId'
export const LOCAL_TOKEN_ID = 'JWTToken'
export const LOCAL_ROLE = 'Role'
export const LOCAL_USER = 'User'

export const AUTHENTICATED_ROUTE_PREFIX = 'app'

export const STRIPE_PUBLIC = process.env.REACT_APP_STRIPE_PUBLIC || 'pk_test_51HQBczGCAdgMEL0ED3hyonFA7wbn6vrmFIu5O6zUqXzCf1QjaY7jCzv9oS65m3Fs8vstQBH4GtPYSpdEpRw8QbR000XkOYC72q'

export const API_URL =  process.env.REACT_APP_API_URL || 'http://apiteste-faciliteai-com-br.umbler.net'






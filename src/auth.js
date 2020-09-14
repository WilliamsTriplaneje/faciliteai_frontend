const { LOCAL_ROLE, LOCAL_TOKEN_ID, LOCAL_USER } = require('./config/Constants')

function verifyRole (roles, role){
  return roles.indexOf(role) >= 0
}

export function canAccess (requestedRoles){
  const userRoles = getRoles()
  return requestedRoles.every((role) => userRoles.indexOf(role) >= 0)
}
export const isClient = () => {
  return  verifyRole(getRoles(), 'client')
};

export const isProvider = () => {
  return  verifyRole(getRoles(), 'provider')
};

export const isAdmin = () => {
  return  verifyRole(getRoles(), 'admin')
};

export const isMasterAdmin = () => {
  return  verifyRole(getRoles(), 'master-admin')
};

export const isAuthenticated = () => {
  if (!getToken()) {
    return false;
  }
  return true;
};


export function getRoles(){
  const rolesJson = localStorage.getItem(LOCAL_ROLE);
  return JSON.parse(rolesJson)
}

export function setRoles(roles){
  return localStorage.setItem(LOCAL_ROLE, JSON.stringify(roles));
}


export function getUser(){
  const jsonUser = localStorage.getItem(LOCAL_USER);
  return JSON.parse(jsonUser)
}
export function setUser(user){
  localStorage.setItem(LOCAL_USER, JSON.stringify(user));
}


export function getToken(){
  return localStorage.getItem(LOCAL_TOKEN_ID);
}

export function setToken(token){
  localStorage.setItem(LOCAL_TOKEN_ID, token);
}

export function logout(){
  localStorage.clear();
}
/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import ServicesRegister from "./views/examples/ServicesRegister"
// import Maps from "./views/examples/Maps.js";
import Register from "./views/examples/Register.js";
import Login from "./views/examples/Login.js";
import Tables from "./views/examples/Tables.js";
import { AUTHENTICATED_ROUTE_PREFIX } from './config/Constants'
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute'
// import Icons from "./views/examples/Icons.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: AuthenticatedRoute(Index, ['provider']),
    layout: `/${AUTHENTICATED_ROUTE_PREFIX}`
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  {
    path: "/empresa",
    name: "Meu negócio",
    icon: "ni ni-single-02 text-yellow",
    component:  AuthenticatedRoute(Profile, ['provider']),
    layout: `/${AUTHENTICATED_ROUTE_PREFIX}`
  },  
  {
    path: "/servicos",
    name: "Meus serviços",
    icon: "ni ni-bullet-list-67 text-red",
    component: AuthenticatedRoute(Tables, ['provider']),
    layout: `/${AUTHENTICATED_ROUTE_PREFIX}`
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/cadastrar-servico",
    name: "Cadastrar Serviço",
    icon: "ni ni-circle-08 text-pink",
    component: AuthenticatedRoute(ServicesRegister, ['provider']),
    layout: `/${AUTHENTICATED_ROUTE_PREFIX}`
  },
];
export default routes;

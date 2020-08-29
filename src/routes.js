import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './pages/Login/index'
import Dashboard from './pages/Dasboard/index'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact component={Login} />        
                <Route path='/dashboard/:id' exact component={Dashboard} />        
                <Route component={() => <div>Page 404</div>} />
            </Switch>
        </BrowserRouter>
    )
}

import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from '../chat/Dashboard';
import Admin from '../chat/Admin';

const Routes = (
    <div>
        <Route path="/" exact strict component={Dashboard} /> 
        <Route path="/admin" exact strict component={Admin} />
    </div>
)

export default Routes;
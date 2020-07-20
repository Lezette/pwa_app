import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Account from './components/Account';
import Agents from './components/Agents';
// import Users from './components/Users'

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        {/* <Route path="/users" component={Users} /> */}
        <Route path="/signup" component={Signup} />
        {/* <Route path="/agents" component={Agents} /> */}
        <Route path="/account" component={Account} />
      </Switch>
    </Router>
  </div>
);

export default App;

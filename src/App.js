import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register'
import Login from './components/Login'
import HomePage from './components/HomePage'

const App=() =>{
    return (
        <div>
        <Router>
        <Switch>
        <Route path="/" exact>
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <HomePage/>
        </Route>
      </Switch>
        </Router>
        </div>
    );
}

export default App;
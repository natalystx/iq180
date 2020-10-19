import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Ingame from '../Ingame/Ingame';
import Home from '../Home/Home';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/ingame" component={Ingame} />
        </Switch>
      </Router>
    );
  }
}

export default App;

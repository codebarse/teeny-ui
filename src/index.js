import React from 'react';
import ReactDOM from 'react-dom';
import TeenyUI from './component/TeenyUI';
import TeenyRedirect from './component/TeenyRedirect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <TeenyRedirect />
          </Route>
          <Route path="/about">
            <TeenyUI />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(< App />, document.getElementById('container'));

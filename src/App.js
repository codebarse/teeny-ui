import React from 'react';
import './App.css';
import TeenyUI from './component/TeenyUI';
import TeenyRedirect from './component/TeenyRedirect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/redirect/:id">
            <Redirect/>
          </Route>
          <Route path="/">
            <TeenyUI />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

function Redirect() {
  let { id } = useParams();
  return <TeenyRedirect id={id}/>
}

export default App;

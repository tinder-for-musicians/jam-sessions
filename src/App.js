
import React from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import './App.scss';
import {withRouter} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

function App(props) {
  return (
    <div className="App">
     {props.location.pathname === "/" || props.location.pathname === "/register" ?
        null 
        : (
          <Nav history={props.history}/>
        )}
        {routes}
    </div>
     );
  }

 
export default withRouter(App);


import React, {Component} from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import './App.scss';
import {withRouter} from "react-router-dom";

class App extends Component {
  state = {  }
  
  render() { 
    return ( 
      <div className="App">
        {/* {this.props.location.pathname === "/" ? 
        null:
        (<Nav />)
        }
        {routes} */}
        <Nav/>
        {routes}
    </div>
     );
  }
}
 
export default withRouter(App);


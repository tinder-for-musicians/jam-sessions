import React, { Component } from 'react';
import "./Matches.scss";

class Matches extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="matches-wrapper">
                <div className="mapped-matches">
                    <p>List of mapped matches</p>
                </div>
            </div>
         );
    }
}
 
export default Matches;
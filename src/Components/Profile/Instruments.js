import React, { useState, useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getUser, getProfile, updateInstruments} from '../../redux/reducer';
import "./Profile.scss";
import { Button} from 'semantic-ui-react'



const Instruments = (props) => {
  

    return (
      <Container> 
        <div className="wrap">
	
          <div className="box one">
            <div className="date">
              <h4></h4>
            </div>
            <h1>{props.instrument}</h1>
            <div className="poster p1">
              <h4>{props.years}</h4>
            </div>
          </div>
          <Button color='grey' onClick={() => props.deleteInstrument(props.instrument)}>Delete instrument</Button>

        </div>
      </Container>
    )
  
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, getProfile, updateInstruments})(Instruments);
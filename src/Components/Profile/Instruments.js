import React from 'react';
import { Container } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getUser, getProfile, updateInstruments} from '../../redux/reducer';
import "./Profile.scss";
import { Button, Icon} from 'semantic-ui-react';



const Instruments = (props) => {

    return (
      <Container> 
        <div className="wrap">
	
          <div className="box one">
          <Icon size='big' circular name='x' onClick={() => props.deleteInstrument(props.instrument)}></Icon>
            <div className="date">
              <h3>{props.level}</h3>
            </div>
            <h1>{props.instrument}</h1>
            <div className="poster p1">
              <h4>{props.experience}</h4>
            </div>
          </div>
          

        </div>
      </Container>
    )
  
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, getProfile, updateInstruments})(Instruments);
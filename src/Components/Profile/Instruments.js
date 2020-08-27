import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getUser, getProfile} from '../../redux/reducer';
import "./Profile.scss";
import { Button} from 'semantic-ui-react'


class Instruments extends Component {
  constructor(props){
  super(props)
  this.state= {
    instrumentsState: [],
  }
}


  handleItemClick = (e, { name }) =>  {
  this.setState({ activeItem: name })
  this.mappedInstruments();
}

  mappedInstruments = () => {
    const instrumentsFromStore = this.props.profile.user_instruments;

    const selectedInstruments = instrumentsFromStore.map(((index, key) => {
          return <li key={key}>{index[0]}</li>;
        }
      ))

    return selectedInstruments;
  }



  render() {

    return (
      <Container> 
        <div class="wrap">
	
          <div class="box one">
            <div class="date">
              <h4>Added: 08/26/2020</h4>
            </div>
            <h1>Instrument</h1>
            <div class="poster p1">
              <h4>5</h4>
            </div>
          </div>
          <Button color='grey' onClick={this.props.deleteInstrument()}>Delete instrument</Button>

        </div>
      </Container>
    )
  }
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, getProfile})(Instruments);
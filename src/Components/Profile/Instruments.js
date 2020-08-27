import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getUser, getProfile} from '../../redux/reducer';
import "./Profile.scss";

class Bio extends Component {
  constructor(props){
  super(props)
  this.state= {
    activeItem: '',
    instrumentsState: []
  }
}

componentDidMount() {

}

  handleItemClick = (e, { name }) =>  {
  this.setState({ activeItem: name })
  this.mappedInstruments();
}

  

  handleActiveItem = () => {
    console.log(this.props.user)
    if (this.state.activeItem === 'bio') {
      console.log(this.props.user)
      return <p>{this.props.user.bio}</p>;
    } else if (this.state.activeItem === 'instruments') {
    return <p>{this.mappedInstruments()}</p>;
    } else {
      return ("Nothing works");
    }
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
    const { activeItem } = this.state
    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            {/* <Menu.Item
              name='bio'
              active={activeItem === 'bio'}
              onClick={this.handleItemClick}
            /> */}
            <Menu.Item
              name='instrument'
              active={activeItem === 'instrument'}
              onClick={this.handleItemClick}
            />   
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            {this.handleActiveItem()}
            {/* {this.mappedInstruments()} */}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, getProfile})(Bio);
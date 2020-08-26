import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import "./Profile.scss";

class Bio extends Component {
  constructor(props){
  super(props)
  this.state={
    activeItem: '',
    instruments: []
  }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleActiveItem = () => {
    console.log(this.props.user)
    if (this.state.activeItem === 'bio') {
      console.log(this.props.user)
      return <p>{this.props.user.bio}</p>;
    } else if (this.state.activeItem === 'instrument') {
      return <p>{this.props.user.user_instruments}</p>;
    } else {
      return ("Nothing works");
    }
  }

  // mappedInstruments = () => {
  //   this.state.instruments = this.props.user.user_instruments.map( elem => {
  //     console.log(elem[1])
  //     return elem[1];
      
  //   })
  // }

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
            {/* <Menu.Item
              name='companies'
              active={activeItem === 'companies'}
              onClick={this.handleItemClick}
            /> */}
            {/* <Menu.Item
              name='links'
              active={activeItem === 'links'}
              onClick={this.handleItemClick}
            /> */}
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
export default connect(mapStateToProps, {getUser})(Bio);
import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

class Bio extends Component {
  constructor(props){
  super(props)
  this.state={
    activeItem: ''
  }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    console.log(this.props)
    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name='bio'
              active={activeItem === 'bio'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='instruments'
              active={activeItem === 'instruments'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='companies'
              active={activeItem === 'companies'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='links'
              active={activeItem === 'links'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            {
            activeItem ==='instruments' ?
            this.props.user.instruments
            :
            "this is other element"
            }
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser})(Bio);
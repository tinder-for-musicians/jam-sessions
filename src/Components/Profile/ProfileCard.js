import React  from 'react'
import { Card, Icon } from 'semantic-ui-react'
import {getUser,getProfile} from "../../redux/reducer";
import {connect} from 'react-redux';

// const extra = (
//   <a href="friends">
//     <Icon name='user' />
//     16 Friends

//   </a>
// )

const CardExampleCardProps = (props) => {
  const fullName = `${props.firstName} ${props.lastName}`

  return(
  <Card
    image={props.user.profile_pic}
    header={fullName}
    meta={props.username}
    description={props.profile.bio}
    // extra={extra}
  />
  )
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, getProfile})(CardExampleCardProps);
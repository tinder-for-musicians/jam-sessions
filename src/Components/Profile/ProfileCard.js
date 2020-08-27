import React, {useState}  from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'
import {getUser,getProfile} from "../../redux/reducer";
import {connect} from 'react-redux';

// const extra = (
//   <a href="friends">
//     <Icon name='user' />
//     16 Friends

//   </a>
// )

const CardExampleCardProps = (props) => {

  const [hidden, setHidden] = useState(false)

  const toggleChange = () => {
    setHidden(!hidden)
}

  const fullName = `${props.firstName} ${props.lastName}`

  const editBio = () => {
      return <div>
        <textarea></textarea>
        <Button>Submit</Button>
        </div>
    
  }

  return(
    <div>
      <Card
        image={props.user.profile_pic}
        header={fullName}
        meta={props.profile.username}
        // description={hidden ? (<div></div>) : props.profile.bio}
        
      />
      <Button color='grey' onClick={toggleChange}>Edit bio</Button>
  </div>
  )
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, getProfile})(CardExampleCardProps);
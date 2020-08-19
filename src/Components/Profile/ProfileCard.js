import React  from 'react'
import { Card, Icon } from 'semantic-ui-react'

const extra = (
  <a>
    <Icon name='user' />
    16 Friends

  </a>
)

const CardExampleCardProps = (props) => {
  return(
  <Card
    image={props.imageAsUrl.imageAsUrl}
    header='Elliot Baker'
    meta='Friend'
    description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
    extra={extra}
  />
  )
}

export default CardExampleCardProps;
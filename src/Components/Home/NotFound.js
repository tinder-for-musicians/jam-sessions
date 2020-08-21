import React from "react";
import {Header, Icon, Segment } from 'semantic-ui-react'

const NotFound = () => {

    return (
        <div>
            <Segment placeholder>
            <Header icon>
            <Icon name='dont' />
                This page doesn't exist.
            </Header>
        </Segment>
        </div>
    )
}

export default NotFound;
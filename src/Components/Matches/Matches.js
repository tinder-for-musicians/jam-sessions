import React, { Component } from 'react';
import "./Matches.scss";
import { Grid, Image, Container, Card, Icon, Accordion } from 'semantic-ui-react';
import "../icons/accordion.png";


class Matches extends Component {

    // backend call (axios, index/controller)

    // redux function

    // function for mapping
    constructor(props) {
        super(props);
        this.state = {
            array : [1, 2, 3, 4, 5, 6]
        }
    }
    
    

  
    render() { 
        const mappedMatches = this.state.array.map((index => {
           return <div>
                    <Grid.Column>
                        <Card key={index}>
                            <Image src='https://via.placeholder.com/150' wrapped ui={false} />
                            <Card.Content>
                            <Card.Header>Matthew</Card.Header>
                            <Card.Meta>
                                <span className=''>Proficiency: 5 yrs</span>
                            </Card.Meta>
                            <Card.Description id="matches-name">
                                Matthew is a musician living in Nashville.
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            <a>
                                <Icon name='music' />
                                Instruments
                                <img src={require("../icons/accordion.png")} alt="banjo"/>
                            </a>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
            </div>
        }))
        return ( 
            <div className="matches-wrapper">
                <div className="mapped-matches">
                    <Container>
                        <Grid>
                            <Grid.Row columns={6}>
                            {mappedMatches}
                            </Grid.Row>

                        </Grid>
                    </Container>
                </div>
            </div>
         );
    }
}
 
export default Matches;
import React, { useState, useEffect } from 'react';
import "./Matches.scss";
import { Grid, Image, Container, Card, Icon} from 'semantic-ui-react';
import "../icons/accordion.png";
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUser} from '../../redux/reducer';


const Matches = () => {

    // backend call (axios, index/controller)

    // redux function

    // function for mapping
    const [myMatches, setMyMatches] = useState([]);
    const [mappedMatches, setMappedMatches] = useState([])

    useEffect(() => {
        axios.get('/api/matches')
            .then(res => {
                console.log(res.data);
                setMyMatches(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        setMappedMatches(myMatches.map((match, index) => {
            console.log(match)
                const mappedInstruments = match.user_instruments.map((instrument, index) => {
                    console.log(instrument);
                    return <div key={index}>
                        <ul className='instrument-list'>{instrument[0]}
                            <li>{instrument[1]}</li>
                            <li>{instrument[2]}</li>
                        </ul>
                    </div>
                });
                return <div key={index} className="card-wrapper">
                    <Grid.Column className='card-box'>
                        <Link to={`/chat/${match.chatroom_id}`}><Card >
                            <Image className='match-image' src={match.profile_pic} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{match.username}</Card.Header>
                                <Card.Meta>
                                    <span className=''></span>
                                </Card.Meta>
                                <Card.Description id="matches-name">
                                    {match.bio}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a>
                                    <Icon name='music' />
                                    Instruments
                                    {mappedInstruments}
                                </a>
                            </Card.Content>
                        </Card></Link>
                    </Grid.Column>
                </div>
            }))
    }, [myMatches]);

    //retrieves matches from db to display in state onMount - may need to create Match.js component to render different data in each mapped match component. 

    //on-click deletes match
    // deletePost = () => {
    //     axios.delete(`/api/matches`)
    //     .then(() => {
    //         this.getMatches();
    //     })
    //     .catch(err => console.log(err))
    // }

    //adds match to db user_id foreign key
    // handleClick = (match) => {
    //     console.log(this.props)
    //     axios.post('/api/matches', { id: this.props.user.user_id, match })
    //         .catch(err => console.log(err));
    // };

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

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser})(Matches);
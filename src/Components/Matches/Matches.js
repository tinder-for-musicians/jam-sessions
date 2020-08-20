import React, { Component } from 'react';
import "./Matches.scss";
import { Grid, Image, Container, Card, Icon, Accordion } from 'semantic-ui-react';
import "../icons/accordion.png";
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';


class Matches extends Component {

    // backend call (axios, index/controller)

    // redux function

    // function for mapping
    constructor(props) {
        super(props);
        this.state = {
            array: [1, 2, 3, 4, 5, 6],
        }
    }

    componentDidMount(){
        this.getMatches();
    }

    //retrieves matches from db to display in state onMount - may need to create Match.js component to render different data in each mapped match component. 
    getMatches = () => {
        axios.get(`/api/match${this.props.user.user_id}`)
            .then(res => this.setState({ array: res.data }))
            .catch(err => console.log(err))
    };

    //on-click deletes match
    deletePost = (id) => {
        axios.delete(`/api/match/${id}`)
        .then(() => {
            this.getMatches();
        })
        .catch(err => console.log(err))
    }

    //adds match to db user_id foreign key
    handleClick = (match) => {
        console.log(this.props)
        axios.post('/api/match', { id: this.props.user.user_id, match })
            .catch(err => console.log(err));
    };


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
                                <img src={require("../icons/accordion.png")} alt="banjo" />
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

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser})(Matches);
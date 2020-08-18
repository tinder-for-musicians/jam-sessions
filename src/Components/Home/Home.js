
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Home/Home.scss'
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            search: '',
            loading: false,
        }
    }

    componentDidMount() {
        this.getInstruments()
    }

    getInstruments = () => {
        axios.get('/api/instruments')
            .then(response => {
                this.setState({ data: response.data })
            })
    };

    handleInputChange = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword })
    };

    //on-click adds person to Matches - user_id foreign key
    handleClick = (match_id) => {
        console.log(this.props)
        axios.post('/api/match', { id: this.props.user.user_id, match_id })
    };

    render() {

        // let filteredData = this.state.instruments.filter((data) => {
        //     if(this.state.search == '')
        //         return false
        //     else if(data.toLowerCase().includes(this.state.search.toLowerCase())){
        //         return true
        //     }
        //     else return false
        // }).map((data)=> {
        //     return(
        //         <div>
        //             <span
        //             onClick = {() => {this.handleClick(data);
        //             }}></span>
        //         </div>
        //     )
        // })
        return (
            <div className="container">
                {/*Heading*/}
                <h2 className="heading">Search people to jam with</h2>
                {/*Search Input*/}
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        value=""
                        id="search-input"
                        placeholder="Search people to jam with"
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    <i className="search-icon" />
                </label>
                <section className='results'>
                    {/* {filteredData} */}
                </section>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Home);

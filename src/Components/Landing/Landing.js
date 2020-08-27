//  const Landing =() => {
//     const [username, setUsername] = useState('');
//     const [email, setEmali]=useState('');
//     const [password, setPassword]=useState('');
//     const [verPassword, setVerPassword]=useState('');
//     const [resgisterView, setRegisterView]=useState(false);

//     useState(()=> {

//     })

//     return(
//         <div>

//         </div>
//     )


//  }

import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Radio, Popup} from 'semantic-ui-react'
import { getUser, getProfile } from '../../redux/reducer';
import './Landing.scss';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            verPassword: '',
            toggleLocation: false,
           

        }
    }

    componentDidMount() {
        if (this.props.user.email) {
            this.props.history.push('/dash');
        };
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    handleToggle = () => {
        this.setState({ registerView: !this.state.registerView })
    }

    handleToggleLocation = ()=> {
        this.setState({toggleLocation: !this.state.toggleLocation })
    }
        
    //*enable after coordinates set up*
    // handleLocation = () => {
    //     if(this.state.toggleLocation === true){
    //         axios.put('/api/profile/location')
    //         .then()
    //         .catch(err => console.log(err));
    //     }else{
            
    //     }
    // }

    handleRegister = (e) => {
        e.preventDefault()
        const { first_name, last_name, username, email, password, verPassword } = this.state;
        if (password && password === verPassword) {
            axios.post('/auth/register', { first_name, last_name, username, email, password })
                .then(res => {
                    this.props.getUser(res.data);
                    this.props.history.push('/dash');
                })
                .catch(err => console.log(err))
        } else {
            alert('Passwords do not match');
        }
    }

    handleLogin = (e) => {
        e.preventDefault()
        const { email, password } = this.state;
        axios.post('/auth/login', { email, password })
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push('/dash');
            })
            .catch(err => console.log(err));
    }

    render() {
        return (


            <form className='landing-container'>
                    
                <section className='authentication-info'>
                    <p
                        className='logo'>Jam Sessions
                </p>
                    {this.state.registerView
                        ? (<>
                            <h3>Register Below</h3>
                            <div>Share Location</div><Popup content='JamSessions needs to know your location to work correctly. JamSessions uses your location to provide and improve the location services. This information is not used to identify or contact you.'
                trigger={<Radio toggle
                            // onClick = {this.handleToggleLocation()} 
                            />} />
                            <input
                                value={this.state.first_name}
                                name='first_name'
                                placeholder='First Name'
                                onChange={(e) => this.handleInput(e)} />
                            <input
                                value={this.state.last_name}
                                name='last_name'
                                placeholder='Last Name'
                                onChange={(e) => this.handleInput(e)} />
                            <input
                                value={this.state.username}
                                name='username'
                                placeholder='Username'
                                onChange={(e) => this.handleInput(e)} />
                            
                        </>)
                        : <div />}
                    <input
                        value={this.state.email}
                        name='email'
                        placeholder='Email'
                        onChange={(e) => this.handleInput(e)} />
                    <input
                        type='password'
                        value={this.state.password}
                        name='password'
                        placeholder='Password'
                        onChange={(e) => this.handleInput(e)} />
                    {this.state.registerView
                        ? (<>
                            <input
                                type='password'
                                value={this.state.verPassword}
                                name='verPassword'
                                placeholder='Verify Password'
                                onChange={(e) => this.handleInput(e)} />
                            <button onClick={this.handleRegister}>Register</button>
                            <p>Have an account? <span onClick={this.handleToggle}>Login Here</span></p>
                        </>)
                        : (<>
                            <button onClick={this.handleLogin}>Login</button>
                            <span onClick={this.handleToggle}>Register</span>
                        </>)}
                </section>
            </form>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser, getProfile })(Landing);
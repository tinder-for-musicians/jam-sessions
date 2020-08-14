
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Matches from './Components/Matches/Matches';


export default (
    <Switch>
        <Route exact path ='/' component={Landing} />
        <Route path ='/matches' component={Matches} />
        <Route path ='/profile' component={Profile} />
        <Route path = '/home' component={Home}/>
    </Switch>
)
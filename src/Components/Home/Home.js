import React, {Component} from 'react';
import "./Home.scss";
import Search from "./Search";

class Home extends Component {

    render() { 
        return ( 
            <div className="home-wrapper">
                <div className="home-wrapper2">
                    <div>
                        <Search />
                    </div>
                    <div>
                        <section>
                            Musician Profile
                        </section>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Home;

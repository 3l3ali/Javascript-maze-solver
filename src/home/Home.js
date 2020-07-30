import React from "react";
import { Link } from 'react-router-dom';
import {WOW} from 'wowjs';
import '../css/home.css';
import '../../node_modules/wowjs/css/libs/animate.css'

class Home extends React.Component {
    componentDidMount() {
        new WOW().init();
    }

    render() {
        return(
            <div id="banner" className="pickgradient">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-12 wow fadeInUp" data-wow-delay="0.3s">
                            <h1>The Maze Solver</h1>
                        </div>
                        <div className="col-12 text-center animated rollIn infinite">
                            <Link to={'/maze'}>
                                <div id="start"></div>
                            </Link> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
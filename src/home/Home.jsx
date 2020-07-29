import React from "react";
import '../css/home.css';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    render() {
        return(
            <div id="banner" className="pickgradient">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-12">
                            <h1>The Maze Solver</h1>
                        </div>
                        <div className="col-12 text-center">
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
import React from "react";
import '../css/home.css';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    render() {
        return(
            <>
                <h1>Maze Solver</h1>
                <Link to={'/maze'}>Start</Link> 
            </>
        )
    }
}

export default Home;
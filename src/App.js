import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Maze from './maze/maze';
import Home from './home/Home';

function App() {
    return(
        <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/maze' component={Maze} />
          </Switch>
        </Router>
    )

}
export default App;

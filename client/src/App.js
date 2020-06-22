import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Texteditor from './pages/text-editor/Texteditor';
import Home from './pages/home/Home';
import './css/App.css';
import './css/home-style.css';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/text-editor" component={Texteditor} />
        </Switch>
    </Router>
  );
}

export default App;

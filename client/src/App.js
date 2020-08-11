import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './pages/home/Home';
import User from './pages/user/User';
import Account from './pages/account/Account'
import Texteditor from './pages/text-editor/Texteditor';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/home" component={User} />
            <Route path="/account/:user" component={Account}/>
            <Route path="/text-editor" component={Texteditor} />
        </Switch>
    </Router>
  );
}

export default App;

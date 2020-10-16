import React from 'react';
import {BrowserRouter , Route} from 'react-router-dom';

import Home from './pages/home/Home';
import User from './pages/user/User';
import Account from './pages/account/Account'
import Texteditor from './pages/text-editor/Texteditor';

function App() {
  return (
    <BrowserRouter>
            <Route path="/" component={Home} exact/>
            <Route path="/home" component={User} />
            <Route path="/account/:user" component={Account}/>
            <Route path="/text-editor" component={Texteditor} />
    </BrowserRouter>
  );
}

export default App;

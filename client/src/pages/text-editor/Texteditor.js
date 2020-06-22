import React, {Component} from 'react';
import Header from './../../components/text-editor/Header';
import Document from './../../components/text-editor/Document';

export default class Texteditor extends Component{
    render(){
        return(
            <div className="App">
                <Header />
                <Document />
            </div>
        )
    }
}

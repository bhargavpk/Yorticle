import React, { Component } from 'react'
import FontOptions from './FontOptions'

export default class Navbar extends Component {
    render() {
        return (
            <div id="texteditor-component-navbar">
                <div className="texteditor-component-navele">
                    <FontOptions fontSizeClickEvent={this.props.fontSizeClickEvent} />
                </div>
                <div className="texteditor-component-navele">
                    <button onClick={this.props.saveClickEvent}>Save</button>
                </div>
            </div>
        )
    }
}

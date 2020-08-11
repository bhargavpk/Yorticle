import React, { Component } from 'react'
import FontOptions from './FontOptions'

export default class Navbar extends Component {
    getNavBtn = () => {
        if(this.props.readWrite === true)
            return(
                <div className="texteditor-component-navele">
                    <button id="publish-btn"
                    onClick={this.props.saveClickEvent}>Publish</button>
                    <button id="save-btn"
                    onClick={this.props.saveClickEvent}>Save</button>
                </div>
            )
        return(
            <div></div>
        )
    }
    render() {
        return (
            <div id="texteditor-component-navbar">
                <div className="texteditor-component-navele">
                    <FontOptions fontSizeClickEvent={this.props.fontSizeClickEvent} />
                </div>
                {this.getNavBtn()}
            </div>
        )
    }
}

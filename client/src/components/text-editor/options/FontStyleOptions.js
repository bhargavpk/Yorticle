import React, { Component } from 'react'

export default class FontStyleOptions extends Component {
    render() {
        return (
            <ul className="dropdown-content">
                <li className="dropdown-option" title="fontFamily" onClick={this.props.fontSizeClickEvent}>Arial</li>
                <li className="dropdown-option" title="fontFamily" onClick={this.props.fontSizeClickEvent}>Georgia</li>
                <li className="dropdown-option" title="fontFamily" onClick={this.props.fontSizeClickEvent}>monospace</li>
                <li className="dropdown-option" title="fontFamily" onClick={this.props.fontSizeClickEvent}>Times</li>
                <li className="dropdown-option" title="fontFamily" onClick={this.props.fontSizeClickEvent}>Verdana</li>
                <li className="dropdown-option" title="fontFamily" onClick={this.props.fontSizeClickEvent}>Candara</li>
            </ul>
        )
    }
}
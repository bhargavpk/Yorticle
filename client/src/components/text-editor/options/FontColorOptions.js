import React, { Component } from 'react'

export default class FontColorOptions extends Component {
    render() {
        return (
            <ul className="dropdown-content">
                <li className="dropdown-option" title="color" onClick={this.props.fontSizeClickEvent}>white</li>
                <li className="dropdown-option" title="color" onClick={this.props.fontSizeClickEvent}>gray</li>
                <li className="dropdown-option" title="color" onClick={this.props.fontSizeClickEvent}>orange</li>
                <li className="dropdown-option" title="color" onClick={this.props.fontSizeClickEvent}>pink</li>
                <li className="dropdown-option" title="color" onClick={this.props.fontSizeClickEvent}>yellow</li>
            </ul>
        )
    }
}

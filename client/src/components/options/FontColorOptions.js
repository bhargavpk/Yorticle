import React, { Component } from 'react'

export default class FontColorOptions extends Component {
    render() {
        return (
            <ul className="dropdown-content">
                <li className="dropdown-option" title="color" onClick={this.props.fontSizeClickEvent}>white</li>
                <li className="dropdown-option" title="color" onClick={this.props.fontSizeClickEvent}>black</li>
                <li className="dropdown-option" title="color" onClick={this.props.fontSizeClickEvent}>orange</li>
            </ul>
        )
    }
}

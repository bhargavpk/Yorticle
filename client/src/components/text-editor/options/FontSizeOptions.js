import React, { Component } from 'react'

export default class FontSizeOptions extends Component {
    render() {
        return (
            <ul className="dropdown-content">
                <li className="dropdown-option" title="fontSize" onClick={this.props.fontSizeClickEvent}>1em</li>
                <li className="dropdown-option" title="fontSize" onClick={this.props.fontSizeClickEvent}>1.5em</li>
                <li className="dropdown-option" title="fontSize" onClick={this.props.fontSizeClickEvent}>2em</li>
            </ul>
        )
    }
}

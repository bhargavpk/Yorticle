import React, { Component } from 'react'

export default class FontSizeOptions extends Component {
    render() {
        return (
            <ul className="dropdown-content">
                <li className="dropdown-option" title="fontSize" onClick={this.props.fontSizeClickEvent}>1rem</li>
                <li className="dropdown-option" title="fontSize" onClick={this.props.fontSizeClickEvent}>1.25rem</li>
                <li className="dropdown-option" title="fontSize" onClick={this.props.fontSizeClickEvent}>1.5rem</li>
                <li className="dropdown-option" title="fontSize" onClick={this.props.fontSizeClickEvent}>1.75rem</li>
                <li className="dropdown-option" title="fontSize" onClick={this.props.fontSizeClickEvent}>2rem</li>
            </ul>
        )
    }
}

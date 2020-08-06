import React, { Component } from 'react'

export default class HomeheaderInfo extends Component {
    render() {
        return (
            <div id="home-subheader-info">
                <div id="subheader-text">Write, suggest and publish!</div>
                <div id="account-nav">
        <div className="account-nav-ele"><span>{this.props.spanMessage}</span> {this.props.options[0]}</div>
        <div className="account-nav-ele">{this.props.options[1]}</div>
                </div>
            </div>
        )
    }
}

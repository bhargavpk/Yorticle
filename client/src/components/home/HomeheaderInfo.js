import React, { Component } from 'react'

export default class HomeheaderInfo extends Component {
    render() {
        return (
            <div id="home-subheader-info">
                <div id="subheader-text">Write, suggest and publish!</div>
                <div id="account-nav">
                    <div className="account-nav-ele"><span>Have an account?</span> Login</div>
                    <div className="account-nav-ele">Sign up</div>
                </div>
            </div>
        )
    }
}

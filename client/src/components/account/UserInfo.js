import React, { Component } from 'react'

export default class UserInfo extends Component {
    render() {
        return (
            <div id="userinfo-par">
            <div id="userinfo-box">
                <div className="userinfo-field"><span>First name: </span>{this.props.user.firstName}</div>
                <div className="userinfo-field"><span>Last name: </span>{this.props.user.lastName}</div>
                <div className="userinfo-field"><span>Username: </span>{this.props.user.userName}</div>
                <div className="userinfo-field"><span>Articles published: </span>{this.props.user.publishCount}</div>
            </div>
            </div>
        )
    }
}

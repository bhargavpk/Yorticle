import React, { Component } from 'react'
import Cookies from 'universal-cookie'

export default class HomeheaderInfo extends Component {

    firstDivClickEvent = e => {
        if(this.props.page !== 'home')
            window.location.href = '/account/'+(new Cookies()).get('username')
    }

    secondDivClickEvent = e => {
        if(this.props.page !== 'home')
        {
            fetch('http://localhost:9000/logout',{
                method:'PATCH',
                headers:{
                    'Authorization':'Bearer '+(new Cookies()).get('authToken')
                }
            }).then(res => res.json())
            .then(data => {
                (new Cookies()).remove('authToken')
                window.location.replace('/')
            })
        }
    }

    render() {
        if(this.props.page !== 'account')
            return (
                <div id="home-subheader-info">
                    <div id="subheader-text">Write, suggest and publish!</div>
                    <div id="account-nav">
                        <div className="account-nav-ele" onClick={this.firstDivClickEvent}>
                            <span>{this.props.spanMessage}</span> {this.props.options[0]}
                        </div>
                        <div className="account-nav-ele" onClick={this.secondDivClickEvent}>
                            {this.props.options[1]}
                        </div>
                    </div>
                </div>
            )
        else
            return(
                <div id="home-subheader-info">
                    <div id="subheader-text">Write, suggest and publish!</div>
                </div>
            )
    }
}

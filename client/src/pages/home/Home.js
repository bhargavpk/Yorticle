import React, { Component } from 'react'
import Homeheader from '../../components/home/Homeheader'
import HomeheaderInfo from '../../components/home/HomeheaderInfo'
import LoginForm from '../../components/home/LoginForm'
import SignupForm from '../../components/home/SignupForm'

export default class Home extends Component {
    render() {
        return (
            <div style = {{minHeight:'100vh'}}>
                <Homeheader />
                <HomeheaderInfo />
                <div id="home-body">
                    <LoginForm />
                    <SignupForm />
                </div>
            </div>
        )
    }
}

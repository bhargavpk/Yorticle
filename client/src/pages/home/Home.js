import React, { Component } from 'react'
import Homeheader from '../../components/home/Homeheader'
import HomeheaderInfo from '../../components/home/HomeheaderInfo'
import LoginForm from '../../components/home/LoginForm'
import SignupForm from '../../components/home/SignupForm'

import '../../css/home-style.css'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.options = ['Login', 'Sign up']
        this.spanMessage = 'Have an account?'
    }

    render() {
        return (
            <div id="home-component" style = {{minHeight:'100vh'}}>
                <Homeheader />
                <HomeheaderInfo options={this.options} spanMessage={this.spanMessage}
                page={'home'}/>
                <div id="home-body">
                    <LoginForm />
                    <SignupForm />
                </div>
            </div>
        )
    }
}

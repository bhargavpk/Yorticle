import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';

export default class LoginForm extends Component {

    constructor(props){
        super(props);
        this.errFormRef = React.createRef();
        this.buttonRef = React.createRef();
        this.state = {
            userAuth: false
        }
    }

    formButtonOnClick = async e => {
        e.preventDefault();
        //Form button disabled

        this.buttonRef.current.setAttribute('disabled','');

        const formInputElements = Array.from(e.target.elements);
        const bodyObj = {};
        formInputElements.forEach(node => {
            bodyObj[node.name] = node.value
            node.setAttribute('disabled','disabled')
        })
        
        const res = await fetch('/login',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(bodyObj)
        })
        const data = await res.json();
        if(data.error)
        {
            formInputElements.forEach(node => node.removeAttribute('disabled'))
            this.errFormRef.current.innerHTML = data.error;
            setTimeout(() => {
                this.errFormRef.current.innerHTML = '';
            }, 2000);
        }
        else
        {
            const {token,user:{userName}} = data;
            const jwtCookie1 = new Cookies();
            const jwtCookie2 = new Cookies();
            jwtCookie1.set('authToken',token,{path: '/'})
            jwtCookie2.set('username',userName,{path:'/'})
            this.setState({
                userAuth: true
            })
            // window.location.replace('/home')
            //Add expiration to 5 days
        }
    }
    render() {
        if(this.state.userAuth === true)
        {
            return <Redirect to='/home' />
        }
        return (
            <div className="form-component" id="login-form">
                <form onSubmit = {this.formButtonOnClick}>
                    <div className="form-field">
                        <input type="text" name="userName" placeholder="Username"/>
                    </div>
                    <div className="form-field">
                        <input type="password" name="password" placeholder="Password"/>
                    </div>
                    <div className = "form-err-message" ref = {this.errFormRef}></div>
                    <button type="submit" ref = {this.buttonRef}>Login</button>
                </form> 
            </div>
        )
    }
}

import React, { Component } from 'react';
import Cookies from 'universal-cookie';

export default class LoginForm extends Component {

    constructor(props){
        super(props);
        this.errFormRef = React.createRef();
        this.buttonRef = React.createRef();
    }

    formButtonOnClick = async e => {
        e.preventDefault();
        //Form button disabled

        this.buttonRef.current.setAttribute('disabled','');

        const formInputElements = Array.from(e.target.elements);
        const bodyObj = {};
        formInputElements.forEach(node => {
            bodyObj[node.name] = node.value
        })
        
        const res = await fetch('http://localhost:9000/login',{
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
            this.errFormRef.current.innerHTML = data.error;
            setTimeout(() => {
                this.errFormRef.current.innerHTML = '';
            }, 2000);
        }
        else
        {
            const {token} = data;
            const jwtCookie = new Cookies();
            jwtCookie.set('authToken',token,{path: '/'})
            //Add expiration to 5 days
        }
        this.buttonRef.current.removeAttribute('disabled')
    }
    render() {
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

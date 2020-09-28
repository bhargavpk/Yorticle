import React, { Component } from 'react';
import Cookies from 'universal-cookie';

export default class SignupForm extends Component {

    constructor(props){
        super(props);
        this.errFormRef = React.createRef();
        this.buttonRef = React.createRef();
    }

    formButtonOnClick = async e => {
        e.preventDefault();

        const formInputElements = Array.from(e.target.elements);
        const bodyObj = {};
        formInputElements.forEach(node => {
            bodyObj[node.name] = node.value
            node.setAttribute('disabled','disabled')
        })

        const res = await fetch('/signup',{
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
            formInputElements.forEach(node => {
                node.removeAttribute('disabled')
            })
            const errObj = data.error;
            if(!errObj.errors)
            {
                this.errFormRef.current.innerHTML = 'Username has been taken!';
                setTimeout(() => {
                    this.errFormRef.current.innerHTML = '';
                }, 2000);   
            }
            else
            {
                var errMessage,err;
                for(err in errObj.errors)
                {
                    errMessage = errObj.errors[err].properties.message;
                    break;
                }
                this.errFormRef.current.innerHTML = errMessage;
                setTimeout(() => {
                    this.errFormRef.current.innerHTML = ''
                }, 2000);
            }
        }
        else
        {
            const {token,user:{userName}} = data;
            const jwtCookie1 = new Cookies();
            const jwtCookie2 = new Cookies();
            jwtCookie1.set('authToken',token,{path: '/'});
            jwtCookie2.set('username',userName,{path:'/'});
            window.location.replace('/home')
            //Add expiration in 5 days
        }
    }

    render() {
        
        return (
            <div className="form-component show-form" id="signup-form">
                <form ref = {this.formRef} onSubmit = {this.formButtonOnClick}>
                    <div className="form-field">
                        <input type="text" name="firstName" placeholder="First name"/>
                    </div>
                    <div className="form-field">
                        <input type="text" name="lastName" placeholder="Last name"/>
                    </div>
                    <div className="form-field">
                        <input type="text" name="userName" placeholder="Username"/>
                    </div>
                    <div className="form-field">
                        <input type="password" name="password" placeholder="Password"/>
                    </div>
                    <div className="form-err-message" ref = {this.errFormRef}></div>
                    <button type="submit" ref = {this.buttonRef}>Signup</button>
                </form> 
            </div>
        )
    }
}

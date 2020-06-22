import React, { Component } from 'react'

export default class SignupForm extends Component {
    render() {
        return (
            <div className="form-component show-form" id="signup-form">
                <form>
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
                    <button type="submit">Signup</button>
                </form> 
            </div>
        )
    }
}

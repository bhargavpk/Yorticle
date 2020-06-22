import React, { Component } from 'react'

export default class LoginForm extends Component {
    render() {
        return (
            <div className="form-component" id="login-form">
                <form>
                    <div className="form-field">
                        <input type="text" name="userName" placeholder="Username"/>
                    </div>
                    <div className="form-field">
                        <input type="password" name="password" placeholder="Password"/>
                    </div>
                    <button type="submit">Login</button>
                </form> 
            </div>
        )
    }
}

import React, { Component } from "react";
import { APIManager } from '../../utils';

class Account extends Component {
    constructor() {
        super();
        this.state = {
            profile: {
                username: '',
                password: ''
            }
        }
    }
    
    updateProfile(event) {
        event.preventDefault();
        
        let updatedProfile = Object.assign({}, this.state.profile);
        updatedProfile[event.target.id] = event.target.value;

        this.setState({
            profile: updatedProfile
        })
    }
    
    login(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state.profile));
        if (this.state.profile.username.length == 0) {
            alert('Please enter a username');
            return;
        }
        if (this.state.profile.password.length == 0) {
            alert('Please enter a password');
            return;
        }

        APIManager.post('/account/login', this.state.profile, (err, response) => {
            if (err) {
                alert(err.message);
                return
            }
            
            console.log("SUCCESS: LOGGED IN " +
                        JSON.stringify(response));
                        
        });
    }

    signup(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state.profile));
        if (this.state.profile.username.length == 0) {
            alert('Please enter a username');
            return;
        }
        if (this.state.profile.password.length == 0) {
            alert('Please enter a password');
            return;
        }

        APIManager.post('/account/profile', this.state.profile, (err, response) => {
            if (err) {
                console.log("ERROR: " + err.message, null);
                return
            }
            
            const result = response.result;
            
            console.log("SUCCESS: PROFILE CREATED " +
                        JSON.stringify(result));
                        
        });
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <input id="username" 
                    onChange={this.updateProfile.bind(this)} 
                    placeholder="username"
                    type="text" /><br />
                <input id="password" 
                    onChange={this.updateProfile.bind(this)} 
                    type="password" /><br />
                <button onClick={this.login.bind(this)}>Login</button>
                <h2>Sign Up</h2>
                <input id="username" 
                    onChange={this.updateProfile.bind(this)} 
                    placeholder="username"
                    type="text" /><br />
                <input id="password" 
                    onChange={this.updateProfile.bind(this)} 
                    type="password" /><br />
                <button onClick={this.signup.bind(this)}>Register</button>
            </div>
        );
    }
}

export default Account;

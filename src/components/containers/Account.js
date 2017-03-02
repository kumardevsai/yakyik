import React, { Component } from "react";
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Link } from 'react-router';

class Account extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                username: '',
                password: ''
            }
        }
    }
    
    // check if current user is logged in
    // and start tracking logged in user in redux
    componentDidMount() {
        APIManager.get('/account/currentuser', null, (err, response) => {
            if (err) {
                alert(err);
                return
            }
            const user = response.user;
            this.props.currentUserReceived(user);
            //console.log(this.props.user);
        })
    }

    updateUser(event) {
        event.preventDefault();
        
        let updatedUser = Object.assign({}, this.state.user);
        updatedUser[event.target.id] = event.target.value;

        this.setState({
            user: updatedUser
        })
    }
    
    login(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state.user));
        if (this.state.user.username.length == 0) {
            alert('Please enter a username');
            return;
        }
        if (this.state.user.password.length == 0) {
            alert('Please enter a password');
            return;
        }

        APIManager.post('/account/login', this.state.user, (err, response) => {
            if (err) {
                alert(err.message);
                return
            }
            
            console.log("SUCCESS: LOGGED IN " +
                        JSON.stringify(response));
            const user = response.user;
            this.props.currentUserReceived(user);
                        
        });
    }

    signup(event) {
        event.preventDefault();
        //console.log(JSON.stringify(this.state.user));
        if (this.state.user.username.length == 0) {
            alert('Please enter a username');
            return;
        }
        if (this.state.user.password.length == 0) {
            alert('Please enter a password');
            return;
        }

        APIManager.post('/account/user', this.state.user, (err, response) => {
            if (err) {
                console.log("ERROR: " + err.message, null);
                return
            }
            
            const user = response.user;
            
            console.log("SUCCESS: USER CREATED " +
                        JSON.stringify(user));
            this.props.currentUserReceived(user);            
        });
    }

    logout(event) {
        event.preventDefault();
        console.log('logout');

        APIManager.get('/account/logout', null, (err, response) => {
            if (err) {
                alert(err.message);
                return;
            }
            this.props.currentUserReceived(null);
            console.log(JSON.stringify(response));
        })
    }

    render() {
        let out;
        if (this.props.user == null) {
            out = <div>
                <h2>Login</h2>
                <input id="username" 
                    onChange={this.updateUser.bind(this)} 
                    placeholder="username"
                    type="text" /><br />
                <input id="password" 
                    onChange={this.updateUser.bind(this)} 
                    type="password"
                    placeholder="password" /><br />
                <button onClick={this.login.bind(this)}>Login</button>
                <h2>Sign Up</h2>
                <input id="username" 
                    onChange={this.updateUser.bind(this)} 
                    placeholder="username"
                    type="text" /><br />
                <input id="password" 
                    onChange={this.updateUser.bind(this)} 
                    type="password"
                    placeholder="password" /><br />
                <input id="gender" 
                    onChange={this.updateUser.bind(this)} 
                    type="text"
                    placeholder="gender" /><br />
                <input id="city" 
                    onChange={this.updateUser.bind(this)} 
                    type="text"
                    placeholder="city" /><br />
                <button onClick={this.signup.bind(this)}>Register</button>
            </div>
        } else {
            out = <div>
                    <h1>Welcome {this.props.user.username}</h1>
                    <button onClick={this.logout.bind(this)}>Logout</button>
                    <Link to={"/account/" + this.props.user.username}>
                        <button>Manage Profile</button>
                    </Link>
                </div>
        }
        return (
            out
        );
    }
}

const stateToProps = (state) => {
    return {
        user: state.account.user
    }
}

const dispatchToProps = (dispatch) => {
    return {
        currentUserReceived: (user) => dispatch(actions.currentUserReceived(user)),
    }
}

export default connect(stateToProps, dispatchToProps)(Account);

import React, { Component } from 'react';
import { connect } from 'react-redux';

class CurrentUser extends Component {
    
    constructor() {
        super()

        this.state = {
            updated: {}
        }
    }

    updateCurrentUser(event) {
        event.preventDefault();
        let updated = Object.assign({}, this.state.updated);

        updated[event.target.id] = event.target.value; 
        
        this.setState({
            updated: updated
        })
        
    }

    updateProfile(event) {
        event.preventDefault();

        console.log('UpdateProfile: ' + JSON.stringify(this.state.updated));
    }

    render() {
        const currentUser = this.props.user;

        return (
            <div>
                <h1>{ "Howdy " + currentUser.username }</h1>
                City: <input 
                    type="text" 
                    id ="city" 
                    placeholder={currentUser.city} 
                    defaultValue={currentUser.city}
                    onChange={this.updateCurrentUser.bind(this)}/>
                <br />
                City: <input 
                    type="text" 
                    id ="gender" 
                    placeholder={currentUser.gender} 
                    defaultValue={currentUser.gender}
                    onChange={this.updateCurrentUser.bind(this)}/>
                <br />
                <button type="submit" onClick={this.updateProfile.bind(this)}>Submit</button>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        user: state.account.user
    }
}

export default connect(stateToProps)(CurrentUser);
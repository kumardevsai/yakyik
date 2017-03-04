import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class CurrentUser extends Component {
    
    constructor() {
        super()

        this.state = {
            updatedUser: {}
        }
    }

    updateUserState(event) {
        event.preventDefault();
        let updated = Object.assign({}, this.state.updatedUser);

        updated[event.target.id] = event.target.value; 
        
        this.setState({
            updatedUser: updated
        })
        
    }

    updateUserRedux(event) {
        event.preventDefault();

        if (Object.keys(this.state.updatedUser).length == 0) {
            alert('No Changes Made!!');
            return;
        }

        this.props.updateUser(this.props.user._id, this.state.updatedUser);
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
                    onChange={this.updateUserState.bind(this)}/>
                <br />
                City: <input 
                    type="text" 
                    id ="gender" 
                    placeholder={currentUser.gender} 
                    defaultValue={currentUser.gender}
                    onChange={this.updateUserState.bind(this)}/>
                <br />
                <button type="submit" onClick={this.updateUserRedux.bind(this)}>Submit</button>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        user: state.account.user
    }
}

const dispatchToProps = (dispatch) => {
    return {
        updateUser: (id, updatedUser) => dispatch(actions.updateUser(id, updatedUser))
    }
}

export default connect(stateToProps, dispatchToProps)(CurrentUser);
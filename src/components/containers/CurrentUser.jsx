import React, { Component } from 'react';
import { connect } from 'react-redux';

class CurrentUser extends Component {
    

    handleClick(event) {
        event.preventDefault()

        alert("Ouch!!")
    }

    render() {
        const currentUser = this.props.user;

        return (
            <div>
                <h1>{ "Howdy " + currentUser.username }</h1>
                City: <input type="text" id ="city" placeholder={currentUser.city} />
                <br />
                City: <input type="text" id ="gender" placeholder={currentUser.gender} />
                <br />
                <button type="submit" onClick={this.handleClick}>Submit</button>
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
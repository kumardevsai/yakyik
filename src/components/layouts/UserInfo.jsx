import React, { Component } from 'react';
import UserComments from '../containers/UserComments';
import APIManager from '../../utils/APIManager';

// accessed by react-router so has this.props.params
class UserInfo extends Component {
    
    //componentDidMount() {
    //    console.log('componentDidMount: '+ this.props.username)
        //APIManager.find('../api/user')
    //}
    
    render() {
        return (
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <h1>{this.props.params.username + "'s Comments"}</h1>
                    <UserComments username={this.props.params.username}/>
                </div>
                <div className="col-sm-3"></div>
            </div>
        )
    }
}

export default UserInfo; 
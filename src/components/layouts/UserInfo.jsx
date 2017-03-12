import React, { Component } from 'react';
import UserProfile from '../containers/UserProfile';

// accessed by react-router so has this.props.params
const UserInfo = (props) => {
    
    
    return (
        <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
               <h1>{props.params.username + "'s Comments"}</h1>
                  <UserProfile username={props.params.username}/>
               </div>
            <div className="col-sm-3"></div>
        </div>
    )
}

export default UserInfo; 
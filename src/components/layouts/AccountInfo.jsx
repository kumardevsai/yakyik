import React, { Component } from 'react';

// accessed by react-router so has this.props.params
class AccountInfo extends Component {
    
    render() {
        return (
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <h1>"Howdy"</h1>
                </div>
                <div className="col-sm-3"></div>
            </div>
        )
    }
}

export default AccountInfo; 
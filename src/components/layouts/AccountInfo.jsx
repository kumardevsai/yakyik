import React, { Component } from 'react';
import { connect } from 'react-redux';
import CurrentUser from '../containers/CurrentUser';

// accessed by react-router so has this.props.params
class AccountInfo extends Component {
    
    render() {

        return (
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <CurrentUser />
                </div>
                <div className="col-sm-3"></div>
            </div>
        )
    }
}

export default AccountInfo;
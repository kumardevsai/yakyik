import React, { Component } from 'react';
import Comment from '../presentations/Comment';
import APIManager from '../../utils/APIManager';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class UserProfile extends Component {
    
    constructor() {
        super()
        
        this.state = {
            // all comment from by selected user
            commentList: [],
            user: null
        }
    }

    componentDidMount() {
        
        const params = { username: this.props.username };

        APIManager.get('/api/comment', params, (err, response) => {
            if (err) {
                console.log('ERROR COMMENTS FIND: ' + err.message);
                return
            }

            let comments = response.results;
            //console.log('LOAD_COMMENTS: ' + JSON.stringify(comments));
            this.setState({
                commentList: comments
            })
        })

        // this will only call the API if the user has not yet been loaded
        //console.log('usersMap: ', this.props.usersMap);
        if (this.props.usersMap[this.props.username]) {
            this.setState({
                    user: this.props.usersMap[this.props.username]
            })
        } else {
            // gets all user infor for username == this.props.username
            APIManager.get('/api/user', params, (err, response) => {
                if (err) {
                    console.log('ERROR COMMENTS FIND: ' + err.message);
                    return;   
                }
                //console.log('LOAD_USER: ' + JSON.stringify(response));
                if (response.results.length == 0) {
                    alert('User not found');
                    return;
                }
                
                const user = response.results[0];
                
                // add the user to the this.props.usersMap
                this.props.userReceived(user);
                this.setState({
                    user: user
                })
            })
        }
    }

    render() {
        const user = this.state.user;
        const commentList = this.state.commentList.map((x) => {
            return (
                <li key={ x._id } style={{listStyle: 'none'}}>
                    <Comment commentPropsObj={ x }  />
                </li>
            );
        })
        console.log('usersMap2: ', this.props.usersMap);
        const userView = (user == null ? null : 
                <div className="row">
                    <div className="col-xs-12">
                        <h3>{"Username: " + user.username}</h3>
                        <p>{"Gender: " + user.gender}</p>
                        <p>{"City: " + user.city}</p>
                    </div>
                </div>)

        return (
            <div>
                {userView}
                <div style={{padding:12, 
                             background:'#f9f9f9', 
                             border:'1px solid #ddd'}}
                     className="clearfix">
                    <br />
                    <ul>
                        { commentList }
                    </ul>
                </div>
            </div>
        );
    }
}

const stateToProps = (state) => {
    return {
        usersMap: state.user.usersMap
    }
}

const dispatchToProps = (dispatch) => {
    return {
        userReceived: (user) => dispatch(actions.userReceived(user)),
    }
}

export default connect(stateToProps, dispatchToProps)(UserProfile);
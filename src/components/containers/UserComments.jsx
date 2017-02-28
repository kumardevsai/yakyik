import React, { Component } from 'react';
import Comment from '../presentations/Comment';
import APIManager from '../../utils/APIManager';

class UserComments extends Component {
    
    constructor() {
        super()
        
        this.state = {
            // all comment from by selected user
            commentList: [],
            user: null
        }
    }

    componentDidMount() {
        
        const params = {username: this.props.username };

        console.log(JSON.stringify(params));

        APIManager.get('/api/comment', params, (err, response) => {
            if (err) {
                console.log('ERROR COMMENTS FIND: ' + err.message);
                return
            }

            let comments = response.results;
            console.log('LOAD_COMMENTS: ' + JSON.stringify(comments));
            this.setState({
                commentList: comments
            })
        })

        APIManager.get('/api/user', params, (err, response) => {
            if (err) {
                console.log('ERROR COMMENTS FIND: ' + err.message);
                return;   
            }

            if (response.result.length == 0) {
                alert('User not found');
                return;
            }

            const user = response.results[0];
            //console.log('LOAD_USER: ' + JSON.stringify(user));
            this.setState({
                user: user
            })
        })
    }

    render() {
        
        const commentList = this.state.commentList.map((x) => {
            return (
                <li key={ x._id } style={{listStyle: 'none'}}>
                    <Comment commentPropsObj={ x }  />
                </li>
            );
        })
        
        return (
            <div>
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

export default UserComments;
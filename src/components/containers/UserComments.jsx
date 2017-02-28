import React, { Component } from 'react';
import Comment from '../presentations/Comment';
import APIManager from '../../utils/APIManager';
import CommentHeader from '../presentations/CommentHeader';

class UserComments extends Component {
    
    constructor() {
        super()
        
        this.state = {
            // all comment from by selected user
            commentList: [],
        }
    }

    componentDidMount() {
        
        const params = {username: this.props.username };

        APIManager.get('../api/comment', params, (err, response) => {
            if (err) {
                console.log('ERROR COMMENTS FIND: ' + err.message);
                return
            }

            let comments = response.results;

            this.setState({
                commentList: comments
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
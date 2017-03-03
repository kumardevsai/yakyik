import React, { Component } from 'react';
import Comment from '../presentations/Comment';
import CommentHeader from '../presentations/CommentHeader';
import CommentCreate from '../presentations/CommentCreate';
import { APIManager } from '../../utils';
import { connect } from 'react-redux';

class Comments extends Component {
    
    constructor() {
        super()
        
        this.state = {
            // comments only from selected zone
            // keep track of this here so we don't need to make
            // excessive API calls
            commentList: [],
            // all the comments
            commentsAll: {}
        }
    }

    componentDidMount() {
        APIManager.get('api/comment', null, (err, response) => {
            if (err) {
                console.log('ERROR COMMENTS FIND: ' + err.message);
                return
            }

            let comments = response.results;

            this.setState({
                commentList: comments,
                commentsAll: comments
            })
        })
    }

    // adds the current `comment` object to the `commentList` array
    submitHandler(comment) {
        // add current zone to comment
        comment.zone = this.props.selectedZone; 
        comment.username = this.props.user.username;
        
        // save comment to mongo
        APIManager.post('/api/comment', comment, (err, response) => {
            if (err) {
                console.log("ERROR: " + err.message, null);
                return
            }
            
            const comment = response.result;            
            // set the state
            // result has been processed by the API, so the default
            // timestamp has been added to the object
            let updatedCommentsAll = Object.assign([], this.state.commentsAll);
            let updatedCommentList = Object.assign([], this.state.commentList);
            updatedCommentsAll.push(comment);
            updatedCommentList.push(comment);
            this.setState({
                commentsAll: updatedCommentsAll,
                commentList: updatedCommentList
            });
        });
    }

    deleteHandler(id) {
        event.preventDefault();
        
        APIManager.delete('/api/comment/' + id, (err, response) => {
            if (err) {
                console.log("ERROR: " + err.message, null);
                return
            }

            let updatedCommentsAll = Object.assign([], this.state.commentsAll);            
            let updatedCommentList = Object.assign([], this.state.commentList);
            updatedCommentList = updatedCommentList.filter(function(obj) {
                return obj._id !== response.id;
            });
            updatedCommentsAll = updatedCommentsAll.filter(function(obj) {
                return obj._id !== response.id;
            });
            
            this.setState({
                commentList: updatedCommentList,
                commentsAll: updatedCommentsAll
            });
        });
    }

    componentDidUpdate(prevProps) {
        const selZ = this.props.selectedZone;
        if (selZ == null) return;
        
        if (prevProps.selectedZone != selZ) { 
            
            
            let updatedCommentList = Object.assign([], this.state.commentList);
            updatedCommentList = this.state.commentsAll.filter((obj) => {
                return obj.zone == selZ;
            });

            this.setState({
                commentList: updatedCommentList
            })
            
        }
    }

    render() {
        
        const selZ = this.props.zoneList.filter(obj => {
            return obj._id == this.props.selectedZone;
        })[0];
        const zoneName = (selZ==null) ? '' : selZ.name;
        const commentList = this.state.commentList.map((x) => {
            return (
                <li key={ x._id } style={{listStyle: 'none'}}>
                    <Comment commentPropsObj={ x } 
                             deleteHandler={this.deleteHandler.bind(this, x._id)} />
                </li>
            );
        })
        
        return (
            <div>
                <CommentHeader zoneName={zoneName} />
                
                <div style={{padding:12, 
                             background:'#f9f9f9', 
                             border:'1px solid #ddd'}}
                     className="clearfix">
                    <CommentCreate onCreate={this.submitHandler.bind(this)}/>
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
        selectedZone: state.zone.selectedZone,
        zoneList: state.zone.zoneList,
        user: state.account.user
    }
}

export default connect(stateToProps)(Comments);
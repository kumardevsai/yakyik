import React, { Component } from 'react';
import Comment from '../presentations/Comment';
import CommentHeader from '../presentations/CommentHeader';
import CommentCreate from '../presentations/CommentCreate';
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import store from '../../redux/store'

class Comments extends Component {
    
    constructor() {
        super()
        
        this.state = {
            commentList: []
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
                commentList: comments
            });
        })
    }
    
    // only show comments specific to selected zone
    zoneComments() {
        selectedZone = this.props.selectedZone
        
        let updatedCommentList = Object.assign([], this.state.commentList);
        
        if (selectedZone) {
            updatedCommentList = updatedCommentList.filter((obj) => {
                return obj.zone == selectedZone;
            })
        }
        
        this.setState({
            commentList: updatedCommentList
        })
    }

    // adds the current `comment` object to the `commentList` array
    submitHandler(comment) {
        // add current zone to comment
        
        comment.zone = this.props.selectedZone; 
        console.log(comment);
        // save comment to mongo
        APIManager.post('/api/comment', comment, (err, response) => {
            if (err) {
                console.log("ERROR: " + err.message, null);
                return
            }
            
            const result = response.result;
            
            //console.log("SUCCESS: COMMENT CREATED " +
            //            JSON.stringify(result));
                        
            // set the state
            // result has been processed by the API, so the default
            // timestamp has been added to the object
            let updatedCommentList = Object.assign([], this.state.commentList);
            updatedCommentList.unshift(result);
            this.setState({
                //commentList: this.state.commentList.concat(result)
                commentList: updatedCommentList
            });
        });
    }
    
    deleteHandler(id) {
        event.preventDefault();
        
        APIManager.delete('/api/delete/' + id, (err, response) => {
            if (err) {
                console.log("ERROR: " + err.message, null);
                return
            }
                        
            let updatedCommentList = Object.assign([], this.state.commentList);
            updatedCommentList = updatedCommentList.filter(function(obj) {
                return obj._id !== response.id;
            })
            
            this.setState({
                commentList: updatedCommentList
            });
        });
    }

    render() {

        const selZ = this.props.zoneList[this.props.selectedZone];
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
        zoneList: state.zone.zoneList
    }
}

export default connect(stateToProps)(Comments);
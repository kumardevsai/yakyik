import React, { Component } from 'react';
import Comment from '../presentations/Comment';
import CommentHeader from '../presentations/CommentHeader';
import CommentAdd from '../presentations/CommentAdd';
import { APIManager } from '../../utils';

class Comments extends Component {
    
    constructor() {
        super()
        
        this.state = {
            comment: {
                body: '',
                username: 'Katie'
            },
            
            commentList: []
        }
    }
    
    componentDidMount() {
        
        APIManager.get('api/comment', null, (err, response) => {
            if (err) {
                console.log('ERROR COMMENTS FIND: ' + err.message);
                return
            }
                
            this.setState({
                commentList: response.results
            });
        })
    }
    
    // update `body` of current `comment`
    updateBodyHandler(event) {
        let updatedComment = Object.assign({}, this.state.comment);
        updatedComment['body'] = event.target.value;
        
        this.setState({
            comment: updatedComment 
        });
    }
    
    // adds the current `comment` object to the `commentList` array
    submitHandler(event) {
        event.preventDefault();
        
        // save comment to mongo
        APIManager.post('/api/comment', this.state.comment, (err, response) => {
            if (err) {
                console.log("ERROR: " + err.message, null);
                return
            }
            
            const result = response.result;
            
            console.log("SUCCESS: COMMENT CREATED " +
                        JSON.stringify(result));
                        
            // set the state
            // result has been processed by the API, so the default
            // timestamp has been added to the object
            let updatedCommentList = Object.assign([], this.state.commentList);
            // this is probably causing keys of li to be messed up
            updatedCommentList.unshift(result);
            this.setState({
                //commentList: this.state.commentList.concat(result)
                commentList
            });
        });
    }
    
    deleteHandler(event) {
        event.preventDefault();
        
        // need to generalize to use comment _id
        //const index = indexOf()
        //if (index > -1) {
        //    this.setState({
        //        commentList: commentList.splice(index, 1)
        //    });    
        //}
        
        
        superagent
            .delete('/api/comment/588e72d29d964c3b6366da79')
            .end((err, res) => {
                if (err) {
                   alert('ERROR: COMMENT DELETE ' + err);
                   return
               } 
               console.log('SUCCESS: COMMENT DELETE');
            })
       
    }
    
    render() {
        
        const commentList = this.state.commentList.map((x, i) => {
            return (
                <li key={i} style={{listStyle: 'none'}}>
                    <Comment commentPropsObj={ x } 
                             deleteHandler={this.deleteHandler.bind(this)} />
                </li>
            );
        })
        
        return (
            <div>
                <CommentHeader zoneName={this.props.currentZone} />
                
                <div style={{padding:12, 
                             background:'#f9f9f9', 
                             border:'1px solid #ddd'}}
                     className="clearfix">
                    <CommentAdd submitHandler={this.submitHandler.bind(this)}
                                updateBodyHandler={this.updateBodyHandler.bind(this)}/>
                    <br />
                    <ul>
                        { commentList }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Comments;
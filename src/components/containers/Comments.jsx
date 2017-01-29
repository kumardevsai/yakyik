import React, { Component } from 'react';
import Comment from '../presentations/Comment';
import CommentHeader from '../presentations/CommentHeader';
import CommentAdd from '../presentations/CommentAdd';
import superagent from 'superagent';

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
        
        superagent
            .get('/api/comment')
            .query(null)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) {
                    alert('ERROR: ' + err);
                    return
                }
                
                let results = response.body.results;
                
                this.setState({
                    commentList: results
                })
                
            });
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
        
        let newComment = this.state.comment;
        newComment.timestamp = new Date();
        
        this.setState({
            commentList: this.state.commentList.concat(newComment)
        });
        
        // save comment to mongo
        superagent
            .post('/api/comment')
            .send(newComment)
            .set('Accept', 'application/json')
            .end((err, res) => {
               if (err) {
                   alert('ERROR: COMMENT POST ' + err);
                   return
               } 
               console.log('SUCCESS: COMMENT POST');
            });
    }
    
    render() {
        
        const commentList = this.state.commentList.map((x, i) => {
            return (
                <li key={i} style={{listStyle: 'none'}}>
                    <Comment commentPropsObj={ x } />
                </li>
            );
        })
        
        return (
            <div>
                <CommentHeader zoneName={this.props.currentZone} />
                
                <div style={{padding:12, 
                             background:'#f9f9f9', 
                             border:'1px solid #ddd'}}>
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
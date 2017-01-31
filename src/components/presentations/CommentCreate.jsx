import React, { Component } from 'react';

class CommentCreate extends Component {
    constructor() {
        super()

        this.state = {
            comment: {
                body: '',
                username: 'Katie'
            }
        }
    }

    // update `body` of current `comment`
    updateBodyHandler(event) {
        let updatedComment = Object.assign({}, this.state.comment);
        updatedComment['body'] = event.target.value;
        
        this.setState({
            comment: updatedComment 
        });
    }

    submitHandler(event) {
        event.preventDefault();
        // pass state back up to Comments container class
        this.props.onCreate(this.state.comment);
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label>New Comment</label>
                    <textarea type="text"
                        id="newComment" 
                        placeholder="comment" 
                        className="form-control"
                        rows="3"
                        onChange={ this.updateBodyHandler.bind(this) } >
                    </textarea>
                </div>
                <button type="submit" 
                        className="btn btn-primary"
                        onClick={ this.submitHandler.bind(this) }>
                        Submit Comment
                </button>
            </form>
        );
    }    
}

export default CommentCreate;
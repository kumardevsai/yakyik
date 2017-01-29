import React from 'react';

const CommentAdd = (props) => {
    
    return (
        <form>
            <div className="form-group">
                <label>New Comment</label>
                <textarea type="text"
                    id="newComment" 
                    placeholder="comment" 
                    className="form-control"
                    rows="3"
                    onChange={ props.updateBodyHandler } >
                </textarea>
            </div>
            <button type="submit" 
                    className="btn btn-primary"
                    onClick={ props.submitHandler }>
                    Submit Comment
            </button>
        </form>
    );    
    
}

export default CommentAdd;
import React from 'react';

const Comment = (props) => {
    return (
        <div>
            <p style={{fontSize: 18, fontWeight: 500}}>
                {props.commentPropsObj.body}
            </p>
            <p style={{color: '#808080', fontWeight:200}}>
                {props.commentPropsObj.username} | {props.commentPropsObj.timestamp}
            </p>
            <hr />            
        </div>
    );
}

export default Comment;
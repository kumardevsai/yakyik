import React from 'react';

const Comment = (props) => {
    
    let timestamp = props.commentPropsObj.timestamp;
    if (typeof timestamp == 'string') {
        timestamp = new Date(timestamp);
    }
    
    return (
        <div>
            <p style={{fontSize: 18, fontWeight: 500}}>
                {props.commentPropsObj.body}
            </p>
            <p style={{color: '#808080', fontWeight:200}}>
                {props.commentPropsObj.username} | { timestamp.toDateString() }
            </p>
            <hr />            
        </div>
    );
}

export default Comment;
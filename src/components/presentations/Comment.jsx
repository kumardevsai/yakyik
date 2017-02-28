import React from 'react';
import { Link } from 'react-router';

const Comment = (props) => {
    
    let timestamp = props.commentPropsObj.timestamp;
    if (typeof timestamp == 'string') {
        timestamp = new Date(timestamp);
    }
    
    return (
        <div>
            <div className="row">
                <div className="col-xs-10">
                    <p style={{fontSize: 18, fontWeight: 500}}>
                        {props.commentPropsObj.body}
                    </p>
                    <p style={{color: '#808080', fontWeight:200}}>
                        <Link to={"/user/" + props.commentPropsObj.username}>
                            {props.commentPropsObj.username}
                        </Link> | 
                        { timestamp.toDateString() }
                    </p>
                </div>
                <div className="col-xs-2">
                    <button type="submit"
                            className="btn btn-danger" 
                            onClick={props.deleteHandler}>
                            X
                    </ button>
                </div>
            </div>
            <div className="row">
                <hr />
            </div>            
        </div>
    );
}

export default Comment;
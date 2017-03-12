import React, { Component } from 'react';
import { Link } from 'react-router';

class Comment extends Component {
    
    constructor() {
        super()
        
        this.state = {
            isEditing: false,
            commentUpdated: {
                body: ''
            }
        }
    }

    toggleEditView(event) {
        event.preventDefault();
        console.log('Edit View');

        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    onUpdate(event) {
        event.preventDefault();

        let commentUpdated = Object.assign({}, this.state.commentUpdated);
        commentUpdated.body = event.target.value;
        this.setState({
            commentUpdated: commentUpdated
        })
    }

    submitCommentEdit(event) {
        event.preventDefault();
        
        this.toggleEditView(event);

        const commentUpdated = this.state.commentUpdated;
        
        // do not make update if no change occurred
        if (commentUpdated.body == '') return;

        this.props.editHandler(commentUpdated);
    }

    render() {
        let timestamp = this.props.commentPropsObj.timestamp;
        if (typeof timestamp == 'string') {
            timestamp = new Date(timestamp);
        }
        const author = this.props.commentPropsObj.author;
        const body = this.props.commentPropsObj.body;
        const editable = this.props.editable;

        let output = '';
        if (this.state.isEditing) {
            output = <div>
                <div className="row">
                    <div className="col-xs-10">
                        <textarea
                            style={{width: 100+'%'}} 
                            defaultValue = {body}
                            onChange = {this.onUpdate.bind(this)}>
                        </textarea>
                        <p style={{color: '#808080', fontWeight:200}}>
                            <img style={{borderRadius:20, marginRight:6}} src={author.image.replace('upload','upload/c_thumb,h_40,w_40,x_0,y_0')} />
                            <Link to={"/user/" + author.username}>
                                {author.username}
                            </Link> | 
                            { timestamp.toDateString() }
                        </p>
                    </div>
                    <div className="col-xs-2">
                        <button type="submit"
                                className="btn btn-default" 
                                onClick={this.submitCommentEdit.bind(this)}>
                                Done
                        </ button>
                        <button type="submit"
                                className="btn btn-danger" 
                                onClick={this.props.deleteHandler}>
                                X
                        </ button>
                    </div>
                </div>
                <div className="row">
                    <hr />
                </div>            
            </div>
        } else {
            output = <div>
                <div className="row">
                    <div className="col-xs-10">
                        <p style={{fontSize: 18, fontWeight: 500}}>
                            {body}
                        </p>
                        <p style={{color: '#808080', fontWeight:200}}>
                            <img style={{borderRadius:20, marginRight:6}} src={author.image.replace('upload','upload/c_thumb,h_40,w_40,x_0,y_0')} />
                            <Link to={"/user/" + author.username}>
                                {author.username}
                            </Link> | 
                            { timestamp.toDateString() }
                        </p>
                    </div>
                    <div className="col-xs-2">
                        { (editable) ? 
                            <div className="col-xs-12">
                                <button type="submit"
                                        className="btn btn-default" 
                                        onClick={this.toggleEditView.bind(this)}>
                                        Edit
                                </ button>
                                <button type="submit"
                                    className="btn btn-danger" 
                                    onClick={this.props.deleteHandler}>
                                    X
                                </ button>
                            </div> :
                            null
                        }
                        
                    </div>
                </div>
                <div className="row">
                    <hr />
                </div>            
            </div>
        }

        return output;
    }
}

export default Comment;
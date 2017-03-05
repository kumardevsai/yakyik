import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Dropzone from 'react-dropzone';
import APIManager from '../../utils/APIManager';
import sha1 from 'sha1';
import { API_KEY, API_SECRET, cloudName, uploadPreset } from '../../../.env';

class CurrentUser extends Component {
    
    constructor() {
        super()

        this.state = {
            updatedUser: {}
        }
    }

    updateUserState(event) {
        event.preventDefault();
        let updated = Object.assign({}, this.state.updatedUser);

        updated[event.target.id] = event.target.value; 
        
        this.setState({
            updatedUser: updated
        })
    }

    updateUserRedux(event) {
        event.preventDefault();

        if (Object.keys(this.state.updatedUser).length == 0) {
            alert('No Changes Made!!');
            return;
        }

        this.props.updateUser(this.props.user._id, this.state.updatedUser);
    }

    // @param files array of files 
    uploadImage(files) {
        const image = files[0];
        
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

        const timestamp = Date.now() / 1000;
        
        let signature = `timestamp=${timestamp}&upload_preset=${uploadPreset}${API_SECRET}`
        signature = sha1(signature);

        const params = {
            'api_key': API_KEY,
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature  
        }

        APIManager.upload(url, image, params, (err, response) => {
            if (err) {
                console.log('UPLOAD ERROR: ' + JSON.stringify(err))
                return
            }

            const imageUrl = response.body['secure_url'];
            let updatedUser = Object.assign({}, this.state.updatedUser);
            updatedUser['image'] = imageUrl;

            this.setState({
                updatedUser: updatedUser
            })
        });
    }

    render() {
        const currentUser = this.props.user;
        let image = this.state.updatedUser.image
        image = (image == null) ? '' : image.replace('upload','upload/c_thumb,h_150,w_150,x_0,y_0');

        return (
            <div>
                <h1>{ "Howdy " + currentUser.username }</h1>
                <input 
                    type="text" 
                    id ="city" 
                    placeholder={currentUser.city} 
                    defaultValue={currentUser.city}
                    onChange={this.updateUserState.bind(this)}/>
                <br />
                <input 
                    type="text" 
                    id ="gender" 
                    placeholder={currentUser.gender} 
                    defaultValue={currentUser.gender}
                    onChange={this.updateUserState.bind(this)}/>
                <br />
                <img src={image} /><br />
                <Dropzone onDrop={this.uploadImage.bind(this)}/>
                <button type="submit" onClick={this.updateUserRedux.bind(this)}>Submit</button>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        user: state.account.user
    }
}

const dispatchToProps = (dispatch) => {
    return {
        updateUser: (id, updatedUser) => dispatch(actions.updateUser(id, updatedUser))
    }
}

export default connect(stateToProps, dispatchToProps)(CurrentUser);
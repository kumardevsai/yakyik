import React, {Component} from 'react';

class ZoneCreate extends Component {
    constructor() {
        super()

        this.state = {
            zone: {
                name: '',
                zipCodes: ''
            }
        }
    }
    
    // handles updates for both zone.name and zone.zipCodes
    updateZoneHandler(event) {
        let updatedZone = Object.assign({}, this.state.zone);
        updatedZone[event.target.id] = event.target.value;
        
        this.setState({
            zone: updatedZone
        });
    }

    submitHandler(event) {
        event.preventDefault();

        let newZone = Object.assign({}, this.state.zone);
        // zips is a string of zip codes
        let zips = newZone.zipCodes;
        let zipsArray = zips.split(',');
        
        // trim possible white space around the zip codes
        let newZips = [];
        zipsArray.forEach(function(zipCode) {
            newZips.push(zipCode.trim());
        });
        
        newZone.zipCodes = newZips;

        this.props.updateZoneList(newZone);
    }

    render() {
        return (
            <form>
                <div className='form-group'>
                    <label>Zone Name</label>
                    <input type="text"
                           id="name" 
                           placeholder="Zone Name"
                           className="form-control"
                           onChange={this.updateZoneHandler.bind(this)} />
                </div>
                <div className='form-group'>
                    <label>Zip Code</label>
                    <input type="text"
                           id="zipCodes" 
                           placeholder="Zone Name"
                           className="form-control"
                           onChange={this.updateZoneHandler.bind(this)} />
                </div>
                <button type="submit" 
                    className="btn btn-primary"
                    onClick={this.submitHandler.bind(this)}>
                    Add Zone
                </button>
            
            </form>
        );
    }
};

export default ZoneCreate;
import React from 'react';

const ZoneAdd = (props) => {
    return (
        <form>
            <div className='form-group'>
                <label>Zone Name</label>
                <input type="text"
                       id="name" 
                       placeholder="Zone Name"
                       className="form-control"
                       onChange={props.updateZoneHandler} />
            </div>
            <div className='form-group'>
                <label>Zip Code</label>
                <input type="text"
                       id="zipCodes" 
                       placeholder="Zone Name"
                       className="form-control"
                       onChange={props.updateZoneHandler} />
            </div>
                <button type="submit" 
                    className="btn btn-primary"
                    onClick={props.submitHandler}>
                    Add Zone
                </button>
            
        </form>
    );
};

export default ZoneAdd;
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './components/layouts/Home';

// this is gateway to views/index.hjs
// it should be as simple as possible
class App extends Component {
    render() {
        return (
            <div>
                <Home />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
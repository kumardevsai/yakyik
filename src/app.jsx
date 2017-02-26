import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './components/layouts/Home';
import { Provider } from 'react-redux';
import store from './redux/store';

// this is gateway to views/index.hjs
// it should be as simple as possible
class App extends Component {
    render() {
        return (
            <Provider store={ store.configureStore() }>
                <div>
                    <Home />
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './components/layouts/Home';
import UserInfo from './components/layouts/UserInfo';
import AccountInfo from './components/layouts/AccountInfo';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// this is gateway to views/index.hjs
// it should be as simple as possible
const app = (
    <Provider store={ store.configureStore() }>
        <Router history={browserHistory}>
            <Route path='/' component={Home}></Route>
            <Route path='/user/:username' component={UserInfo}></Route>
            <Route path='/account/:username' component={AccountInfo}></Route>
        </Router>
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));
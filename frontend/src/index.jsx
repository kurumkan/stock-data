import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import ReduxThunk from 'redux-thunk';
import io from 'socket.io-client';


// App css
require('style!css!sass!applicationStyles');

import RootReducer from 'reducers/RootReducer';

import Main from 'components/Main';
import IndexPage from 'components/IndexPage';
import NotFound404 from 'components/NotFound404';
import {addCodeRemoteOrigin, setNewCodes, setError} from 'actions/Actions';

//var socket = io(`${location.protocol}//${location.hostname}:process.env.PORT||8080`);
var socket = io();

import RemoteActionMiddleware from './middlewares/RemoteActionMiddleware';

var createStoreWithMiddleware = applyMiddleware(ReduxThunk, RemoteActionMiddleware(socket))(createStore);
var store = createStoreWithMiddleware(RootReducer);

socket.on('set_new_codes', codes =>
	store.dispatch(setNewCodes(codes))
);

socket.on('spread_new_code', code =>
	store.dispatch(addCodeRemoteOrigin(code))
);

socket.on('set_error', error =>
	store.dispatch(setError(error))
);

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={IndexPage} />				
			 	<Route path='404' component={NotFound404} />
				<Route path='*' component={NotFound404} />
			</Route>
		</Router>				
	</Provider>
  , document.querySelector('#app'));

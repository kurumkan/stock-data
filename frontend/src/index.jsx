import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import ReduxThunk from 'redux-thunk';
import io from 'socket.io-client';

//adding styles
require('style!css!nvd3css');
require('style!css!sass!applicationStyles');

import RootReducer from 'reducers/RootReducer';

import Main from 'components/Main';
import IndexPage from 'components/IndexPage';
import NotFound404 from 'components/NotFound404';
import {addStockRemoteOrigin, setNewStocks, removeStock, setError} from 'actions/Actions';

//connect to backend
var socket = io('http://localhost:8080');
//custom middleware - ineraction with backend via socket.io
import RemoteActionMiddleware from './middlewares/RemoteActionMiddleware';

var createStoreWithMiddleware = applyMiddleware(ReduxThunk, RemoteActionMiddleware(socket))(createStore);
var store = createStoreWithMiddleware(RootReducer);


//called on connect
socket.on('set_new_stocks', stocks =>
	store.dispatch(setNewStocks(stocks))
);

//called when some of the clients adds a valid stock code
socket.on('spread_new_stock', stock =>
	store.dispatch(addStockRemoteOrigin(stock))
);

//called when some of the clients removes stock code
socket.on('remove_stock', stock =>
	store.dispatch(removeStock(stock))
);

//called in error case
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

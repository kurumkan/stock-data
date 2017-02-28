import {expect} from 'chai';
import sinon from 'sinon';

import configureStore from 'redux-mock-store';

import RemoteActionMiddleware from '../../frontend/src/middlewares/RemoteActionMiddleware';

var socket = {};
const mockStore = configureStore([RemoteActionMiddleware(socket)]);


describe('middlewares', ()=>{
	it('should skip actions with random types', ()=>{
		var action = {
			type: 'RANDOM_TYPE'
		};		
		socket.emit = sinon.spy();
		var store = mockStore({});
		store.dispatch(action);		
		sinon.assert.notCalled(socket.emit);                  
	})
	it('SEND_STOCK_REMOTE', ()=>{
		var action = {
			type: 'SEND_STOCK_REMOTE'
		};		
		socket.emit = sinon.spy();
		var store = mockStore({});
		store.dispatch(action);		
		sinon.assert.calledOnce(socket.emit);      
		sinon.assert.calledWith(socket.emit, 'add_stock');            
	})

	it('REMOVE_STOCK', ()=>{
		var action = {
			type: 'REMOVE_STOCK'
		};		
		socket.emit = sinon.spy();
		var store = mockStore({});
		store.dispatch(action);		
		sinon.assert.calledOnce(socket.emit);      
		sinon.assert.calledWith(socket.emit, 'remove_stock');            
	})
});
import { expect } from '../test_helper';
import stockDataReducer from '../../frontend/src/reducers/StockDataReducer';

describe('StockDataReducer', ()=> {	
	var state;

	beforeEach(() => {
		state = [{code: 'f', name: 'F'}, {code: 'm', name: 'M'}];	
	});


	it('handles actions with unknown types', ()=>{			
		var action = {type: 'RANDOM_TYPE', payload: null};
		expect(stockDataReducer(state, action)).to.equal(state);
	});

	it('ADD_STOCK_REMOTE', ()=>{
		var action = {type: 'ADD_STOCK_REMOTE', payload: {code:'ge', name:'GE'}};
		expect(stockDataReducer(state, action)).to.eql([...state, action.payload]);
	});

	it('SET_NEW_STOCKS', ()=>{
		var action = {type: 'SET_NEW_STOCKS', payload: [{code:'ge', name:'GE'}]};
		expect(stockDataReducer(state, action)).to.eql(action.payload);
	});

	it('REMOVE_STOCK', ()=>{
		var action = {type: 'REMOVE_STOCK', payload: 'm'};
		expect(stockDataReducer(state, action)).to.eql([state[0]]);
	});
	
	it('REMOVE_STOCK_REMOTE', ()=>{
		var action = {type: 'REMOVE_STOCK_REMOTE', payload: 'm'};
		expect(stockDataReducer(state, action)).to.eql([state[0]]);
	});
	
})

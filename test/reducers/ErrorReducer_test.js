import { expect } from '../test_helper';
import errorReducer from '../../frontend/src/reducers/ErrorReducer';

describe('ErrorReducer', ()=> {	
	var state;

	beforeEach(() => {
		state = 'error message text';	
	});


	it('handles actions with unknown types', ()=>{			
		var action = {type: 'RANDOM_TYPE', payload: null};
		expect(errorReducer(state, action)).to.equal(state);
	});

	it('SET_ERROR', ()=>{
		var action = {type: 'SET_ERROR', payload: 'new error'};
		expect(errorReducer(state, action)).to.eql('new error');
	});

	it('REMOVE_ERROR', ()=>{
		var action = {type: 'REMOVE_ERROR'};
		expect(errorReducer(state, action)).to.eql('');
	});
})

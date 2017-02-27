import { expect } from '../test_helper';
import * as actions from '../../frontend/src/actions/Actions';

import sinon from 'sinon';


describe('Actions', ()=> {
	it('addStockRemote', ()=>{			
		var {addStockRemote} = actions;		
		var stock = {code:'GE'};
		var res = addStockRemote(stock);

		expect(res.type).to.equal('ADD_STOCK_REMOTE');		
		
		expect(res.payload).to.equal(stock);		
	});

	it('addStockRemote', ()=>{			
		var {addStockRemote} = actions;		
		var stock = {code:'GE'};
		var clone=Object.assign({}, stock);
		var res = addStockRemote(stock);	

		expect(res.type).to.equal('ADD_STOCK_REMOTE');						
		expect(res.payload.code).to.eql(clone.code);
		expect(typeof res.payload.color).to.eql('string');
	});

	it('setNewStocks', ()=>{			
		var {setNewStocks} = actions;		
		var stocks = [
			{code: 'NKE'},
			{code: 'GE'},
			{code: 'F'}
		];
		var res = setNewStocks(stocks);

		expect(res.type).to.equal('SET_NEW_STOCKS');		
		var newStocks = res.payload;
		for(var i=0; i<newStocks.length; i++){
			expect(newStocks[i].code).to.eql(stocks[i].code);
			expect(typeof newStocks[i].color).to.eql('string');
		}
	});

	it('removeStock', ()=>{			
		var {removeStock} = actions;				
		var code = 'ge';
		var res = removeStock(code);

		expect(res.type).to.equal('REMOVE_STOCK');				
		expect(res.payload).to.equal(code);		
	});

	it('removeStockRemote', ()=>{			
		var {removeStockRemote} = actions;				
		var code = 'ge';
		var res = removeStockRemote(code);

		expect(res.type).to.equal('REMOVE_STOCK_REMOTE');				
		expect(res.payload).to.equal(code);		
	});

	it('sendStockRemote', ()=>{			
		var {sendStockRemote} = actions;				
		var code = 'ge';
		var res = sendStockRemote(code);

		expect(res.type).to.equal('SEND_STOCK_REMOTE');				
		expect(res.payload).to.equal(code);		
	});

	it('setError', ()=>{			
		var {setError} = actions;				
		var error = 'ge';
		var res = setError(error);

		expect(res.type).to.equal('SET_ERROR');				
		expect(res.payload).to.equal(error);		
	});

	it('removeError', ()=>{			
		var {removeError} = actions;						
		var res = removeError();

		expect(res.type).to.equal('REMOVE_ERROR');						
	});
});


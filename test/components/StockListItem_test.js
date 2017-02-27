import { renderPlainComponent , expect } from '../test_helper';
import sinon from 'sinon';
import {StockListItem} from 'components/StockListItem';

describe('StockListItem', ()=>{  
  it('has correct class, render all provided data', ()=>{
	var component;   
	var stock = {name: 'NKE', code:'nke', data: [10,20,30]};	
	var removeStock = function(){};
	component = renderPlainComponent(StockListItem, {removeStock, stock}); 
	expect(component).to.have.class('stock-list-item');
	expect(component.find('h4').html()).to.eql(stock.code);
	expect(component.find('p').html()).to.eql(stock.name);
  });

  it('call removeStock on click', ()=>{
	var component;   
	var stock = {name: 'NKE', code:'nke', data: [10,20,30]};	
	var removeStock = sinon.spy();
	component = renderPlainComponent(StockListItem, {removeStock, stock}); 
	component.find('button').simulate('click');
	sinon.assert.calledOnce(removeStock);      
  });
});
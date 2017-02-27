import { renderComponent , expect } from '../test_helper';
import sinon from 'sinon';
import {StockList} from 'components/StockList';

describe('StockList', ()=>{
  var component;   

  beforeEach(() => {     
    var stocks = [
      {name: 'nke', code: 'nke', 'data': [1,2,3]},
      {name: 'ge', code: 'ge', 'data': [4,5]}
    ];    
    component = renderComponent(StockList, {stocks});         
  });

  it('has a correct class', ()=>{
    expect(component).to.have.class('stock-list');    
  });  

  it('should display all the provided spots', ()=>{    
    expect(component.find('.stock-list-item').length).to.equal(2);
  });

  it('should render an empty div', ()=>{        
    component = renderComponent(StockList, {stocks: []});         
    expect(component.html()).to.equal('');        
  });
});


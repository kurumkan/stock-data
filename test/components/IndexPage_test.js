import { renderComponent, expect } from '../test_helper';
import sinon from 'sinon';
import IndexPage from 'components/IndexPage';

describe('IndexPage', ()=>{
  var component;  

  beforeEach(() => {        
    component = renderComponent(IndexPage, {}, {error: 'error message'});         
  });

  it('render Chart, SearchBar, StockList', ()=>{      
    expect(component.find('.chart').length).to.eql(1);
    expect(component.find('.searchbar').length).to.eql(1);      
    expect(component.find('.alert').length).to.eql(1);      
  });

});


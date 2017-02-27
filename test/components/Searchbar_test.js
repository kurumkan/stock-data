import { renderComponent, expect } from '../test_helper';
import sinon from 'sinon';
import {Searchbar} from 'components/Searchbar';

describe('Searchbar', ()=>{
  var component;  
  var sendStockRemote = function(){}; 

  beforeEach(() => {        
    component = renderComponent(Searchbar, {sendStockRemote}, {});         
  });

  it('has a correct class', ()=>{
    expect(component).to.have.class('searchbar');
    expect(component.find('input')).to.exist;
    expect(component.find('button')).to.exist;
  });

  describe('enter some text',()=>{    
    var value='NKE';
    beforeEach(()=>{
      component.find('input').simulate('change', value);
    });

    it('shows text that is entered', ()=>{      
      expect(component.find('input')).to.have.value(value); 
    });

    it('when submitted, clear the input', ()=>{
      var sendStockRemote = function(){};            
      component.find('form').simulate('submit');           
      expect(component.find('input')).to.have.value('');               
    });

    it('when submitted, clear the input', ()=>{      
      component.find('form').simulate('submit');           
      expect(component.find('input')).to.have.value('');               
    });

    it('when submitted non empty form, call getSpots', ()=>{
      var sendStockRemote = sinon.spy();
      var component = renderComponent(Searchbar, {sendStockRemote},{});             
      component.find('input').simulate('change', value);                  
      component.find('form').simulate('submit');           
      sinon.assert.calledOnce(sendStockRemote);                  
    });

    it('when submitted empty form, should NOT call getSpots', ()=>{
      var sendStockRemote = sinon.spy();
      var component = renderComponent(Searchbar, {sendStockRemote},{});             
      component.find('input').simulate('change', '');                  
      component.find('form').simulate('submit');           
      sinon.assert.notCalled(sendStockRemote);                  
    });

    it('display alert if error set', ()=>{      
      var error='error message'
      var component = renderComponent(Searchbar, {},{error});                                
      expect(component.find('.alert').length).not.to.eql(0);
    });
  });  
});


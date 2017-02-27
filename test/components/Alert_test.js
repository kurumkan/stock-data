import { renderPlainComponent, expect } from '../test_helper';
import sinon from 'sinon';
import {Alert} from 'components/Alert';

describe('Alert', ()=>{
  var component;   
  var errorMessage='error message content';
  var removeError=function(){};

  beforeEach(() => {        
    component = renderPlainComponent(Alert, {errorMessage, removeError});
  });

  it('render error', ()=>{
    expect(component).to.have.class('alert');
    expect(component).to.contain(errorMessage);
  });    

  it('does not render error', ()=>{
    component = renderPlainComponent(Alert, {null, removeError});
    expect(component).not.to.have.class('alert');
    expect(component).not.to.contain(errorMessage);
  });    

  it('calls removeError', ()=>{
    var removeError = sinon.spy();
    component = renderPlainComponent(Alert, {errorMessage, removeError});
    
    expect(component).to.contain(errorMessage);
    component.find('.close').simulate('click');        
    sinon.assert.calledOnce(removeError);                              
  });    
  
});


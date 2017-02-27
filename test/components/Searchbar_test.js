import { renderPlainComponent , expect } from '../test_helper';
import sinon from 'sinon';
import {Searchbar} from 'components/Searchbar';

describe('Searchbar', ()=>{
  var component;   

  beforeEach(() => {        
    component = renderPlainComponent(Searchbar, {term: 'london', sort:0});         
  });

  it('has a correct class', ()=>{
      expect(component).to.have.class('searchbar');
  });
    
  it('has a text input and button', ()=>{
      expect(component.find('input')).to.exist;
      expect(component.find('button')).to.exist;
  });

  
});


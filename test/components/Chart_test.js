import { renderPlainComponent, expect } from '../test_helper';
import sinon from 'sinon';
import {Chart} from 'components/Chart';

describe('Chart', ()=>{
  var component;   
  var stocks = [
    {code:'NKE', name: 'nke', data: [['2015-01-30', '100'],['2015-01-31', '200']]},
    {code:'GE', name: 'ge', data: [['2015-01-30', '10'],['2015-01-31', '20']]}
  ];

  beforeEach(() => {        
    component = renderPlainComponent(Chart, {stocks}, {});
  });

  it('renders svg chart', ()=>{
    expect(component.find('.chart').length).to.eql(1);
    expect(component.find('svg').length).to.eql(1);
  });    
});


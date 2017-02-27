import { renderComponent, expect } from '../test_helper';
import sinon from 'sinon';
import Main from 'components/Main';
import NotFound404 from 'components/NotFound404';

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

describe('Main', ()=>{
  var component;   

  beforeEach(() => {      
  	const renderer = ReactTestUtils.createRenderer();
	renderer.render(<NotFound404 />);
    var childrenComponent= renderer.getRenderOutput();

    component = renderComponent(Main, {children: childrenComponent}, {});         
  });

  it('should children elements, Footer ', ()=>{      
    expect(component.find('.footer').length).to.eql(1);
    expect(component.find('.notfound404').length).to.eql(1);      
  });
});


import { renderComponent , expect } from '../test_helper';
import NotFound404 from 'components/NotFound404';

describe('NotFound404' , () => {
	var component;	

	beforeEach(() => {		
		component = renderComponent(NotFound404);		
	});

	it('has a correct class', () => {
		expect(component).to.have.class('notfound404');
	});
});

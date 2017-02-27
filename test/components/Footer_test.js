import { renderComponent , expect } from '../test_helper';
import Footer from 'components/Footer';

describe('Footer' , () => {

	var component;

	beforeEach(() => {		
		component = renderComponent(Footer);		
	});

	it('has a correct class', () => {
		expect(component).to.have.class('footer');
	});
});

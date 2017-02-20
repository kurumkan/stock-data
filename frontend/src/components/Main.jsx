import React, { Component } from 'react';
import Footer from 'components/Footer';

export default class Main extends Component{
	render() {		
		return (
			<div className='container-fluid main'>
				<div className='row content-wrapper'>					
					{this.props.children}						
				</div>	
				<Footer />
			</div>	
		);	
	}
}



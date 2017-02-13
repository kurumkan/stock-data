import React, { Component } from 'react';

export default class Main extends Component{
	render() {		
		return (
			<div className='container-fluid main'>
				<Nav/>	
				<div className='row'>
					<div className='container-fluid content'>
						{this.props.children}	
					</div>	
				</div>	
				<Footer/>
			</div>	
		);	
	}
}



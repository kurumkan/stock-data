import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chart extends Component{	
	render() {				
		var {stocks} = this.props;			
		return (
			<div className='row chart'>				
				Chart Placeholder
			</div>	
		);	
	}
}


function mapStateToProps(state) {
	var {stocks} = state;
	return {
		stocks		
	};
}

export default connect(mapStateToProps, null)(Chart);
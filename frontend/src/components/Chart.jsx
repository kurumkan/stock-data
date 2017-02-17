import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chart extends Component{	
	render() {				
		var {stocks} = this.props;		
		var renderStocks = stocks.map((stock,i)=><li key={i}>{stock}</li>)				
		return (
			<div className='row chart'>				
				<ul>
					{renderStocks}
				</ul>
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
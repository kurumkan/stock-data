import React, { Component } from 'react';
import { connect } from 'react-redux';
import StockListItem from 'components/StockListItem';

export class StockList extends Component{	
	render() {				
		var {stocks} = this.props;			
		if(!stocks.length)
			return <div className='row stock-list'></div>		

		var renderStocks = stocks.map((stock,i)=><StockListItem stock={stock} key={i}/>);						
		return (
			<div className='row stock-list'>								
				{renderStocks}				
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

export default connect(mapStateToProps, null)(StockList);
import React, { Component } from 'react';

export default class StockListItem extends Component{	
	render() {				
		var {stock} = this.props;
		console.log(stock)					
		return (
			<div className='col-sm-6 col-md-4'>
				<div className='bs-callout bs-callout-default'>									
					<h4>{stock.code}</h4>
					<p>{stock.name}</p>
				</div>	
			</div>	
		);	
	}
}
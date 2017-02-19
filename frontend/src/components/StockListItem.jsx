import React, { Component } from 'react';
import { connect } from 'react-redux';
import {removeStock} from 'actions/Actions';

class StockListItem extends Component{	
	handleClick(code){		
		this.props.removeStock(code);
	}

	render() {				
		var {stock} = this.props;		
		console.log(stock)			
		return (
			<div className='col-sm-6 col-md-4'>				
				<div className='bs-callout bs-callout-default'>									
					<div className='row'>
						<h4 className='pull-left'>{stock.code}</h4>
						<div className='pull-right'>
							<button onClick={this.handleClick.bind(this, stock.code)} type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
						</div>	
					</div>
					<p>{stock.name}</p>					
				</div>					
			</div>	
		);	
	}
}

export default connect(null, {removeStock})(StockListItem);
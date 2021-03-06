import React, { Component } from 'react';
import Chart from 'components/Chart';
import Searchbar from 'components/Searchbar';
import StockList from 'components/StockList';

export default class IndexPage extends Component{
	render() {		
		return (
			<div className='container index-page'>				
				<Chart />	
				<Searchbar />				
				<StockList />
			</div>	
		);	
	}
}



import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chart extends Component{		
	componentWillUpdate(nextProps, nextState) {
		var {stocks} = nextProps;				
		var chartData=[];
		stocks.map((stock)=>{
			var values=stock.data.map(d=>{
				return{
					x: +d3.time.format("%Y-%m-%d").parse(d[0]),
					y: +d[1]	
				}
			});
			if(values.length)			
				chartData.push({				
					'key': stock.code,
					'values': values.reverse()
				});
		});		

		nv.addGraph(function() { 			
	        var chart = nv.models.lineWithFocusChart();	                

	        //chart.xAxis.tickFormat(d => d3.time.format('%b %d, %Y')(new Date(d))).showMaxMin(false);
	        var array = chartData[0].values;
	        var start = array[0].x;
	        var end = array[array.length-1].x;

	        chart.xAxis
	        	.tickValues(d3.time.month.range(start, end,1))
	        	.tickFormat(d => d3.time.format('%b %d, %Y')(new Date(d))).showMaxMin(false);

	        chart.x2Axis
	        	.tickValues(d3.time.month.range(start, end,1))
	        	.tickFormat(d => d3.time.format('%b %d, %Y')(new Date(d))).showMaxMin(false);

	        chart.yTickFormat(d3.format(',.2f'));
	        chart.useInteractiveGuideline(true);
			d3.svg.axis().outerTickSize(0)

	        d3.select('.chart svg')
	            .datum(chartData)
	            .call(chart);
	        nv.utils.windowResize(chart.update);

	        return chart;
	    });	    
	}

	render() {		
		return (
			<div className='row'>
				<div className='text-center'>
					<h1 className='page-title'>Stock Markets Data</h1>
				</div>				
				<div className='chart'>
					<svg></svg>
				</div>	
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
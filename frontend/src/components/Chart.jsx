import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Chart extends Component{		
	componentWillUpdate(nextProps, nextState) {
		var {stocks} = nextProps;				
		var chartData=[];
		stocks.map((stock)=>{
			//stock.data is array of 2 elements 
			//['2015-01-30', '21222'] 
			var values=stock.data.map(d=>{
				return{
					//parse date to unix timestamp
					x: +d3.time.format("%Y-%m-%d").parse(d[0]),					
					y: +d[1]	
				}
			});
			if(values.length)			
				chartData.push({	
					'color': stock.color,					
					'key': stock.code,
					'values': values.reverse()
				});
		});		

		nv.addGraph(function() { 			
	        var chart = nv.models.lineWithFocusChart();	  

			//define range of ticks
	        var array = chartData[0].values;
	        var start = array[0].x;
	        var end = array[array.length-1].x;
			
	        chart.xAxis
	        	.tickValues(d3.time.month.range(start, end, 2))
	        	.tickFormat(d => d3.time.format("%b'%d")(new Date(d)))
	        	//don't show start&end ticks
	        	.showMaxMin(false);

			//ticks for 2nd display
	        chart.x2Axis
	        	.tickValues(d3.time.month.range(start, end, 2))
	        	.tickFormat(d => d3.time.format("%b'%d")(new Date(d))).showMaxMin(false);

	        chart.yTickFormat(d3.format(',.2f'));
	        //show tooltip on hover
	        chart.useInteractiveGuideline(true);
			d3.svg.axis().outerTickSize(0)

	        d3.select('.chart svg')
	            .datum(chartData)
	            .call(chart);

	        //update chart on resize    
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
import React, { Component } from 'react';
import {connect} from 'react-redux';


class Alert extends Component{
	render() {
		var {errorMessage} = this.props;
			if(errorMessage)
				return (
					<div className='alert alert-custom alert-dismissable fade in'>
					    <a href='#' className='close' data-dismiss='alert' aria-label='close'>&times;</a>
						<strong>Oops!</strong> {errorMessage}
					</div>
				)
			else 
				return <div></div>	
		
	}
}


function mapStateToProps(state){
  return {errorMessage: state.error}
}

export default connect(mapStateToProps, null)(Alert);
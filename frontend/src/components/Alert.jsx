import React, { Component } from 'react';
import {connect} from 'react-redux';
import {removeError} from 'actions/Actions';

class Alert extends Component{
	handleClick(){
		this.props.removeError();
	}
	render() {
		var {errorMessage} = this.props;		
		if(errorMessage)								
			return (				
				<div className='alert alert-custom alert-dismissable fade in'>
				    <button onClick={this.handleClick.bind(this)} className='close' aria-label='close'>&times;</button>
					<strong>Oops!</strong> {errorMessage}
				</div>
			);
		else 
			return <div></div>;
	}
}

function mapStateToProps(state){
  return {errorMessage: state.error}
}

export default connect(mapStateToProps, {removeError})(Alert);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {sendCodeRemote} from 'actions/Actions';
import Alert from 'components/Alert'

class Searchbar extends Component{
	constructor(props) {
		super(props);
		this.state={
			value: ''
		}
	}
	handleChange(e){
		this.setState({
			value: e.target.value
		})
	}
	handleSubmit(e){
		e.preventDefault();
		var {value} = this.state;
		if(value){			
			this.setState({value: ''})
			this.props.sendCodeRemote(value);
		}		
	}
	render() {		
		return (
			<div className='row searchbar'>	
				<div className='col-md-3 col-sm-2'></div>
				<div className='col-md-6 col-sm-8'>
					<Alert />
					<form onSubmit={this.handleSubmit.bind(this)}>
						<div className='input-group'> 
							<input className='form-control' placeholder='Enter Stock Code' value={this.state.value} onChange={this.handleChange.bind(this)}/>
						
							<span className="input-group-btn">
								<button className='btn btn-success-custom'>Add</button>
							</span>	
						</div>	
					</form>
				</div>	
				<div className='col-md-3 col-sm-2'></div>
			</div>	
		);	
	}
}

export default connect(null, {sendCodeRemote})(Searchbar);
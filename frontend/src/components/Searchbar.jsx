import React, { Component } from 'react';
import { connect } from 'react-redux';
import {sendCodeRemote} from 'actions/Actions';

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
			this.props.sendCodeRemote(value);
			this.setState({value: ''})
		}		
	}
	render() {		
		return (
			<div className='row searchbar'>	
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input value={this.state.value} onChange={this.handleChange.bind(this)}/>
					<button>Add Code</button>
				</form>
			</div>	
		);	
	}
}

export default connect(null, {sendCodeRemote})(Searchbar);
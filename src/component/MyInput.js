import React,{Component} from 'react';

export default class MyInput extends Component{
	constructor(props){
	       super(props);
	       this.state = {
	           changeValue: this.props.value,
	       };
	       this.changeHandler = (event)=>{
	       		let obj = {};
	       		obj.changeValue = event.target.value;
				this.setState(obj);
			}
	}
	render(){
		return (
			<input type="text" onChange={this.changeHandler} value={this.state.changeValue}/>
		)		
	}
}
MyInput.defaultProps = {
	value: 'Hello World'
}
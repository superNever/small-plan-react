import React,{Component} from 'react';
import '../styles/myInput.less'
export default class MyInput extends Component{
	constructor(props){
	       super(props);
	       this.state = {
	           changeValue: '',
	           inputClass:'input-class blur-class',
	           focusClass:'input-class focus-class',
	           blurClass: 'input-class blur-class',
	           dangerClass: 'danger-class',
	           waringClass: 'span-class span-hide',
	           spanHide: 'span-class span-hide',
	           spanShow: 'span-class span-show',
	           placeholder: this.props.name ? "请输入"+this.props.name :"请输入信息"
	       };
	       this.changeHandler = (event)=>{
	       		let obj = {};
	       		obj.changeValue = event.target.value;
				this.setState(obj);
			}
			this.focusHandler = (event)=>{
				event.preventDefault();
				event.target.click();
				this.setState({waringClass:this.state.spanHide})
				this.setState({inputClass:this.state.focusClass})
			}
			this.blurHandler = (event)=>{
				event.preventDefault();
				let boolValue = this.testRegExp(event.target.getAttribute('type'),event.target.value);
				if(!boolValue){
					event.target.value = '';
					this.setState({placeholder:''})
					this.setState({waringClass:this.state.spanShow})
					this.setState({inputClass:this.state.blurClass+' '+this.state.dangerClass})
				}else{
					this.setState({inputClass:this.state.blurClass})
				}				
			}
			this.spanClick = (event)=>{
				event.target.previousSibling.focus();	
			}
			this.testRegExp = (type,value)=>{
				let boolValue,pattern;
				switch(type.toLowerCase()){
					case 'email':
						pattern = '^\\w+@[\\w|.]+\\.+\\w+$';				
						break;
				   	case 'phone':
				   		pattern = '((\\d{11})|^((\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1})|(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1}))$)';		
				   		break;
				   	case 'text':
				   		pattern = '\\S+';		
				   		break;
				}
				let regexp = new RegExp(pattern, 'g');
				return boolValue = regexp.test(value);
			}
	}
	
	render(){
		let name = this.props.name ? this.props.name+":" :"";
		let placeholder = this.props.name ? "请输入"+this.props.name :"请输入信息";
		let type = this.props.type ? this.props.type : "text";
		return (
			<div className="selfInput">
				<label className="label-style" htmlFor="my-input">{name}</label>
				<input
				className={this.state.inputClass} 
				name="my-input" 
				type={type} 
				onChange={this.changeHandler} 
				onFocus = {this.focusHandler}
				onBlur = {this.blurHandler}
				placeholder={this.state.placeholder} />
				<span className={this.state.waringClass} onClick = {this.spanClick }>{ placeholder}</span>
			</div>
			
		)		
	}
}
// MyInput.defaultProps = {
// 	placeholder: 'Hello World'
// }
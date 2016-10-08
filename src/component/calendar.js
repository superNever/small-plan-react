import React,{ Component } from 'react'
import '../styles/calendar.less'


//head
class CalendarHead extends Component{
	constructor(props){
		super(props);
		this.state = {
			month:this.props.month,
			year:this.props.year
		}
	}
	handleLeftClick(){
		let newMonth = parseInt(this.state.month) - 1;
		let year = this.state.year;
		if(newMonth < 1){
			year --;
			newMonth = 12;
		}
		this.state.month = newMonth;
		this.state.year=year;
		this.setState(this.state);
		this.props.updateFilter(year,newMonth);
	}
	handleRightClick(){
		let newMonth = parseInt(this.state.month) + 1;
		let year = this.state.year;
		if(newMonth > 12){
			year ++;
			newMonth = 1;
		}
		this.state.month = newMonth;
		this.state.year=year;
		this.setState(this.state);
		this.props.updateFilter(year,newMonth);
	}
	render(){
		return (
			<div className="calendar-head-border">
				<p style={{"lineHeight":"30px"}}>{this.state.month}月</p>
				<p>{this.state.year}年</p>
				<p className="triangle-left" onClick={this.handleLeftClick.bind(this)}></p>
				<p className="triangle-right" onClick={this.handleRightClick.bind(this)}></p>
			</div>
		)
	}
}


//body
class CalendarBody extends Component{
	constructor(props){
		super(props);

	}
	getMonthDays(){
		//根据月份获取当前天数
        let year = this.props.year,
		    month = this.props.month;
		let temp = new Date(year,month,0); 
		return temp.getDate();
	}
	getFirstDayWeek(){
		//获取当月第一天是星期几
		let year = this.props.year,
		    month = this.props.month;	
		let dt = new Date(year+'/'+month+'/1');
		let Weekdays = dt.getDay();
		return Weekdays; 	
	}
	render(){
		var arry1 = [],arry2 = [];
		var getDays = this.getMonthDays(),
			FirstDayWeek = this.getFirstDayWeek(),
			curday = this.props.day ;
			for(var i = 0 ;i < FirstDayWeek; i++ ){
				arry1[i] = i;
			}
			for(var i = 0 ;i < getDays; i++ ){
				arry2[i] = (i+1);
			}
			
		var node1 = arry1.map(function(item){
			return <li key = {item}></li> // 这里不能加引号，因为要返回HTML标签，而不是html字符串，
							//这是JSX语法 HTML 语言直接写在 JavaScript 语言之中，不加任何引号。
		})
		var node2 = arry2.map(function(item){
			return (curday == item)?<li key = {item} style={{"backgroundColor": "#eee"}}>{item}</li>: <li key={item}>{item}</li>
		})

		return (
			<div>
				<div className="weekday">
					<ul>
						<li>SUN</li>
						<li>MON</li>
						<li>TUE</li>
						<li>WED</li>
						<li>THU</li>
						<li>FRI</li>
						<li>SAT</li>
					</ul>
				</div>
				<div className="CalendarDay">
					<ul>{node1}{node2}</ul>
				</div>
			</div>
		)
	}
}


//control
export default class Calendar extends Component{
	constructor(props){
		super(props);
		let newDate = new Date();
		this.state = {
			year:this.formatDate(newDate,'yyyy'),
			month:parseInt(this.formatDate(newDate,'MM')),
			day:parseInt(this.formatDate(newDate,'dd')) 

		}
	}
	formatDate(date,fmt,flag){
		if(!date) return;
		let o = {
	            "M+" : date.getMonth()+1, //月份
	            "d+" : date.getDate(), //日
	            "h+" : flag ? date.getHours() : (date.getHours()%12 == 0 ? 12 : date.getHours()%12), //小时
	            "H+" : date.getHours(), //小时
	            "m+" : date.getMinutes(), //分
	            "s+" : date.getSeconds(), //秒
	            "q+" : Math.floor((date.getMonth()+3)/3), //季度
	            "S" : date.getMilliseconds() //毫秒
        };
        let week = {
            "0" : "\u65e5",
            "1" : "\u4e00",
            "2" : "\u4e8c",
            "3" : "\u4e09",
            "4" : "\u56db",
            "5" : "\u4e94",
            "6" : "\u516d"
        };

        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[date.getDay()+""]);
        }
        for(let k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;

	}
	handleFilterUpdate(filterYear,filterMonth){
		this.setState({
	    	year: filterYear,
	    	month: filterMonth
	    });

	}
	render(){
		return (
			<div className="calendarBorder">
				<CalendarHead 
					year = {this.state.year}
					month = {this.state.month}
					updateFilter={this.handleFilterUpdate.bind(this)}/>
				<CalendarBody 
					year = {this.state.year}
					month = {this.state.month}
					day = {this.state.day}/>
			</div>
		)
	}
}
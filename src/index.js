import React from 'react';
import { render } from 'react-dom';
import MyInput from './component/MyInput';
render(
	<div>
		<MyInput name="邮箱" type="email"/>
		<MyInput name="地址" />
		<MyInput name="电话" type="phone"/>
		<MyInput name="姓名" />
	</div>,document.querySelector('#app')
)

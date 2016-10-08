import React from 'react';
import { render } from 'react-dom';
import Calendar from '../../src/component/MyInput';
render(
	<div>
		{/** type可以不指定，默认为text，name其实也可以不指定
		但是不指定样式有点丑，木有调整 **/}
		<MyInput name="邮箱" type="email"/>
		<MyInput name="地址" />
		<MyInput name="电话" type="phone"/>
		<MyInput name="姓名" />
	</div>,document.querySelector('#app')
)

this 动态指向
	code:
		var a = 321;
		var obj1 = {
			a:123,
			getA:function(){
				// this = window;
				// var that = this;
				console.log(this.a);
				// function b(){
				// 	console.log(that.a);
				// }
				// b();
			}
		}
		// obj1.getA.call(window);

	函数调用: fun()
	方法调用：obj.fun(){}
	方法调用传入隐式实参(方法调用的母体)
	this是一个关键字,只读,this没有作用域,嵌套函数不会继承this
	函数调用：this指向全局对象(非严格)或undefined(严格)

setTimeout异步， 需要和浏览器UI线程阻塞情况结合讲,
	单线程
	脚本和事件处理程序在同一时间只能执行一个，没有并发性
	浏览器必须在脚本和事件处理程序执行的时候停止响应用户输入
	<script type= "text/javascript"></script>"阻塞"页面UI渲染
	setTimeout:指定时间后调用函数
	// setTimeout(function(){},1000)
	code:
		function test() {
            for (var i = 0; i < 500000; i++) {
                var div = document.createElement('div');
                div.setAttribute('id', 'testDiv');
                document.body.appendChild(div);
                // document.body.innerHTML = '<div id="testDiv"></div>'
                document.body.removeChild(div);
            }
        }
        setInterval(test, 10);
        var num = 0;
        var i = setInterval(function() {
            num++;
            var date = new Date();
            document.write(date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds() + '<br>');
            if (num > 10)
                clearInterval(i);
        }, 1000);
    除了主JavaScript进程外，还有一个在进程下一次空闲时执行的代码队列
    定时器对队列的工作方式是当特定时间过去后将代码插入，这并不意味着它会马上执行，只能表示它尽快执行。
    魔鬼：
    	var t = true;
		setTimeout(function(){ t = false; }, 1000);
		while(t){}
		alert('end');
Window对象和location对象以及navigator对象
	window对象：客户端js的全局对象
	window.location，document.location 引用Location对象，表示URL
	code:
		location.assign('http://www.baidu.com');
		location.replace('http://www.baidu.com');//会删除当前页面的历史记录
		location = 'http://www.baidu.com';
		location = '#top';
		//分解属性也是可写的
	window.navigator引用包含浏览器厂商或浏览器所在桌面的相关信息
		appName：浏览器全称
		appVersion:浏览器厂商和版本信息，没有标准格式
		uerAgent:user-agent HTTP头发送的字符串
		platform:运行浏览器的操作系统
		online:浏览器当前是否联网
		....
URL
	queryString
		匹配参数
		code:
			function urlArgs(){
				var args = {};
				var search = location.search;
				search = search.substring(1);
				var pairs = location.search.split('&'); 
				for(var i = 0;i < pairs.length;i++){
					var pos = pairs[i].indexOf('=');
					if(pos == -1) continue;
					var name = pairs[i].substring(0,pos);
					var value = pairs[i].substring(pos+1);
					var value = decodeURIComponent(value);//对value解码
					args[name] = value;
				}
				return args;
			}
	hash
		location.hash
		URL的锚部分，包括开头的哈希符号(#)
浏览器兼容嗅探 注重浏览器支持方法而不是userAgent
	IE8提供可选的文档兼容性模式设置和各种加壳浏览器
	code:
		var isIE = navtigator.userAgent.toLocaleLowerCase().indexOf('msie') !== -1;//判断是否为IE

		// 判断是否为IE5678，非IE与IE9+中自动删除','
		var isLteIE8 = isIE && !+[1,];
		// 判断是否为IE5，IE5的文本模式为怪异模式(quirks),真实的IE5.5浏览器中没有document.compatMode属性
		isIE5 = (isLteIE8 && (!document.compatMode || document.compatMode === 'BackCompat'));

	　　// 判断是否为IE6，IE7开始有XMLHttpRequest对象
	　　isIE6 = isLteIE8 && !isIE5 && !XMLHttpRequest;

	　　// 判断是否为IE7，IE8开始有document.documentMode属性
	　　isIE7 = isLteIE8 && !isIE6 && !document.documentMode;

	　　// 判断是否IE8
	　　isIE8 = isLteIE8 && document.documentMode;

	　　// 判断IE9，IE10开始支持严格模式，严格模式中函数内部this为undefined
	　　isIE9 = !isLteIE8 && (function(){
	  　　"use strict";
	　　    return !this;
	　　}());

	　　// 判断IE10，IE11开始移除了attachEvent属性
	　　isIE10 = isIE && !!document.attachEvent && (function(){
	　　  "use strict";
	　　    return !this;
	　　}());
	    
	　　// 判断IE11
	　　isIE11 = isIE && !document.attachEvent;


数组判定 Object.prototype.toString.call
obj.fun.call(window)
	code:
		array2 = {
			0:'q',
			1:'w',
			2:'e',
			length:'3'
		}
		function a(){
			var array1 = ['q','w','e'];
			console.log(typeof null);
			console.log(arguments);
			console.log(typeof arguments);
			console.log(arguments.toString()+';');
			console.log(Object.prototype.toString.call(arguments));
			console.log(Object.prototype.toString.call(array1));
			console.log(typeof array1);
		}
DOM
	style 与window.getComputedStyle和currentStyle(IE)
		ele.style
			CSSStyleDeclaration对象
			内联样式
			document.getElementsByClassName('test_p')[0].style.backgroundColor
			css
		查询时使用计算样式(显示样式时实际使用的属性，只读)
		非IE
		getComputedStyle(ele,null)，第二参数也可以是伪类':before'等	
			getComputedStyle(document.getElementsByClassName('test_p')[0]).backgroundColor;
		IE
		currentStyle
			document.getElementsByTagName('p')[0].currentStyle.backgroundColor;
			// px   em=16px  font-size:1em
			currentStyle会带有相对单位
	document.querySelector与document.querySelectorAll
		css选择器语法选择元素
		IE7,8支持css2
		document.querySelectorAll('.test_p>img');
		选择方式
	innerHTML 的性能优势 （顺便可以提提模板引擎的制作思路）
		var compiled = _.template("hello: <%= name %>");
		compiled({name: 'moe'});
		=> "hello: moe"

		'<%= name %>'
		 'name'
		 obj['name']
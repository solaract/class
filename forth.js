客户端存储
	cookie
		少量数据
		有效期和整个浏览器进程一致(内存cookie)
		内存cookie：未设置过期时间，关闭浏览器时删除
		本地cookie：以文本形式保存在本地，过期后删除
		max-age(秒):有效期
		作用域:文档源和文档路径
		默认cookie和创建它的页面有关，并对该页面以及该页面同目录或子目录的其他页面可见
		cookie.path   cookie.domain
		cookie.secure:
			默认不安全(普通，不安全的http连接)
			true:只能通过https或其他安全协议连接时传递
		cookie:名值对
			值不允许包括分号，逗号，和空白
			encodeURIComponent()进行编码decodeURIComponent()解码
					//设置cookie值
			function cookie_set(c_name,c_value,freeTime){
			    var time = new Date();
			    if(!freeTime)freeTime=3600*1000;
			    // time.setTime(time.getTime()+freeTime);
			    if(c_name!=''||c_name!=null){
			    	c_value = encodeURIComponent(c_value);
			        // document.cookie=c_name+'='+c_value+';expires='+time.toUTCString();
			        document.cookie=c_name+'='+c_value+';max-age='+(time/1000);
			    }
			}
		每个cookie大小不能超过4KB，总数不能超过300个
		httponly:js无法读取和操作cookie
		CSRF
			HTML形式：
			GET:<img src='http://www.xxx.com/xx/xx?xx=xx'>
			POST:form
			跨域，请求是身份认证后的
			P3P：是否允许目标网站的cookie被另一个域通过加载目标网站而设置或发送。IE 本地cookie

	localStorage和sessionStorage
		
		存储有效期和作用域不同
			1.localStorage
				localStorage存储的数据是永久的，除非进行删除
				localStorage作用域：文档源级别	协议，主机名，端口
				同源文档共享同样的loaclStorage数据
				受不同浏览器限制
			2.sessionStorage
				有效期与顶层窗口或标签页相同。关闭窗口或标签页时删除
				作用域：文档源。但不同标签页中sessionStorage无法共享（同一标签页的中不同iframe可共享）
		API：
			设置属性存储		
				localStorage.a='123';//存储
				setItem(name,value);//存储
				getItem(name);//获取
				removeItem(name); delete(非IE8)//删除
				clear();//清除所有
				length属性及key();
				for(var i = 0;i<localStorage.length;i++){
					var name = localStorage.key(i);
					var value = localStorage.getItem(name);
				}
		存储事件:
			存储在localStorage和sessionStorage上的数据发生改变时，浏览器都会在其他对数据可见的窗口
			在对数据进行改变的窗口对象上不会触发触发存储对象(在对数据进行改变的窗口对象上不会触发)·
				storage(window.onstorage FF不支持)
				window.addEventListener('storage',function(e){
					console.log('key:'+e.key);
					console.log('newValue:'+e.newValue);
					console.log('oldValue:'+e.oldValue);
					console.log(e.storageArea);
					console.log('value:'+e.url);
				},false);
	userData(IE5及以上版本)
		document 元素后附加一个专属'DHTML行为'
				var memory = document.createElement('div');
				memory.id = "_memory";
				memory.style.display = 'none';
				memory.style.behavior = "url('#default#userData')";//附加userData行为
				document.body.appendChild(memory);
		赋予'userData'行为后，该元素就拥有load()和save()
		load:载入存储的数据
		save:存储新的数据
			setAttribute(),getAttribute(),removeAttribute()
				memory.load('myStoredData');//初始化
				var name = memory.getAttribute('username');
				if(!name){
					name = prompt('name?');
					memory.setAttribute('username',name);
					memory.save('myStoredData');//保存
				}

				memory.removeAttribute('username');
				memory.save('myStoredData');
		userData存储的数据，除非手动删除否则永不失效
		通过expires属性指定过期时间(毫秒)
			var now = (new Date()).getTime();//ms
			var expires = now+20*1000;
			expires = new Date(expires).toUTCString();
			memory.expires = expires;
		作用域:和当前文档同目录的文档中(比cookie窄，子目录无效)	
		数据量:比cookie大，但比 localStorage和sessionStorage小
	应用程序存储(HTML5):允许WEB应用程序将应用程序自身保存在用户浏览器中
		所需的所有文件(包括HTML，CSS，JS，图片等)

CSS
	选择器
		派生选择器:
			ul li{}
		ID及类选择器:
			#xx{},.xx{}
			支持派生:li #xx{},li .xx{}
		属性选择器:
			只有在规定了 !DOCTYPE 时，IE7 和 IE8 才支持属性选择器。在 IE6 及更低的版本中，不支持属性选择。
			[title]{},[title=123]{},input[type=text]
		复合选择器:
			交集:div.class{}  连续书写
			并集:div,class{}  逗号分隔
			后代:div class span{} 空格分隔
			子代:div>span{}  只选中一级后代
		继承特性:
			子元素具有父元素所有css属性
		层叠特性:
			行内>ID>类>标记
			后设置的相同属性会覆盖先设置的属性
		css从右向左进行选择
	单位
		px 像素
		pt 一英寸的1/72 绝对单位
		em 当前字体大小
		rem HTML根元素字体大小
	字体
		font-size 大小
		font-weight	粗细
		@font-face
		font-stretch  伸缩变形   normal wider narrower	
	布局
		text-indent:2em;  缩进
		text-align 对齐方式 left center right justify(两端对齐)
		line-height  normal number length(px) %
			line-height 与 font-size 的计算值之差（在 CSS 中成为“行间距”）分为两半，分别加到一个文本行内容的顶部和底部					 		



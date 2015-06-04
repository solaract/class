事件
	1.事件传播：
		捕获——目标——冒泡
	2.事件注册与取消
	3.事件代理
	4.mouseleave和mouseenter
		不论鼠标指针离开被选元素还是任何子元素，都会触发 mouseout 事件。
		只有在鼠标指针离开被选元素时，才会触发 mouseleave 事件。

Ajax
	1.XMLHTTPRequest
		浏览器在XMLHTTPRequest类上定义了它们的HTTP API。这个类的每个实例都表示一个独立的请求/响应对
		，并且这个对象的属性和方法允许指定请求细节和提取响应数据。
		function makeAjax(ajaxObj){
		    var xmlhttp;
		    // if (str=="")
		    //   {
		    //   document.getElementById("txtHint").innerHTML="";
		    //   return;
		    //   }
		    if (window.XMLHttpRequest)
		      {// code for IE7+, Firefox, Chrome, Opera, Safari
		        xmlhttp=new XMLHttpRequest();
		      }
		    else
		      {// code for IE6, IE5
		        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		      }
		    //ajax回调函数  
		    xmlhttp.onreadystatechange=function(){
		    	//4->响应完成，200->成功请求
		      if (xmlhttp.readyState==4 && xmlhttp.status==200){
		        var response = xmlhttp.responseText||xmlhttp.responseXML;
		        if(typeof(ajaxObj.success)==='function')ajaxObj.success(response);
		        else return;
		      }
		      else{
		        if(typeof(ajaxObj.fail)==='function')ajaxObj.fail();
		        else return;
		      }

		    };
		    //ajaxObj.type默认值
		    if(typeof(ajaxObj.type)!=='string')ajaxObj.type='GET';
		    xmlhttp.open(ajaxObj.type,ajaxObj.url,true);
		    // xmlhttp.open("POST","ajax_test.asp",true);
		    // xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		    // xmlhttp.send("fname=Bill&lname=Gates");
		    // setRequestHeader(header,value);向请求添加http头部
		    // application/x-www-form-urlencoded：窗体数据被编码为名称/值对。这是标准的编码格式。
		    // multipart/form-data：窗体数据被编码为一条消息，页上的每个控件对应消息中的一个部分。
		    // text/plain：窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符
		    if(typeof(ajaxObj.setRH)==='object')xmlhttp.setRequestHeader(ajaxObj.setRH.header,ajaxObj.setRH.value);
		    ajaxObj.postSend=ajaxObj.postSend||null;
		    xmlhttp.send(ajaxObj.postSend);
		}
		POST /uri 创建

		DELETE /uri/xxx 删除

		PUT /uri/xxx 更新或创建

		GET /uri/xxx 查看
跨域
	同源策略：
		不同域的客户端脚本在没有明确授权的情况下，不能读写对方的资源
			同域：同协议，同域名，同端口
			https://  www.baidu.com   :80
	document.domain:
		使用多个子域的大站点受同源策略的限制
		map.baidu.com与tieba.baidu.com
		domain存放载入文档的服务器的主机名
		document.domain 可读写但必须具有有效的域前缀或它本身
		如'baidu.com'	
		如果把两个窗口domain设置成了相同的值，那么这两个窗口就不受同源策略的约束
	jsonp:
		1.不受同源策略的影响，因此可以使用它们从其它的服务器请求数据
		2.包含json编码数据的响应体会自动解码
	CORS:
		跨域资源共享(Cross-Origin Resouse Sharing)	
		Access-Control-Allow-Origin:http://www.a.com
正则：
			function urlArgs(){
				var args = {};
				var search = location.search;
				// search = search.substring(1);
				// var pairs = location.search.split('&'); 
				// for(var i = 0;i < pairs.length;i++){
				// 	var pos = pairs[i].indexOf('=');
				// 	if(pos == -1) continue;
				// 	var name = pairs[i].substring(0,pos);
				// 	var value = pairs[i].substring(pos+1);
				// 	var value = decodeURIComponent(value);//对value解码
				// 	args[name] = value;
				// }
				'?a=123&b=asd'
				var reg = /([^\?&]+)=([^\?&]+)/g;
				var result;
				while((result = reg.exec(search))!==null){
					args[result[1]] = result[2];
				}
				return args;
			}		
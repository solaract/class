#js基础

## 数值 ##
- JavaScript内部，所有数字都是以64位浮点数形式储存，即使整数也是如此
***
	1 === 1.0 // true
	1 + 1.0 // 2
	//浮点数不是精确的值
	0.1 + 0.2 === 0.3// false
- 根据国际标准IEEE 754，64位浮点数格式的64个二进制位中，第0位到第51位储存有效数字部分，第52到第62位储存指数部分，第63位是符号位，0表示正数，1表示负数。
	- 绝对值小于等于2的53次方的整数都可以精确表示
	- 另一方面，64位浮点数的指数部分的长度是11个二进制位，意味着指数部分的最大值是2047（2的11次方减1），则JavaScript能够表示的数值范围为2^1024到2^-1023（开区间）
***
	Math.pow(2, 53)  // 54个二进制位
	// 9007199254740992
	
	Math.pow(2, 53) + 1
	// 9007199254740992
	如果指数部分等于或超过最大正值1024，JavaScript会返回Infinity，这称为“正向溢出”；如果等于或超过最小负值-1023（即非常接近0），JavaScript会直接把这个数转为0，这称为“负向溢出”。
	Math.pow(2,1024)
	//Infinity
- 正常情况下所有数值为十进制，十六进制以0x或0X开头，八进制以0开头
- 特殊值
	- 0、+0、-0，等价
	- NAN(Not a Number)
	- Infinity、-Infinity(无穷)
***
	1/+0
	//Infinity
	1/-0
	//-Infinity
	
	//运算出错将产生NAN
	5 - 'x'
	//NAN
	0/0
	//NAN
	//NAN是一种特殊的数值
	typeof NaN
	// 'number'
	//NaN不等于任何值，包括它本身。
	NaN === NaN
	// false
	//isNAN用于判断NAN
	isNaN(NaN) // true
	isNaN(123) // false
	//有局限性
	isNaN("Hello") // true
	//利用NaN是JavaScript之中唯一不等于自身的值进行判断
	function myIsNaN(value) {
	    return value !== value;
	}
	
	//除0以外的任何数除以0将产生Infinity，数值超出范围也会产生Infinity
	Infinity-1
	//Infinity
	Infinity*0
	//NAN
	//isFinite函数返回一个布尔值，检查某个值是否为正常值
	isFinite(Infinity) // false
	isFinite(-1) // true
	isFinite(true) // true
	isFinite(NaN) // false
- 全局方法
	- parseInt()
	- parseFloat()
***
	//parseInt方法可以将字符串或小数转化为整数。如果字符串头部有空格，空格会被自动去除
	//如果字符串包含不能转化为数字的字符，则不再进行转化
	//如果字符串的第一个字符不能转化为数字（正负号除外），返回NaN
	parseInt('   81') // 81
	parseInt("8a") // 8
	parseInt("12.34") // 12
	parseInt("a2c") //NaN
	//parseInt将''转化为NAN
	parseInt('')//NaN
	Number('')//0
	//parseInt方法还可以接受第二个参数（2到36之间），表示被解析的值的进制。
	parseInt("1011", 2) // 11
	//如果第一个参数是数值，则会将这个数值先转为10进制，然后再应用第二个参数
	parseInt(020, 8) // 14
	parseInt(20, 8) //16
	
	[0,1,2].map(parseInt)
	//Array.map(callback(value,index,array))
## 字符串 ##
- 单引号字符串的内部，可以使用双引号；双引号字符串的内部，可以使用单引号。如果要在单引号字符串的内部，使用单引号（或者在双引号字符串的内部，使用双引号），就必须在内部的单引号（或者双引号）前面加上反斜杠，用来转义。
***
	'say \'hi\''
	//"say 'hi'"
- 字符串是类似数组的对象，且无法改变字符串之中的单个字符
***
	var s = 'hello';
	delete s[0];
	s // "hello"
	s[1] = 'a';
	s // "hello"
	//字符串内部的单个字符无法改变和增删
- length属性返回字符串的长度，该属性也是无法改变的。
***
	var s = 'hello';
	s.length // 5
	s.length = 3;
	s.length // 5
	//字符串的length属性无法改变，但是不会报错
- 字符串也无法添加新属性
***
	var s = "Hello World";
	s.x = 123;
	s.x // undefined
	//为字符串s添加了一个x属性，结果无效，总是返回undefined

>**在JavaScript内部，变量s其实指向字符串“Hello World”的地址，而“Hello World”本身是一个常量，所以无法改变它，既不能新增，也不能删除。另一方面，当一个字符串被调用属性时，它会自动转为String对象的实例，调用结束后，该对象自动销毁。这意味着，下一次调用字符串的属性时，实际是调用一个临时生成的新对象，而不是上一次调用时生成的那个对象，所以取不到赋值在上一个对象的属性。如果想要为字符串添加属性，只有在它的原型对象String.prototype上定义**

- 反斜杠在字符串内有特殊含义，用来表示一些特殊字符，所以又称为转义符。如果字符串的正常内容之中，需要包含反斜杠，则反斜杠前需要再加一个反斜杠，用来对自身转义。
***
>\0 代表没有内容的字符（\u0000）

>\b 后退键（\u0008）

>\f 换页符（\u000C）

>.......

- javaScript使用Unicode字符集，也就是说在JavaScript内部，所有字符都用Unicode表示
***
	var s = '\u00A9';
	s // "©"

- 每个字符在JavaScript内部都是以16位（即2个字节）的UTF-16格式储存。也就是说，JavaScript的单位字符长度固定为2个字节
-  Base64是一种编码方法，可以将任意字符转成可打印字符。使用这种编码方法，主要不是为了加密，而是为了不出现特殊字符，简化程序的处理。
	- JavaScript原生提供两个Base64相关方法。
	> btoa()：字符串或二进制值转为Base64编码
	
	> atob()：Base64编码转为原来的编码
	***

		var string = 'Hello World!';
		
		btoa(string) // "SGVsbG8gV29ybGQh"
		atob('SGVsbG8gV29ybGQh') // "Hello World!"
## 对象 ##
- 对象（object）是JavaScript的核心概念，也是最重要的数据类型。JavaScript的所有数据都可以被视为对象
- 声明方法
***
	var o1 = {};
	var o2 = new Object();
	var o3 = Object.create(null);

	var o4 = Object.create(o3);
- 推荐使用obj['key']而不是obj.key
- 如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量
***
	var o1 = {};
	var o2 = o1;
	
	o1.a = 1;
	o2.a // 1
- in运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），如果包含就返回true，否则返回false
***
	var o = { p: 1 };
	'p' in o // true
	//所有全局变量都是顶层对象（浏览器的顶层对象就是window对象）的属性
	if ('x' in window) { alert(1); }
	//in不能识别对象继承的属性
	var obj = {name:'zxy'};
	var z_obj = Object.create(obj);
	z_obj.hasOwnProperty('name');//false
	'name' in z_obj;//true
- for...in循环用来遍历一个对象的全部属性(包含自身和继承属性)
- JavaScript允许属性的“后绑定”，也就是说，你可以在任意时刻新增属性，没必要在定义对象的时候，就定义好属性
- 查看一个对象本身的所有属性，可以使用Object.keys方法
***
	var o = {
	  key1: 1,
	  key2: 2
	};
	
	Object.keys(o);
	// ["key1", "key2"]
- 删除一个属性，需要使用delete命令
***
	delete o.key1 // true
	o.key1 // undefined
	delete o.key1 // true
	//delete命令只能用来保证某个属性的值为undefined，而无法保证该属性是否真的存在
	//当属性存在，且不得删除时，delete命令才会返回false
	var o = Object.defineProperty({}, "p", {
	        value: 123,
	        configurable: false
	});	
	o.p // 123
	delete o.p // false
- delete命令也不能删除var命令声明的变量
- array-like object
	- 类数组对象看上去很像数组，可以使用length属性，但是它们并不是数组，所以无法使用一些数组的方法
	- 典型的类似数组的对象是函数的arguments对象，以及大多数DOM元素集，还有字符串
***
	var a = {
	    0:'a',
	    1:'b',
	    2:'c',
	    length:3
	};

	//通过函数的call方法，可以用slice方法将类似数组的对象，变成真正的数组
	var arr = Array.prototype.slice.call(arguments);
- width(){}
***
	with (o) {
	  p1 = 1;
	  p2 = 2;
	}
	
	// 等同于
	
	o.p1 = 1;
	o.p2 = 2;
## 数组 ##
- 本质上，数组也属于对象
***
	typeof [1,2,3] // "object"
- length属性
	- 数组的length属性是一个动态的值，返回数组的成员数量，等于键名中的最大整数加上1（数组成员最多只有4294967295个（232-1）个）
	- length属性是可写的
	- 由于数组本质上是对象的一种，所以我们可以为数组添加属性，但是这不影响length属性的值
***
	var arr = ['a', 'b'];
	arr.length // 2
	//设置length较小
	arr.length = 1;
	arr //["a"]
	//设置length较大
	arr.length = 3;
	arr //["a", undefined × 2]
	//设置length为0
	arr.length = 0;
	arr // []
	//设置length为非法值
	arr.length = 'abc'; //RangeError: Invalid array length
- 当数组的某个位置是空元素（比如两个逗号之间没有任何值，或者值为undefined），我们称该数组存在空位（hole）
	- 使用delete命令删除一个值，会形成空位
	- 空位不影响length属性
***
	var a = [1,,3];
	a //[1, undefined × 1, 3]
	a.length //3
	delete a[0]; //true
	a //[undefined × 2, 3]
	a.length //3
- in运算符 for...in循环也适用于数组，但不限于数字键
## 函数 ##
- 函数的声明
	- function命令
	- 函数表达式
	- Function构造函数
***
	//function命令
	function f(){
	  // ...
	}

	//函数表达式
	var f = function (){
	  // ...
	};
	
	var f = new Function("x","y","return (x+y)");

	//采用函数表达式声明函数时，function命令后面不带有函数名。如果加上函数名，该函数名只在函数体内部有效，在函数体外部无效。
	var f = function x(){
	  console.log(typeof x);
	};
	x //ReferenceError: x is not defined
	f() // function
	//这种写法的用处有两个，一是可以在函数体内部调用自身，二是方便除错（除错工具显示函数调用栈时，将显示函数名，而不再显示这里是一个匿名函数）
	//推荐写法
	var f = function f(){};
- 如果多次采用function命令，重复声明同一个函数，则后面的声明会覆盖前面的声明
- JavaScript引擎遇到return语句，就直接返回return后面的那个表达式的值，后面即使还有语句，也不会得到执行(注意return语句后不可换行)；
- 递归:函数调用自身
***
	var n = 0;
	var add = function add(n){
		n++;
		if(n<5){
			return add(n);
		}
		else{
			return n;
		}
	};
	add(n); // 5 
- JavaScript引擎将函数名视同变量名，所以采用function命令声明函数时，整个函数会被提升到代码头部
***
	f();
	function f(){} 
	
	//但是，如果采用赋值语句定义函数，JavaScript就会报错。
	b();
	var b = function (){}; // TypeError: undefined is not a function
	//上面代码等同于
	var b;
	b();
	b = function(){};
- 根据ECMAScript的规范，不得在非函数的代码块中声明函数，最常见的情况就是if和try语句
	if (foo) {
	  function x() { return; }
	}
	//由于存在函数名的提升，所以在条件语句中声明函数是无效的，这是非常容易出错的地方
	
	if (false){
	  var f = function (){};
	}
- name属性：返回紧跟在function关键字之后的那个函数名
***
	var f3 = function myName() {};
	f3.name // 'myName'
- length属性：返回函数定义中参数的个数
***
	function f(a,b) {}
	//函数定义时的参数个数，与实际输入参数个数无关
	f.length
	// 2
- 函数的toString方法：返回函数的源码
- 函数作用域
	- 作用域（scope）指的是变量存在的范围
	- Javascript只有两种作用域：一种是全局作用域，变量在整个程序中一直存在；另一种是函数作用域，变量只在函数内部存在
	- 函数内部定义的变量，会在该作用域内覆盖同名全局变量
	- 函数作用域内部也会产生“变量提升”现象。var命令声明的变量，不管在什么位置，变量声明都会被提升到函数体的头部
	- 函数本身的作用域绑定其声明时所在的作用域
	***
		var a = 1;
		var x = function (){
		  console.log(a);
		};
		
		function f(){
		  var a = 2;
		  x();
		}
		//x仍输出全局a
		f() // 1
- 参数
	- 函数运行的外部数据
	- 参数可以省略，省略的参数为undefined
	- 参数默认值
	***
		function f(a){
		    a = a || 1;
		    return a;
		}
		//更好的做法
		function f(a){
		    (a !== undefined && a != null)?(a = a):(a = 1);
		    return a;
		}
	- JavaScript的函数参数传递方式是传值传递（passes by value），这意味着，在函数体内修改参数值，不会影响到函数外部
	***
		var p = 2; 
		function f(p){
		    p = 3;
		}	
		f(p);
		p // 2
	- 但是对于复合类型的变量来说，属性值是传址传递（pass by reference），也就是说，属性值是通过地址读取的。所以在函数体内修改复合类型变量的属性值，会影响到函数外部
	***
		var o = { p:1 };		
		function f(obj){
		    obj.p = 2;
		}		
		f(o);
		o.p // 2
	- 如果有同名的参数，则取最后出现的那个值
- arguments对象
	- 类数组对象
	- arguments对象包含了函数运行时的所有参数
	- arguments对象除了可以读取参数，还可以为参数赋值（严格模式不允许这种用法）
	- 可以通过arguments对象的length属性，判断函数调用时到底带几个参数
	- callee属性：返回它所对应的原函数
- 闭包
	- 闭包（closure）就是定义在函数体内部的函数。闭包的特点在于，在函数外部可以读取函数的内部变量
	***
		function f() {
		    var v = 1;
		
		    var c = function (){
		        return v;
		    };
		
		    return c;
		}
		f()(); //1
	- 闭包不仅可以读取函数内部变量，还可以使得内部变量记住上一次调用时的运算结果
	***
		function createIncrementor(start) {
	        return function () { 
	            return start++;
	        }
		}
		
		var inc = createIncrementor(5);
		
		inc() // 5
		inc() // 6
		inc() // 7
		//局部变量没有被释放
- 立即调用的函数表达式（IIFE）
	- 在Javascript中，一对圆括号“()”是一种运算符，跟在函数名之后，表示调用该函数。如果需要在定义函数之后，立即调用该函数。这时，你不能在函数的定义之后加上圆括号，这会产生语法错误
	- 原因是Javascript引擎看到function关键字之后，认为后面跟的是函数定义语句，不应该以圆括号结尾。
	- 解决方法是让引擎知道，圆括号前面的部分不是函数定义语句，而是一个表达式
	- 通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：一是不必为函数命名，避免了污染全局变量；二是IIFE内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量
***
	(function(){ /* code */ }()); 
	// 或者
	(function(){ /* code */ })();

	var i = function(){ return 10; }();
	true && function(){ /* code */ }();
	+function(){ /* code */ }();
- eval命令：将字符串当作语句执行
***
	var a = 1;
	eval('a = 2');
	a // 2

- eval有安全风险，无法做到作用域隔离，eval的命令字符串不会得到JavaScript引擎的优化，运行速度较慢,最好不要使用
## 一些编程风格 ##
- switch结构不利于代码重用，往往可以用对象形式重写
***
	var o = {
	    banana: function (){ return },
	    apple: function (){ return },
	    default: function (){ return }
	};                             
	if (o[fruit]){
	    o[fruit]();
	} else {
	    o['default']();
	}
- 尽量使用'==='和'!=='
- 不要省略句末的分号
- 构造函数首字符大写
- 推荐在顶部先声明所有变量（变量声明“提升”）
- 不要把多行代码合并为一行。降低可读性，而且可能产生bug
- if语句中都使用大括号
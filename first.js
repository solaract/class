从闭包开始吧
	1.变量作用域:
		注：声明变量前不加var是全局变量
	2.函数作用域:
		块级作用域：类C编程语言中，花括号内的每一段代码都有各自的作用域，且在声明它们的代码段
		之外不可见
		函数作用域：变量在声明它们的函数体以及这个函数体嵌套的任意函数体内都是有定
		义的
		code:
			var a = true;
			if(a){
				var b = 1;
			}
			alert(b) //输出1	
		块级作用域中alert(b)输出undefined
		结：
			块级：{code..}
			函数：function(){code..}
		声明提前：
			code：
				var a = false;
				if(a){
					var b = 1;
				}
				alert(b) //输出undefined,不报错	
			与下面等同	
				var a,b;
				a = false;
				if(a){
					b = 1;
				}
				alert(b)

	3.闭包:
		code:
			var myObject = (function(){
				var value = 0;
				return {
					getValue:function(){
						return value;
					}
				}
			})()	
			myObject={get value}

		运行结束后myObject的一个引用保存在function中，所以仍然可以访问value变量(局部变量)，因
		为js采用函数作用域，get_status函数可以访问它被创建时所处的上下文环境，即function中
		内容对其都是可见的。同时，这意味着function运行结束后value变量不会被立即释放。

		好像并没有什么卵用

		look for php:
			<?php
				class myObject {
					privite value = 0;
					public function getValue(){
						return value;
					}
				}
				obj1 = new myObject;
			?>

		以上就是js代码实现的效果——模拟出了一个私有变量value,实现对成员的封装

		单例模式：
			code:
				<?php
					class myObject {
						privite static $obj = null;
						privite function __construct(){
							code...
						}
						static function getInstance(){
							if(is_null(self::$obj)){
								self::$obj = new self();
							}
							return self::$obj;
						}
					}
					$obj1 = myObject::getInstance();
				?>

				让js模拟就像这样：
				var myObject = (function(){
				    var obj;

				    var getInstance = function getInstance(){
				        if( obj === undefined ){
				            obj = new Construct();
				        }
				        return obj;
				    }

				    var Construct = function Construct(){
				        code...
				    }

				    return {
				        getInstance : getInstance
				    }
				})();
				obj1 = myObject.getInstance();

		腐烂的栗子:
			@demo:大挑index.html
			var add_event = function add_event(){
				var i;
				var li = document.getElementsByTagName('li');
				for(i = 0,len = li.length;i < len;i++){
					li[i].onclick = function (e) {
						alert(i);
					}
				}
			}
			以上函数本意是向每个li都添加一个点击事件，点击后弹出自己的序号。然而结果全部都会弹出最大的i
			实际上只要做一个小改动，就像这样：
				var add_event = function add_event(){
				var helper = function(i){
					return function(e){
						alert(i);
					}
				};
				var i;
				var li = document.getElementsByTagName('li');
				for(i = 0,len = li.length;i < len;i++){
					li[i].onclick = helper(i);
				}
			}
			这次我们的目的达到了，只是在循环外写了一个辅助函数，好像并没有什么改变，但结果完全不同了

			实际上错误的栗子混淆了闭包的概念，简化后就像这样：
				add_event(){
					var i;
					for(){
						onclick = function(){
							alert(i);
						}
					}
				}
				看起来是不是像个闭包了？于是addevent中的i并没有在运行完后被释放
				onclick时 function 才会被触发，此时 function 范围内并没有i值，于是向上下文
				(add_event)找，咦？这里有个i，好，拿来用！注意，你用鼠标点击的时候脚本一般早
				就运行完毕了，所以这时i为最大的值，懂了吧？这就是bug的原因
			那么修改后栗子就像这样：
				add_event(){
					var i;
					helper(i){
						alert(i);
					}
					for(){
						onclick = helper(i);
					}
				}	
				有什么不同呢？多了一个传参的过程，就像这样 参数i = i ，每一个参数i都拿到了
				不同的i的 副本 ，helper中拥有了自己的参数i，而且各不相同，这样在你点击的时候
				helper自己的函数作用域中就能拿到参数i，不用找上下文索要i，避免了bug。

			！避免在循环中创建函数！	



原型：
	每一个对象都连接到一个原型对象，并且从原型中继承属性。
	就像这样：
							原型对象	
							   |
							  对象 
	对象可以访问原型中的所有成员
	1.构造器：
		js不直接让对象从其它对象继承，反而插入了一个中间层：构造器
							原型对象
							   |    \
							   |    构造器
							   |    /
							  对象
		通过对象字面量创建的对象：var obj1 = {}相当于调用了：var obj1 = new Object();
		构造器模式：
			用 new 调用一个函数时，函数的执行方式会被修改。
		code：
			var MyObject = function MyObject(name){
				this.name = name;
				this.say = function(){
					code...
				}
			}
			object1 = new MyObject('wwww');
		执行后得到新的对象
		object1{
			name:'wwww',
			say:function(){
				code....
			}
		}	
		js这样做可能是想让自己向基于类的语言(比如php)靠拢，实际上很让人蛋疼
		php中类是这样的
		look for php：
			<?php
				class myObject{
					public $name
					function __construct($name){
						$this->name = $name;
					}
					public function say(){
						code....
					}
				}
				$object1 = new myObject('wwww');
			?>	
		这段php实现了和上面js中同样的事情
			
		构造器发挥类似于php类中__construct函数的作用，但是这并没有什么卵用

							myObject 	//类，不像js的原型对象可以直接使用，刷怪爆的武器图纸
							   |
							$object1  	//对象，图纸的成品
		个人认为类清晰很多					
	2.原型链：
		code：
			var Mam = function(name){   //构造器函数请大写首字母
				this.name = name;
			};
			var myMam = new Mam('hhhhh');	
			var myMam2 = new Mam('xxxxxx');	

							原型对象
							 / |    \
							/  |     Mam
						   /   |    /
					   myMam2 myMam	
			myMam{name='hhhhh'}		   	
		
		处于原型链下层的对象能分享其*上层原型链中*所有原型对象的成员	
		myMam和myMam2都算原型对象的后辈，两人算同一辈分，相互之间没什么联系，名字也不一样，
		但是都能通过原型链找他爸(原型对象)要零花钱

		myMam->原型:你的就是我的，我的还是我的。
		原型->myMam:你的还是你的，我的还是我的。

		所以改变原型对象的成员，myMam索要到的成员也会动态改变。但是改变myMam，他兄弟和他老
		爹都没啥感觉

		构造器通过prototype属性访问原型对象，对象则通过constructor属性访问构造器
		myMam.constructor->Mam      Mam.prototype->原型对象	

		我们可以通过给原型对象添加成员使其原型链下层的对象(如上例中的myMam和myMam2)能够共享
		这些成员
		code：
			Mam.prototype.say = function(){
				alert(this.name);
			}
			myMam.hi = function(){
				alert('hi!');
			}
			myMam.say();
			myMam.hi();
			myMam2.say();
			myMam2.hi();	//失败	

		我们还可以通过构造另一个伪类来继承Mam继续增加原型链的长度：
			code:
				var Cat = function(name,sex){
					this.name = name;
					this.sex = sex;
				};
				Cat.prototype = myMam;//连接原型链
				var myCat = new Cat('qqq','man');
				myCat.say();
				myCat.hi();
				myCat.sex;	

			于是链就变成了这样：
						    原型对象
							 / |    \ prototype
							/  |     Mam     ——————
						   /   |    / constructor  |
					   myMam2 myMam				   |
					           |    \ prototype    | constructor
			                   |	 Cat           |
					           |                   |
					          myCat      ——————————




		委托：		          
			当访问对象的某一成员时，先在该对象中搜索，没有就一级一级向原型对象查找

			如果想知道该对象中是否有某一成员，使用hasOwnProperty方法 
		php time:
			php中当然也是可以继承的，但不同的是php通过类的继承形成链
			code:
				class b extends a{};
				class c extends b{};
						       a
						     / |    
					      实例 b ——实例
					   		   | 	
					           c ——实例
/
		结：
			原型链成树状图结构
			js：
				通过原型对象的串接形成链，每个对象都能成为原型对象，只需要把构造器的prototype指向该对象
			php：
				通过类之间的继承关系串接成链，对象是类的实例















下面开启装逼模式：
	1.js几乎一切皆对象(几乎一用严谨性瞬间上升有木有)，清晰了解js对象很重要
		最简单的code:
			var a =[1,2];
			console.log(a.length);
		可是我们在创建a数组的时候并没有给予a.length这个属性，况且a是数组并不是对象
		同样的功能look for php：
			<?php
				$a = array(1,2);
				count($a);
			?>
		php使用一个count方法来计算数组的长度，这才是合乎逻辑的，那么js是如何实现的？
		



		好吧，js中的数组只是一些array-like特性的对象，它把数组的下标转变成字符串，用作其属性
		(比较慢)。

		问题迎刃而解了，js数组上层同样是一个Array对象作为其原型，相应的也有一个Array()构
		造器，在调用[](数组字面量)的时候 new Array();于是新的数组被设置了一些内置属性，然
		后新数组也拥有了一些方法(其实是原型Array的方法啦)

		我想说的是，以上就是我写原生php的许多bug之源，万恶(方便)的js，把我惯坏了。

		类似于Array，什么Function，String，balabala全部都拥有其顶层的原型对象，所有的对象
		最终都指向Object.prototype,所以我们可以向Object.prototype中添加成员使其对所有对象
		可见，但要注意全局污染问题！	


	
	2.更多关于原型链：
		当一个函数被创建时，Function构造器产生的函数对象会运行类似这样的代码：
			this.prototype = {constructor:this};
		这产生了一个有趣的现象：
			构造器.prototype是原型对象，而原型对象.constructor是构造器
		死循环	

		new 创建新实例过程中，函数的prototype被赋给派生对象隐式的[[prototype]]属性，派生对象
		的原型(即函数的prototype)的constructor再赋给派生对象

		prototype是函数的属性，显示修改对象的原型
		[[prototype]]是对象的内置属性，js内部寻找原型链(FF和Chrome中以__proto__公开)

		综上所述，原型链就变成了这样，感受一下:
						{constructor:Mam}  ————————
							 / |    \ prototype    | constructor
						   (__proto__)Mam  ————————
						   /   |    / constructor  |
					   myMam2 myMam				   |
					           |    \ prototype    | constructor
			              (__proto__)Cat           |
					           |                   |
					          myCat      ——————————

		参考：
			《JavaScript语言精粹》、《JavaScript权威指南》



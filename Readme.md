还是pink老师的ES6教程:https://www.bilibili.com/video/BV1nN411o7Zv?from=search&seid=16783022594448461664



# ES6

这里主要内容有

1. 类
2. 原型
3. 原型链
4. 之间的关系
5. this的指向
6. call，apply，bind
7. 闭包
8. 深拷贝与浅拷贝
9. 正则表达式

## 类

参见Node学习里面的内容

## 原型prototype、对象原型、原型链：

##### https://blog.csdn.net/weixin_43742708/article/details/109522038

# this

```javascript
        // this一般指向函数的调用者
        // 普通函数 windows.fm() this指向window
        function fm(){
            console.log('我是普通函数');
        }
        fm() //fn.call()

        // 对象的方法 this指向对象
        var obj ={
            fun:function(){
                console.log('我是对象的方法');
            }
        } 
        obj.fun()

        // 构造函数 this指向构造函数创建的实例对象
        function Star(){}
        var ldh = new Star()
        
        // 绑定事件函数，this指向绑定的DOM元素，函数的调用者
        btn.onclick = function(){} //触发事件调用
        
        // 定时器函数，指向window window.setTimeout(()=>{}.)
        setTimeout(() => {
            
        }, timeout);
        
        // 立即执行函数 指向window对象
        (function(){

        })()    
```

# call、bind、apply

用于修改函数内部的this指向

`call(): fun.call(thisArg，参数)` :用在普通的函数需要修改this指向时使用。

`apply:fun.apply(thisArg,[argsArray]) `，

thisArg:fun函数运行时指定的this值,argsArray:传递给函数fun值，必须包含在数组内。返回值就是函数的返回值。apply主要应用在修改数组的this指向，比如通过apply借助数学内置对象求最大值。

```javascript
var arr = [1,12,55,13]
var max = Math.max.apply(Math,arr) //将arr传递给Math.max
console.log(max);
```

`bind(thisArg,arg,arg) `不会调用函数 ，但是能改变函数内部指向,

会返回原函数修改this指向之后的新函数。

```javascript
var o ={
	name:'andy'
}
function fn(a,b){
    console.log(this);
    console.log(a+b);
}
fn() 
var f = fn.bind(o,1,2)
f()
// Window
//NaN
// Object
// 3
```

# 闭包

函数作用域分为 全局作用域和局部作用域 。

全局作用域： 在任何地方都能访问；局部作用域 在函数内部定义的变量只能在函数内部使用，函数执行完之后就会销毁。

闭包：有权访问另一个函数作用域中的变量的函数，闭包是一个函数。

闭包的作用：延伸变量的作用范围。闭包主要有立即执行函数和异步请求。

闭包应用：点击li 输出当前li的索引号

```javascript
var lis = document.querySelector('.nav').querySelectorAll('li')
// 利用for循环创建多个立即执行函数，调用立即执行函数的时候，接受i这个参数
// 立即执行函数也叫做小闭包，因为立即执行函数中的任何一个函数都可以使用它的i这个变量
for(var i = 0;i < lis.length; i++){
	(function(i){
			lis[i].onclick = function(){
			console.log(i);
		}
	})(i)
}
```




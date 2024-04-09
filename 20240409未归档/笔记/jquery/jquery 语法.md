## jquery 语法

```jquery
$(this).hide() //隐藏当前元素
$("p").hide() //隐藏所有p元素
$("p.test").hide() //class=test的p元素
$("#test").hied() //id="test"的元素
//完全兼容css选择器规则
$("div>p").hide(time,callback) //div 中的“亲生儿子”p
$("p").show(time,callback) //显示p元素
```

#### 常见函数

```jquery
.hide()
.show()
.toggle() //隐藏显示
.fadeTo(speed,.5) //变透明透明度为0.5
.slideToggle(speed,callback) //滑动效果
.animate({
	//css样式修改 但不是用padding-left 而是paddingLeft
})
.stop() //停止动画效果
```



### 开始语句

```jquery
$(function(){
	//开始写jquery代码
});
```

***

#### DOM事件

| 鼠标事件   | 键盘事件 | 表单事件 | 文档事件 |
| ---------- | -------- | -------- | -------- |
| click      | keypress | submit   | load     |
| hover      | keydown  | change   | resize   |
| mouseenter | keyup    | focus    | scroll   |
| nouseleave |          | blur     | unload   |
| dblclick   |          |          |          |

[^ dblclick]: 双击  
[^ scroll]: 鼠标滚动次数

***



#### 操作DOM

```jquery
$("p").text() //返回p的文本内容
$("p").html() //返回p内的html结构
$("form").val() //返回form内表单字段值
$("a").attr() //改变a的属性
$("div").append() //div尾部添加
$("div").prepend() //开头
$("element").after() //之后
$("element").before() //之前
$("element").remove() //删除所有元素包含子元素
$("element").empty() //删除子元素
$("element1,element2").addClass("class1 class2") //添加class
$("element1,element2").removeClass("class1 class2") //移除calss



```




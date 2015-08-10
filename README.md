# ajaxupdatebyhashchange

> 通过监听URL中HASH值的改变，来更新页面中局部的内容


```html
	<!--引入主文件-->
	<script src="function.js"></script>
	<div class="body"></div>
	<script>
		/*
		* spa.mvc({
		* 	"body":bd
		* });
		* 规定视图区域，每次变换路由会改变该区域内容
		*/
		var bd = spa.getByClass(document,"body")[0];
		spa.mvc({body:bd});
	</script>
```
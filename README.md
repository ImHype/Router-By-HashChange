# ajax update by hash change

> 通过监听URL中HASH值的改变，来更新页面中局部的内容

-------------------------
## How To Use It .
* Add The Script.
* Add The ViewArea.
* Setting In Script.

## Note
```html
<script src="function.js"></script>
<div class="body"></div>
<script>
	var bd = spa.getByClass(document,"body")[0];
	spa.mvc({body:bd});
</script>
```
## License

© Junyu Xu
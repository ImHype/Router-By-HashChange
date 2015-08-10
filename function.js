(function (w,d) {

	function showHash(options){
		var url = window.location.hash.substring(1);
		if(! (body=options.body) ){
			log("缺少视窗节点");
			throw Error("缺少视窗节点")
			return -1;
		}	
		ajax({
			"url":"./views/"+url,
			"method":"GET",
			"success":function (data){
				body.innerHTML = data;
			},
			"failed":function (err){
				log(err.toString());
			}
		});
	}

	function log(msg){
		var div  = document.createElement("div");
		div.className = "error"
		div.innerHTML = msg;
		document.body.appendChild(div);
	}

	function onready(){
		var list = this.list = [];
		this.add = function(fn){
			if(typeof fn == "function")
				list.push(fn);
			if(typeof fn == "object")
			{
				each(fn,function(f){
					list.push(f);
				});
			}
			
			return this;
		}
		addEvent(document,"readystatechange",function(e){

			if(document.readyState == "complete"){

				each(list,function(li){
					if(typeof li == 'function'){
						li.call(document);
					}
				})
			}
		})
		return this;
	}

	function getByClass(oParent, sClass)
	{
		if (oParent.getElementsByClassName) {
			return oParent.getElementsByClassName(sClass);
		};
	 	var aEle=oParent.getElementsByTagName('*');
	 	var aResult=[];
	 	var re=new RegExp('\\b'+sClass+'\\b', 'i');
	 	var i=0;
	 
	 	for(i=0;i<aEle.length;i++)
	 	{
			if(re.test(aEle[i].className))
			{
				aResult.push(aEle[i]);
			}
	 	}
	 	return aResult;
	}

	function addEvent(obj,eventType,handle){
		
		if(obj.addEventListener){
			obj.addEventListener(eventType,
				function(){
					handle.call(this);	
				},false)
		}else{
			obj.attachEvent("on"+eventType,function(){
					handle.call(this);	
				});
		}
	}

	function delegate(oTarget,sClass,type,handle){
		addEvent(oTarget,type,function(e){
			var ev = e||event;
			var re=new RegExp('\\b'+sClass+'\\b', 'i');
			if(re.test(ev.target.className)){
				handle.call(ev.target);
			}
		});
	}

	function each(obj,fn){
		for (var i = 0; i < obj.length; i++) {
			if(fn(obj[i],i)=="break")
				break;
		};
	}

	function ajax(options){
		var xmlHttp = null;
		try{
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(err){

			}
		}
		if(!xmlHttp&&XMLHttpRequest !=undefined)
			xmlHttp  = new XMLHttpRequest();

		var method = options["method"]||"GET";
		var url = options["url"];
		if(!url){
			log("传入url");
			new Error("传入url");
			return;
		}
		var sucFn = options["success"];
		var failFn = options["failed"];
		var data = options["data"]||null;
		xmlHttp.open(method,url,true);
		xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');  
		xmlHttp.send(data);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState ==4 ){
				if(xmlHttp.status == 200){
					try{
						sucFn(xmlHttp.responseText);
					}catch(err){
						log(err);
						new Error(err)
					}
				}else{
					try{
						failFn(xmlHttp.response);
					}catch(err){
						console.log("no failed handle.")
					}
				}
			}
		}
	}

	function mvc(bd){
		var ready = onready();
		ready.add(function(){
			showHash({body:bd.body});
		})
		addEvent(window,"hashchange",function(){
			showHash({body:bd.body});
		});
	}

	var spa = {};
	spa = {
		showHash: showHash,
		onready: onready,
		getByClass: getByClass,
		addEvent: addEvent,
		each: each,
		delegate: delegate,
		log: log,
		mvc: mvc
	}
	window.spa = spa;
}(window,document))
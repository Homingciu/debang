function Ajax(method, url, flag, upData, callBack) {
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	method = method.toUpperCase();
	if(method === "GET") {
		xhr.open(method, url + '?' + upData, flag);
		xhr.send();
	}else if(method === "POST"){
		xhr.open(method, url, flag);
		xhr.setRequestHeader("content-type", 'application/x-www-form-urlencoded');
		xhr.send(upData);
	}
	xhr.onreadystatechange = function () {
		if(xhr.readyState == 4) {
			if(xhr.status === 200) {
				callBack(xhr.responseText);
			}else {
				alert("error");
			}
		}
	}
}
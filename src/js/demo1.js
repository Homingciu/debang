require("../less/demo1.less");
// var tool = require('./tool.js');

// var obj1 = {
//     init : function () {
//         this.bindEvent();
//     },  
//     bindEvent: function () {
//         var dom = tool.getDom("demo1");
//         dom.onclick = this.changeColor;
//     },
//     changeColor: function () {   
//         this.style.background = "orange"; 
//     }
// }

// module.exports = obj1;








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
//找工作的按钮
var $BtnCollection = document.getElementsByClassName("work");
$BtnCollection[0].onmouseenter = function () {
    clear();
    Ajax("get", "./src/txt/address.txt", true, "", Dodata)
    $(".address").addClass("active");
    // var addressContent = document.getElementsByClassName("address-content")[0];
    // console.log(addressContent);
}
// $($BtnCollection[0]).attr("disabled", true);
$BtnCollection[0].onmouseout = function () {
    $(".address").on("mouseenter", function () {
        $(".address").on("mouseleave", function () {
            $(".address").removeClass("active");
        })
    })
    // clear();
}

function clear() {
    var $UlCollection = $Address.getElementsByClassName("address-content");
    var $DivCollection = $Address.getElementsByClassName("clear");
    Len = $UlCollection.length;
    for(var i = 0; i < Len; i ++) {
        $Address.removeChild($UlCollection[i]);
        $Address.removeChild($DivCollection[i]);
    }
}



$BtnCollection[1].onmouseenter = function () {
    document.onmousedown = null;
    if(this.value == "请输入职位关键字") {
        $BtnCollection[1].onmousedown = function () {
            this.value = "";
        }
    }
}

$BtnCollection[1].onkeydown = function () {
    this.onmousedown = null;
}

$BtnCollection[1].onmouseout = function () {
    document.onmousedown = function () {
        if($BtnCollection[1].value == "") {
            $BtnCollection[1].value = "请输入职位关键字";
        }
        
    }
}
$BtnCollection[2].onclick = function () {
    removeMessage();
    Ajax("get", "./src/txt/" + $BtnCollection[0].value + "-job-1.txt", true, "", jobMessage);
    $(".flip").empty();
    $(".flip").remove();
}


var $Address = document.getElementsByClassName("address")[0];
function Dodata(ajaxData) {
    // console.log(1);
    var ajaxArr = JSON.parse(ajaxData);
    var i;
    var html = "";
    var ul = document.createElement("ul");
    var div = document.createElement("div");
    var $AlphabetCollection = document.getElementsByClassName("alphabet");
    div.className = "clear";
    for(i = 0; i < $AlphabetCollection.length; i ++) {
        if($AlphabetCollection[i].className == "alphabet active2") {
            for(var j = 0; j < ajaxArr[i].length; j ++) {
                html += "<li>" + "<a href='#' style='color: #999;'>" + ajaxArr[i][j] + "</a>" + "</li>"
            }
        }
    }
            
    ul.className = "address-content";
    ul.innerHTML = html;
    $Address.appendChild(ul);
    $Address.appendChild(div);
    $(".address-content li")
                            .on("click", function () {
                                $BtnCollection[0].value = $(this).text();
                            })
}
// Ajax("get", "address.txt", true, "", Dodata)

$(".alphabet").on("mouseenter", function (e) {
    $(".alphabet").removeClass("active2");
    $(e.target).addClass("active2");
    clear();
    Ajax("get", "./src/txt/address.txt", true, "", Dodata)
    clear();
})

$(".alphabet").on("mouseout", function (e) {
    var $UlCollection = $Address.getElementsByClassName("address-content");
    var $DivCollection = $Address.getElementsByClassName("clear");
    if($UlCollection.length > 1) {
        clear();
    }
})

$(".job").on("mouseenter", function (e) {
    $(this).addClass("active3");
})

$(".job").on("mouseleave", function (e) {
    if(!$(this).hasClass("pick")) {
        $(this).removeClass("active3");
    }	
})

$(".job").on("click", function (e) {
    $(".job").removeClass("active3 pick");
    $(this).addClass("pick");
})

var i;
var messageBox = document.getElementsByClassName("message-content")[0];
function addMessage(k) {
    for(var j = 0; j < ajaxArr[k].length; j ++) {
        var html = "";
        var ul = document.createElement("ul");
        for(i = 0; i < ajaxArr[k][j].length; i ++) {
            html += "<li class='sp sp" + (i + 1) + "'>" + ajaxArr[0][j][i] + "</li>"
        }
        ul.innerHTML = html;
        messageBox.appendChild(ul);	
    }

    addNearJob();
            

}

//附件工作
function addNearJob() {
    if($(".near-job")) {
        $(".near-job").empty();
        $(".near-job").remove();
    }
    var p = document.createElement("p");
    p.className = "near-job";
    p.innerText = "附近的工作 :"
    p.style.fontSize = "12px";
    p.style.marginTop = "15px";
    p.style.paddingLeft = "40px";
    for(var i = 0; i < 4; i ++) {
        var a = document.createElement("a");
        a.href = "#";
        p.appendChild(a);
    } 
    messageBox.appendChild(p);
    Ajax("get", "./src/txt/" + $BtnCollection[0].value + "-near-job.txt", true, "", nearJob);
    function nearJob(ajaxData) {
        var ajaxArr = JSON.parse(ajaxData);
        for(i = 0; i < 4; i ++) {
            $(".near-job a").eq(i).text(ajaxArr[i]);
        }
    }
    //	
}

function jobMessage(ajaxData) {
    ajaxArr = JSON.parse(ajaxData);
    addMessage(0);
    flip();
    
}
Ajax("get", "./src/txt/哈尔滨-job-1.txt", true, "", jobMessage);


//翻页
function flip() {
    var num = ajaxArr.length;
    var $Pager = document.getElementsByClassName("pager")[0];
    var ul = document.createElement("ul");
    ul.className = "flip";
    var html = "";
    for(var i = 0; i < num; i ++) {
        if(i == 0) {
            html += "<li class='active4'><a href='#' style='color: #494e7b'>" + (i + 1) + "</a></li>"
        }else {
            html += "<li><a href='#' style='color: #494e7b'>" + (i + 1) + "</a></li>"
        }
        
    }
    html += "<li class='next-page'><a  href='#' style='color: #000;'>" + "下一页" + "</a></li>"
    ul.innerHTML = html;
    $Pager.appendChild(ul);
    $(".flip li")
            .on("click", page)
}			
function page() {
    if(this.innerText !== "下一页" && this.innerText !== "上一页") {
        $(".flip li").removeClass("active4");
        this.className = "active4";
        removeMessage();
        addMessage(parseInt(this.innerText - 1));			
    }else if(this.innerText == "下一页"){
        if($(".active4").text() != ajaxArr.length) {
            removeMessage();
            addMessage(parseInt($(".active4").text()));
            $(".active4").next().addClass("active4");
            $(".active4").eq(0).removeClass("active4");
        }
    }else if(this.innerText == "上一页"){
        if($(".active4").text() != "1") {
            removeMessage();
            addMessage(parseInt($(".active4").text()) - 2);
            $(".active4").prev().addClass("active4");
            $(".active4").eq(1).removeClass("active4");
            
        }
    }

    // 添加去除，上一页下一页；
    if($(".active4").text() != 1) {
        if($(".flip").has($(".pre-page"))[0] == undefined) {
            $(".flip").prepend("<li class='pre-page'><a href='#'>上一页</a></li>");
            $(".flip li")
            .on("click", page)
        }
    }else{
        $(".pre-page").remove();
    }

    if($(".active4").text() != ajaxArr.length) {
        if($(".flip").has($(".next-page"))[0] == undefined) {
            $(".flip").append("<li class='next-page'><a href='#'>下一页</a></li>");
            $(".flip li")
            .on("click", page)
        }
    }else{
        $(".next-page").remove();
    }

}









function removeMessage() {
    if($(".sp")) {
        $(".sp").remove();
    }
}		
$(".message-head li")
                        .on("click", function () {
                            switch(this.id) {
                                case "mechanic":
                                    removeMessage();
                                    Ajax("get", "./src/txt/" + $BtnCollection[0].value + "-job-1.txt", true, "", jobMessage);
                                    $(".flip").empty();
                                    $(".flip").remove();
                                    break;
                                case "courier":
                                    removeMessage();
                                    Ajax("get", "./src/txt/" + $BtnCollection[0].value + "-job-2.txt", true, "", jobMessage);
                                    $(".flip").empty();
                                    $(".flip").remove();
                                    break;
                                case "driver":
                                    removeMessage();
                                    Ajax("get", "./src/txt/" + $BtnCollection[0].value + "-job-3.txt", true, "", jobMessage);
                                    $(".flip").empty();
                                    $(".flip").remove();
                                    break;
                                case "trainee":
                                    removeMessage();
                                    Ajax("get", "./src/txt/" + $BtnCollection[0].value + "-job-4.txt", true, "", jobMessage);
                                    $(".flip").empty();
                                    $(".flip").remove();
                                    break;
                                case "others":
                                    removeMessage();
                                    Ajax("get", "./src/txt/" + $BtnCollection[0].value + "-job-5.txt", true, "", jobMessage);
                                    $(".flip").empty();
                                    $(".flip").remove();
                                    break;				
                            }
                        })




//轮播图，给按钮添加事件；
var postList = document.getElementsByClassName("poster-list")[0];
var $LiCollection = postList.getElementsByTagName("li");
function carouselRight() {
    $(".poster-next-btn").off();
    var $LiCollection = postList.getElementsByTagName("li");
    var i;
    var len = $LiCollection.length;
    var num;
    for(i = 0; i < len; i ++){
        if($LiCollection[i].offsetLeft == 129) {
            $LiCollection[i].style.zIndex = 2;
            num = i;
        }
    }
    //按右
    var move = setInterval(function () {
        clearInterval(move);
        if($LiCollection[num]) {
            if($LiCollection[num].style.zIndex == 2) {
                clearInterval(move);
                for(i = 0; i < len; i++) {
                    switch($LiCollection[i].offsetLeft) {
                        case 0:
                            $($LiCollection[i]).animate({left: 570}, 350);
                            break;
                        case 43:
                            $($LiCollection[i]).animate({left: 0, top: 90, zIndex: 0, width: 328, height: 190, opacity: 0.3}, 350);
                            break;
                        case 86:
                            $($LiCollection[i]).animate({left: 43, top: 66, zIndex: 1, width: 410, height: 238, opacity: 0.5}, 350);
                            break;
                        case 129:
                            $($LiCollection[i]).animate({left: 86, top: 36.5, zIndex: 2, width: 514, height: 297, opacity: 1}, 350);
                            break;
                        case 298:
                            $($LiCollection[i]).animate({left: 129, top: 0, zIndex: 3, width: 640, height: 370, opacity: 1}, 350);
                            break;
                        case 445:
                            $($LiCollection[i]).animate({left: 298, top: 36.5, zIndex: 2, width: 514, height: 297, opacity: 1}, 350);
                            break;
                        case 570:
                            $($LiCollection[i]).animate({left: 445, top: 66, zIndex: 1, width: 410, height: 238, opacity: 0.5}, 350);
                            break;					
                    }
                }
                
            }
        }
            
    },0)
    $(".poster-next-btn").on("click", carouselRight);
}


$(".poster-next-btn").on("click", carouselRight);
$(".poster-prev-btn").on("click", carouselLeft);


function carouselLeft() {
    $(".poster-prev-btn").off();
    var $LiCollection = postList.getElementsByTagName("li");
    var i;
    var len = $LiCollection.length;
    var num;
    for(i = 0; i < len; i ++){
        if($LiCollection[i].offsetLeft == 129) {
            $LiCollection[i].style.zIndex = 2;
            num = i;
        }
    }
    var move = setInterval(function () {
        clearInterval(move);
        if($LiCollection[num]) {
            if($LiCollection[num].style.zIndex == 2) {
                clearInterval(move);
                for(i = 0; i < len; i++) {
                    switch($LiCollection[i].offsetLeft) {
                        case 570:
                            $($LiCollection[i]).animate({left: 0}, 350);  //第一个位置
                            break;
                        case 445:
                            $($LiCollection[i]).animate({left: 570, top: 90, zIndex: 0, width: 328, height: 190, opacity: 0.3}, 350);   //第一个位置
                            break;
                        case 0:
                            $($LiCollection[i]).animate({left: 43, top: 66, zIndex: 1, width: 410, height: 238, opacity: 0.5}, 350);  //第二个位置
                            break;
                        case 43:
                            $($LiCollection[i]).animate({left: 86, top: 36.5, zIndex: 2, width: 514, height: 297, opacity: 1}, 350);  //第3个位置
                            break;
                        case 86:
                            $($LiCollection[i]).animate({left: 129, top: 0, zIndex: 3, width: 640, height: 370, opacity: 1}, 350);   //第4个位置
                            break;
                        case 129:
                            $($LiCollection[i]).animate({left: 298, top: 36.5, zIndex: 2, width: 514, height: 297, opacity: 1}, 350);   //第5个位置
                            break;
                        case 298:
                            $($LiCollection[i]).animate({left: 445, top: 66, zIndex: 1, width: 410, height: 238, opacity: 0.5}, 350);  //第6个位置
                            break;					
                    }
                }
                
            }
        }
            
    },0)
    $(".poster-prev-btn").on("click", carouselLeft);
}
require("../less/demo2.less");
var tool = require('./tool.js');

var obj2 = {
    init : function () {
        this.bindEvent();
    },  
    bindEvent: function () {
        var dom = tool.getDom("demo2");
        dom.onclick = this.changeSize;
    },
    changeSize: function () {   
        this.style.width = "200px"; 
    }
}

module.exports = obj2;
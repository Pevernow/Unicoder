const clipboard = require("electron").clipboard;
console.log("preloaded")
function copy(str){
    alert();
   clipboard.writeText(str);
}
function ch2Unicdoe(str){
	if(!str){
		return;
	}
	var unicode = '';
	for (var i = 0; i <  str.length; i++) {
		var temp = str.charAt(i);
		unicode += '\\u' +  temp.charCodeAt(0).toString(16);
	}
	return unicode;
}
window.onkeydown = function () {
    if (13 == event.keyCode) {
        //On enter
        var text=document.getElementById("input").value;
        copy(ch2Unicdoe(text));
    }
}
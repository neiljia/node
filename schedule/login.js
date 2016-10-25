var http = require('http');
var info = require('./infor');
var icon = require('iconv-lite');
var BufferHelper = require('bufferhelper');

var Cookies;
var username;
var infor;
var html;
function login(Cookie,username,callback){
	Cookies = Cookie;
	this.username = username;
	var options_two = {
	    hostname:'222.24.62.120',
	    path:'/xs_main.aspx?xh='+username,
	    method: 'GET',
	    headers: {  
	            Referer:'http://222.24.62.120/xs_main.aspx?xh='+username,
	            Cookie: Cookies
	    } 
	};
	var req_two = http.request(options_two,function(){
	       		 texts();
	 });
	req_two.end(); 
	function texts(){
		var options_three = {
		    hostname:'222.24.62.120',
		    path:'/xskbcx.aspx?xh='+username+'&xm=%BC%D6%D3%EE%B6%AB&gnmkdm=N121603',
		    method: 'GET',
		    headers: {  
		            Cookie: Cookies,
		            Referer:'http://222.24.62.120/xskbcx.aspx?xh='+username+'&xm=%BC%D6%D3%EE%B6%AB&gnmkdm=N121603'
		    }  
		};
		var req_three = http.request(options_three,function(res){
		    var bufferHelper = new BufferHelper();
		       res.on('data', function (chunk) { 
		            bufferHelper.concat(chunk);
		        });
		       res.on('end',function(){
		        	html = icon.decode(bufferHelper.toBuffer(),'GB2312');
		        	info.infomation(html,function(data){
		        		callback(data);
		        	});
		       });
		  });
		req_three.end(); 
	};
}



exports.login = login;
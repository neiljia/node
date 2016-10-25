var http = require('http');
var url = require('url');
var qs = require('querystring');

var kbinfo = require('./kbinfo.js');


var server =  http.createServer(function (req,res){                   
  var query = qs.parse(url.parse(req.url).query);       //获取get参数
  if(req.url == "/favicon.ico"){
  	return;
  }
  else{
	  res.writeHead(200, {
			'Content-Type' : 'application/json;charset=utf-8',
		});
	  kbinfo.get_info(query['username'],query['password'],function(data){
	  		 var params = url.parse(req.url, true);  
			  if (params.query && params.query.callback) {  
			    var strs =  params.query.callback + '(' + data + ')';
			    res.end(strs);  
			  } else {  
			    res.end(data);

			  }        		
	  });  
	}
}).listen(8000);

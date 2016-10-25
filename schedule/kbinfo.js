var http = require('http');
var qs = require('querystring');
var login = require('./login.js')
var name;
var pass;
var infor;
function get_info(username,password,callback){
	name = username;
	pass = password;
	var data = {  
    __VIEWSTATE:'dDwxMTE4MjQwNDc1Ozs+YofaNxf5dpXqcC3ZAqYdKfPCdbw=',
    TextBox1: name,  
    TextBox2: pass,
    RadioButtonList1:'%D1%A7%C9%FA',
    Button1:'+%B5%C7+%C2%BC+'

	};  
	var content = qs.stringify(data);
	var options = {
		hostname: '222.24.62.120',   
	    path: '/default4.aspx',  
	    method: 'POST',
	    headers: {
	    'Content-Type':'application/x-www-form-urlencoded',
	    'Content-Length':content.length
	    }
	}
	var req = http.request(options, function (res) {   
	    data = res.headers;
	    console.log(data);
	    var Cookies = data['set-cookie'].toString().split(';')[0];
	    login.login(Cookies,name,function(date){
	    	callback(date);
	    });
	});  
	req.write(content+'\n');
	req.end();

}
exports.get_info = get_info;
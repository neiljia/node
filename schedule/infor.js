var  cheerio = require('cheerio');
var qs = require('querystring');
function infomation(html,callback){
   var $ = cheerio.load(html,{decodeEntities: false});
   var math = {};
   var classs = []; 
   var i=0;
   $('.blacktab').find('tr').each(function(idx,element){
        var $element = $(element);
        if(i<9 && i%2==0 && i!=0){
            $element.find('td').each(function(idx,elements){
                var $elements = $(elements);
                if($elements.text() != '&nbsp;' && $elements.text().length > 3){
                     var clas = $elements.html().split('<br>');
                     var k;
                    for(var j=0;j<clas.length;j){
                        if(clas[j] == ''){
                            j++;
                        }                   
                        classs.push({
                          Title:clas[j++],
                          Time:clas[j++],
                          Teacher:clas[j++],
                          dress:clas[j++]
                        });                   
                    }
                }
            });
        }
        i++;
   });
   math.Result = true;
   math.Detail = classs;
  var content =JSON.stringify(math);
   callback(content);
}



exports.infomation = infomation;

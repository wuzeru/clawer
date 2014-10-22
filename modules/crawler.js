/**
 * Created by zeru on 14-10-20.
 */
var http = require('http'),
    cheerio = require('cheerio');

var crawler = {};

crawler.getUrl = function(url,callback){
    //var _res = res;

    http.get(url,function(res){
        var chunks = [],
            size = 0;
        res.on("data" , function(chunk){
            chunks.push(chunk);
            size += chunk.length;
        });
        res.on("end" , function(){
            //拼接buffer
            var data = Buffer.concat(chunks , size);
            var html = data.toString();

            return callback(html);
        })
    }).on('error' , function(e){
        console.log("error:"+e.message)
    });
};

crawler.getLists = function(url,callback){
    crawler.getUrl(url,function(html){
        var $ = cheerio.load(html);

        var feeds_item = $(".feeds-item-detail");
        var result = [];
        for(var i= 0,len=feeds_item.length;i<len;i++){
            var news = {};
            var urlStr = $(".feeds-item-detail h3")[i].children[0].attribs.href.split('/');

            news.title = $(".feeds-item-detail h3").eq(i).text();
            news.href = urlStr[urlStr.length - 1];
            result.push(news);
        }
        return callback(result);
    })
};

crawler.getNews = function(url,callback){
    crawler.getUrl(url,function(html){
        var $ = cheerio.load(html);
        var results = {
            title:$('.l-main-col #page h1').html(),
            content:$('.article-detail').html()
        }
        return callback(results);
    })
}

module.exports = crawler;

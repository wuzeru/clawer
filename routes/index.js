var express = require('express');
var router = express.Router();

var crawler = require('../modules/crawler');

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
    var url = "http://baijia.baidu.com/";
    crawler.getLists(url,function(results){
        res.render('index',{results:results});
    });
});

router.get('/news/:id',function(req,res){
    var id = req.param('id');
    var url = 'http://baijia.baidu.com/article/'+id;
    crawler.getNews(url,function(results){
        res.render('news',{results:results});
    })
});
module.exports = router;


var express = require('express');
var router = express.Router();
var Blog = require('../model/Blog.js');


/* GET users listing. */
router.post('/create_blog', function(req, res) {
	try{
		var blog = new Blog({
			name :  req.body.blog,
			description : req.body.blog_description
		});
		blog.save(function(err,doc){

			if(err)
				console.log(err)

			res.render('blog',{
				blog : blog
			})
		})
	}catch(e){
	}
});

router.get('/new_blog',function(req,res){

	res.render('blog_new');
});

router.get('/list_all_blogs',function(req,res){
	Blog.find({},function(err,docs){
		res.render('all_blogs',{
			blogs : docs
		})
	})
})

module.exports = router;


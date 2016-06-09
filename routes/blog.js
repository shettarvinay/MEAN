
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

router.put('/edit/:_id',function(req,res){
	console.log("This is id sent")
	console.log(req.params._id);
	var _id=req.params._id;
	Blog.find({_id : _id},function(err,doc){
		res.render('edit_blog',{
			blog : doc
		})
	})
})

router.post('/update_blog',function(req,res){
	var _id = req.body._id;
	var desc = req.body.desc;

	console.log(req.body._id)

	Blog.update({_id : _id},{ description : desc},function(err,raw){
		if(raw.ok){
			Blog.find({_id : _id},function(err,doc){
				console.log('The raw response from Mongo was ', doc);
				res.render('show_blog',{
					blog : doc
				});
			});	
		}
		
	});
});

module.exports = router;



var express = require('express');
var router = express.Router();
var Blog = require('../model/Blog.js');
var loadtest = require('loadtest');

/* GET users listing. */
router.post('/create_blog', function(req, res) {
	console.log(req.params)
	try{
		var blog = new Blog({
			name :  req.body.blog,
			description : req.body.blog_description,
			created_at : Date.now(),
			updated_at : Date.now()
		});
		blog.save(function(err,doc){

			if(err)
				console.log(err)

			// res.render('blog',{
			// 	blog : blog
			// })
			res.redirect('/angular');
		})
	}catch(e){
	}
});

// router.get('/loadtest',function(req,res){
// 	var options = {
// 		url: 'http://localhost:3000/blogs/create_blog',
// 		concurrent: 1,
// 		params : 'htllo',
// 		method: 'POST',
// 		body:'fsfhlsfhls',
// 		requestPerSecond:1,
// 		maxSeconds:1,
// 	};


// 	loadtest.loadTest(options, function(error, results)
// 	{
// 		if (error)
// 		{
// 			console.log('Got an error: %s', error);
// 		}
// 		console.log(results);
// 			res.send(200)
// 	});
// })

router.get('/new_blog',function(req,res){
	console.log("pppppppppppppppport is "+express().get('port'));
	res.render('blog_new',{active_tab : 'new_blog'});
});

router.get('/angular',function(req,res){

	res.render('angular_blogs_listing',{active_tab : 'ang_blog'});
});

router.get('/blue_print',function(req,res){

	res.render('blog_listing_layout');
});

router.get('/list_all_blogs',function(req,res){
	Blog.find({},function(err,docs){
		res.render('all_blogs',{
			blogs : docs,
			active_tab : 'view_blog'
		})
	})
})

router.get('/blogs_json',function(req,res){
	Blog.find({},function(err,docs){
		res.json({
			blogs : docs
		})
	})
})

router.post('/delete_blogs',function(req,res){
	Blog.remove({_id : req.body._id},function(err,docs){
		res.send('OK');
	});
});

router.get('/',function(req,res){
	Blog.find({},function(err,docs){
		res.render('all_blogs',{
			blogs : docs,
			active_tab : 'view_blog'
		})
	})
	  // res.render('main_layout', {user: req.user});
})

router.get('/signin', function(req, res){
  res.render('sign_in');
});

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

	Blog.update({_id : _id},{ description : desc,updated_at : Date.now()},function(err,raw){
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

router.get('/get_stats',function(req,res){
	res.render('stat_page.ejs',{active_tab : 'stats_blog'});
});

router.get('/get_stats_json',function(req,res){
	Blog.aggregate([
			{
				$project :  {
								month_list: { $month: "$created_at" },
					            day_list: { $dayOfMonth: "$created_at" },
					            hour_list: { $hour: "$created_at" },
					            minutes_list: { $minute: "$created_at" }
				}
			}
			,{
				$group : {
					_id:{month:"$month_list",day:"$day_list",hour:"$hour_list"},//,},
					//month : {$addToSet:"$month_list"},
					day : {$addToSet:"$day_list"},
					hour :{$addToSet:"$hour_list"},
					min :{$addToSet:"$minutes_list"},
					total_blogs : {$sum : 1}
				}
			},
			{
				$sort : {
					total_blogs : 1
				}
			}
		],function(err,doc){

		res.json({
			stats : doc
		})
	});
});

module.exports = router;


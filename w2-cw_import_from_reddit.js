var MongoClient = require('mongodb').MongoClient,
	request = require('request');
var connString = 'mongodb://localhost:27017/course';
var redditString = 'http://www.reddit.com/r/technology/.json';
MongoClient.connect(connString, function(err, db){  

	request(redditString, function(error, response, body) { 
		if(!error && response.statusCode == 200){
			var obj = JSON.parse(body);
			var stories = obj.data.children.map(function(s){return s.data;});

			db.collection('reddit').insert(stories, function(err, data) { 
			if(err) throw err;
			console.dir(data);
			db.close();
			console.log('db insert completed');
			});
		}
	});
});

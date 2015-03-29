var MongoClient = require('mongodb').MongoClient;
var connString='mongodb://localhost:27017/course';
MongoClient.connect(connString, function(err, db){ 
	if(err) throw err;
	
	var query = {grade : 100};
	var projection = {'student':1,'_id':-1};
	db.collection('grades').find(query, projection).toArray(function(err, doc) { 
		if(err) throw err;
		doc.forEach(function(s){ 
			console.log(s.student +' is a good student');
		});
		db.close();
	});
	
	console.log('query execution completed');
});

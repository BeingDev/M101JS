var MongoClient = require('mongodb').MongoClient;
var connStr = 'mongodb://localhost:27017/course';
MongoClient.connect(connStr, function(err, db){ 
	if(err) throw err;

	var grades = db.collection('grades');

	var options = {skip:1, limit:4, sort:[["grade", 1],["student", -1]]};

	var cursor = grades.find({}, {}, options);

	cursor.each(function(err, doc){
		if(err) throw err;
		if(db== null) {return db.close();}
		console.dir(doc);
	});

	console.log('query operation completed');
});

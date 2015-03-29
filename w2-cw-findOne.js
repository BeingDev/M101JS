var MongoClient = require('mongodb').MongoClient;
var connectionString='mongodb://localhost:27017/course';
MongoClient.connect(connectionString, function(err, db){
	if(err) throw err;
	
	var query = {'grade' : 100};

	var cursor = db.collection('grades').find(query);
	
	cursor.each(function(err, doc){
		if(err) throw err;
		if(db == null) { return db.close(); }
		console.log(doc);
	});
});

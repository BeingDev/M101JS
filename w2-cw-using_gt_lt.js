var MongoClient = require('mongodb').MongoClient;
var connString = 'mongodb://localhost:27017/course';
MongoClient.connect(connString, function(err, db){ 
	if(err) throw err;

	var query = {grade:{$gt:69, $lt:80}};
	
	db.collection('grades').find(query).each(function(err, doc){
		if(err) throw err;
		
		if(db==null){
			return db.close();
		}

		console.dir(doc);
		
	});
	console.log('query execution completed');
});

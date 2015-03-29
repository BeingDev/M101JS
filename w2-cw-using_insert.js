var MongoClient = require('mongodb').MongoClient;
var connString = 'mongodb://localhost:27017/course';
MongoClient.connect(connString, function(err, db){
	if(err) throw err;
	console.log('connected to server');
	var docs = [{name:'Tim', age:22}, {name:'Jim', age:21}];
	db.collection('students').insertMany(docs, function(err, inserted){
		if(err) throw err;
		console.log('successfully inserted '+ JSON.stringify(inserted));
		return db.close();
	});
	console.log('Insertion completed');
});

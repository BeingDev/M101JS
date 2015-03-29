var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/course';
MongoClient.connect(url, function(err, db){
	if(err) throw err;
	console.log('connected to database');
	var query = {assignment:'hw1'};
	var operator = {$set:{date_graded:new Date()}};
	var operator1 = { $unset :{date_graded:''}};
	var options = {multi:true};

	console.log('stating "replacement" update');

	db.collection('grades').findOne(query, function(err, doc) {
		if(err) throw err;

		if(!doc) { console.log('no document found'); return db.close();}
		
		query['_id'] = doc['_id'];

		doc['date_graded'] = new Date();

		db.collection('grades').update(query, doc, function(err, updated){
		if(err) throw err;
		console.log('replacement update completed '+ JSON.stringify(updated));
		console.log('starting "inplace" update');
        	db.collection('grades').update(query, operator , function(err, updated){
                	if(err) throw err;
                	console.log('inplace update completed' + JSON.stringify(updated));
        	console.log('starting "Multi" update');

        	db.collection('grades').update(query, operator, options, function(err, updated){
                	if(err) throw err;
                	console.log('multi update completed' + JSON.stringify(updated));                 return db.close();
        });
        });

		});
	});
});



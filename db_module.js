var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/';
console.log("MongoDB");


// Inserting
exports.insertData = function (name, email, eid, type, branch, response)
 {

    MongoClient.connect(url, function (err, db) {
        if (err) 
            throw err;
        
        var dbcon = db.db('WTdemo');
        var msg = "";
        var myobj
         = {
            "name": name,
            "email": email,
            "eid": eid,
            "type": type,
            "branch": branch
        };
        dbcon.collection("customers").insertOne(myobj, function (err, res) 
		{
            if (err)
			{
                console.log(err);
                msg = "Data Not inserted";
            } else
			{
                msg = "Name:" + name + " Email:" + email + " EmpId:" + eid + " Type:" + type + " Branch:" + branch + "  ***Inserted***";
                console.log("Document inserted");
            } response.write(msg);
            response.end();
            db.close();
        });

    });

};


// Retriving
exports.retriveData = function (email, response) 
{

    MongoClient.connect(url, function (err,db)
     {
        if (err) 
            throw err;
        
        var dbcon = db.db('WTdemo');
        var msg = "";
        var query = 
        {
            "email": email
        };
        console.log(query);
        dbcon.collection("customers").find({'branch':'sales'}).toArray(function (err, result) {
            if (err) {
                console.log(err);
                msg = "Error!!!";
            } else {
                console.log(result);

                var Length = result.length;

                msg = "<table border='1'><tr><th>S.No</th><th>Name</th></th><th>EmployeeId</th></th><th>Email</th><th>Job Type</th><th>Branch</th></tr>";
                for (var i = 0; i < Length; i++) {
                    msg += "<tr><td>" + (i + 1) + "</td><td>" + result[i].name + "</td><td>" + result[i].eid + "</td><td>" + result[i].email + "</td><td>" + result[i].type + "</td><td>" + result[i].branch + "</td></tr>";
                }

                msg += "</table>";

            }
            response.write(msg);
            response.end();
            db.close();

        });


    });

};

// updating

exports.updateData = function (eid, type, branch, response) {
    MongoClient.connect(url, function (err, db) {
        if (err) 
            throw err;
        
        var msg = ' ';
        var dbcon = db.db('WTdemo');
        var myquery = {'eid': eid};
        var val = {$set: {'type': type,'branch': branch} };
        dbcon.collection("customers").updateOne(myquery, val, function (err, res) {

            if (err) 
            {
                console.log(err);
                msg = 'Error!!';
            } 
            else
            {
                msg = "updated type :" + type + " and branch:" + branch;
                console.log("Document updated");
            }
            response.write(msg);
            response.end();
            db.close();
        });
    });
};

// deleting
exports.deleteData = function (eid,response)
 {
    MongoClient.connect(url, function (err, db)
	 {
        if (err) 
            throw err;
        var msg = ' ';
        var dbcon = db.db('WTdemo');
        var myquery = {'eid': eid};
        dbcon.collection("customers").deleteOne(myquery,function (err, res)
		 {
            if (err) 
			{
                console.log(err);
                msg = 'Error!!';
            }
			else 
			{
                msg = "Deleted Document whose eid :" + eid;
                console.log("Document updated");
            } response.write(msg);
            response.end();
            db.close();
        });
    });
};

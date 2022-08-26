var module = require('./db_module');
var url = require('url');
querystring = require('querystring');
var http = require('http');

http.createServer(function (request, response) 
{
    var data1 = '';
    request.on('data', function (chunk) 
    {
        data1 += chunk;
    });
    request.on('end', function ()
     {
        var name = querystring.parse(data1)["username"];
        console.log(name);

        var email = querystring.parse(data1)["email"];
        console.log(email);

        var eid = querystring.parse(data1)["eid"];
        console.log(eid);

        var type = querystring.parse(data1)["type"];
        console.log(type);

        var branch = querystring.parse(data1)["branch"];
        console.log(branch);

        if (request.url === '/retrive') {
            module.retriveData(email, response);
        } 
        else if (request.url === '/insert') {
            module.insertData(name, email, eid, type, branch, response);
        }
         else if (request.url === '/update') {
            module.updateData(eid, type, branch, response);
        }
        else if (request.url === '/delete') {
          module.deleteData(eid,response);
        }
    });
}).listen(3000);
console.log("Server started");

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var config =
    {
        userName: 'myadmin', // update me
        password: 'Miracle@123', // update me
        server: 'miltestdbserver.database.windows.net', // update me
        options:
        {
            database: 'miltestdb' //update me
            , encrypt: true
        }
    }

    if ((req.body.username) || (req.body.pass)) {
        context.log("Inside")
        var user = req.body.username;
        var pass = req.body.pass;

        var connection = new Connection(config);
            connection.on('connect', function (err) {
                if (err) {
                    context.log(err)
                }
                else {
                    context.log("database connected")
                    
               
	request1 = new Request(
                                            "INSERT INTO sample_table(username,password) VALUES('" + user + "','" + pass + "')",
                                            function (err, re) {
                                                if (err) {
                                                    context.log(err)
                                                }
                                                else {
													context.log("Data inserted successfully")
													//res.send("Login success");
                                                    context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello  Login  successfull" 
        };
												}
											});
											connection.execSql(request1);

											 }
            }
            );

        
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};
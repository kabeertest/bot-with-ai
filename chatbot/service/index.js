var express = require('express');
var app = express();
app.use(function(req,res,next)
{
	console.log("Adding CORS support inside the intializing Chatbotservice function ");
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type, Authorization');

    // Pass to next layer of middleware
	next();
});


app.get('/',function (req, res)   {
    console.log("called"+req.query.user) ;    
   // res.send('Hello World!') ;
    var apiai = require('apiai');
    
   var app = apiai("018ef1c5afdf4d278f526e4ebb9c9e6e");
    
   var request = app.textRequest(req.query.user, {
       sessionId: '123456'
   });
    
   request.on('response', function(response) {
       var mine=response.result
     //  console.log(typeof(mine));
	 console.log("mine",mine)
       console.log(mine['fulfillment'].speech);
	   if(mine.action=='undefined'){
		  mine.action="noaction" 
	   }
	   var actionwithresponce=mine['fulfillment'].speech+"##"+mine.action+"##"+mine.actionIncomplete
	   console.log(actionwithresponce)
       res.send(actionwithresponce) ;
   });
    
   request.on('error', function(error) {
    res.send(mine['fulfillment'].speech) ;
       console.log(error);
   });
    
   request.end();

})

app.listen(3006, () => console.log('Example app listening on port 3006!'))

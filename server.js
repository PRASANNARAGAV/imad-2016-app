var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool =require('pg').Pool;

var config ={
    user:'prasannaragav',
    database:'prasannaragav',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD

    };
    



var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
     res.sendFile(path.join(__dirname, 'ui','index.html'));
  
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



function createTemplate (data){
    var title= data.title;
    var date= data.date;
    var heading= data.heading;
    var content=data.content;
    
    var htmlTemplate = `
    <html>
     <head>
      <title>
        ${title}
         </title>
         <meta name="viewport" content "width-device-width,initial-scale-1" />
          <link href="/ui/style.css" rel="stylesheet" />
    </head>
    
    <body>
     
     <div class= "container" >
     <div> <a href=/>HOME</a
     </div>
     <hr/>
     <h3>${heading}</h3>
     <div>
     ${date.toDateString()}</div>
     
     <div>${content}
     </div>
     </div>
     </body>
     </html>
     ` ;
     
     return htmlTemplate;
     }

var q="mech";
var pool = new Pool(config);
app.get('/test-db', function(req,res) {
    //make a select request and return response with results
    pool.query('SELECT * FROM "student" WHERE "dept"="'"mech"'" ', function(err, result){
       if (err)
       {
           res.status(500).send(err.toString());
       }
       else
       {
           res.send(JSON.stringify(result));
       }
       
    });
});
app.get('/article-one', function (req, res) {
     res.sendFile(path.join(__dirname, 'ui','Article-one.html'));
     
  
});
app.get('/Article-two', function (req, res) {
     res.sendFile(path.join(__dirname, 'ui','Article-Two.html'));
     
});
var counter=0;
app.get('/counter',function (req,res) {
    counter=counter+1;
    res.send(counter.toString());
    
});

    var articleName;
    app.get('/articles/:article-one', function(req,res){
     articleName=article-one;
    
     pool.query('SELECT * from "articles" WHERE "Title"=$1',[req.paramas.articleName],function(err,result){
        if(err) {
            
        res.status(500).send(err.toString());
        }  else {
                 if(result.row.length=== 0) {
                    res.status(404).send('Article Not Found');
        }   else{
            var articleData = results.rows[0];
             res.send(createTemplate(articleData));
        }
            
        }
        
    });
    
    
   
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));


});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

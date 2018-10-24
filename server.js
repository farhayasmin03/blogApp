 var express = require('express');
 var app = express();
 var http = require('http').Server(app);

 app.set('view engine', 'ejs');
 const bodyParser = require('body-parser');
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true
 }));
 app.use(express.static('public'));
 var mongo = require('mongodb');
 const MongoClient = require('mongodb').MongoClient;
 const assert = require('assert');

 // Connection URL
 const url = 'mongodb://localhost:27017';

 // Database Name
 const dbName = 'myproject';

 // Create a new MongoClient
 const client = new MongoClient(url);

 // Use connect method to connect to the Server
 client.connect(function (err) {
     assert.equal(null, err);
     console.log("Connected successfully to server");

     // const db = client.db(dbName);

     client.close();
 });
//  app.get('/',function(req,res){
//      res.render(home);

//  });
//  app.get('/login',function(rq,res){
//      res.render(loginPage)
//  })


 app.get('/', function (req, res) {
   // res.render(home);


     client.connect(function (err) {
         assert.equal(null, err);
         //console.log(res.item);
         const db = client.db(dbName);

         db.collection('user-data').find({}).toArray(function (err, posts) {
             console.log(posts);
             res.render('blogPage', {
                 posts: posts
             });
         });
     });
     //res.setHeader('Content-Type', 'text/html');
 });
 app.post('/insert', function (req, res) {
             var item = {
                 title: req.body.title,
                 content: req.body.content
             };
             console.log(item);
             client.connect(function (err) {
                 assert.equal(null, err);
                 //console.log(res.item);
                 const db = client.db(dbName);
                 db.collection('user-data').insertOne(item, function (err, result) {
                     if (err)
                         console.log(err)
                     else {
                         res.redirect('/');
                         console.log("inserted");
                     }

                 });

                 // const db = client.db(dbName);
                
                 client.close();
             });
            });
           
            
              app.post('/delete', function (req, res, next) {
          //var id = '5bc9745523b2a0c5a7c6864b';

                 
                 db.collection('user-data').deleteOne({ "_id" : ObjectId("5bca2fa074bbb8cb01a9e8c3") });
                 console.log('delete');
              });
             http.listen(3000, function () {
                 console.log('listening on *:3000');
             });
            

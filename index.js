const yelp = require('yelp-fusion');
const express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var url = "mongodb://harshasanjeeva:varsha1@ds229290.mlab.com:29290/295";

// mongodb://<dbuser>:<dbpassword>@ds229290.mlab.com:29290/295
const dbName = '295';
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const fpe = require('node-fpe');
const cipher = fpe({password: 'secret'})
 //f', 'a', 'k', 'e', 'E',

const apiKey = '6wQDMzOqQ7lRAzfOyQS0VZsRxL-rspsA6KSm9PSD1CnhjKDl5YDJ789VUpcQUOPNSH5g5ITTZldYWzToQHywVHO0nbk3vb7beHh2QxPlAmpsvqKt01-PI7tGjgzqWnYx';
const client = yelp.client(apiKey);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors(corsOptions));


app.listen(3001, () => console.log('Server running on port 3001'))



app.post('/api', (req, res) => {  
  console.log("body of the incoming request",req.body)
  console.log("User's requesting for:",req.body.data.query)
  console.log("User's location:",req.body.data.ll)
  var encry = cipher.encrypt('37')
  var enlong = cipher.encrypt('122')
  console.log("latitude encryption of the user",encry)
  console.log("latitude encryption of the user",enlong) 


  MongoClient.connect(url, function(err,db) {
    if(err){
      console.log("erjkbr",err)
    }else{
    console.log("successfull")
   var col = db.collection('user');
var data={
  "lat":'37',
  "long":'122',
  "after_encryption_lat":encry,
  "after_encryption_long":enlong
}
   // console.log("db",db)
      col.insertOne({data},function(err, doc){
        if(err){
          console.log("err",err)
        }else{
          console.log("successfull")
        }
      })
    }
  });


  client.search(req.body.data.searchRequest).then(response => {
  res.send(response)
}).catch(e => {
  console.log(e);
})

})

app.post('/fake', (req, res) => {
  console.log("1",)
  
// var encry = cipher.encrypt(req.body.data)
// console.log("cipher",encry)
//  var decry= cipher.decrypt(encry)
// console.log("decry",decry)

  res.send({"message":"fake requests"})
})






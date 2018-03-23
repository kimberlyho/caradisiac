const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
var fs = require('fs');
var jsonfile = require('jsonfile');
var elasticsearch = require('elasticsearch');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


async function getBrand(){
  const brands = await getBrands();
  return brands;
}

async function getModel(string){
  const models = await getModels(string);
  return models;
}

let brands = getBrand();
var list=[];
brands.then(function(result){
  for (var i = 0; i < result.length; i++) {
    details = getModel(result[i]);
    details.then(function(res){
      res.forEach(function(ele){
        list.push(ele)
      })
      var json = JSON.stringify(list)
      fs.writeFile('caradisiac.json',json,'utf8');
    })
  }
});

const port = 9292;
app.listen(port, () => {
  console.log('We are live on ' + port);
});

app.get('/populate',function(req,res){

  var file = "./caradisiac.json";
  var caradisiac = jsonfile.readFileSync(file);

  var client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
  });

  var body = [];
  for (var i = 0; i < caradisiac.length; i++ ) {
      var config = { index:  { _index: 'caradisiac', _type: 'suv', _id: i } };
      body.push(config);
      body.push(caradisiac[i]);
  }

  client.bulk({
      body: body
  }, function (error, response) {
      if (error) {
          console.error(error);
          return;
      }
      else {
          console.log(response);
      }
  });
  res.send("Data well saved in elasticsearch");
})


app.get('/suv', function(req,res){

  var file = "./caradisiac.json";
  var caradisiac = jsonfile.readFileSync(file);

  var client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
  });

  client.search({
    index: 'caradisiac',
    type: 'suv',
    body:{
      "size":80,
      "sort":[
        {"volume.keyword" :{"order":"desc"}}
      ]
    }
  },function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");
      res.send(response.hits.hits);
    }
  });

})

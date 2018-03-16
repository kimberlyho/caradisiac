const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
var fs = require('fs');
var elasticsearch = require('elasticsearch');


async function getBrand(){
  const brands = await getBrands();
  return brands;
  console.log(brands);
}

// var allcaradisiac ={};
async function getModel(string){
  const models = await getModels(string);
  console.log(models);
  // allcaradisiac.push(models);
  var json = JSON.stringify(models);
  fs.writeFile('caradisiac.json', json, 'utf8');
}

let brands = getBrand();
// console.log(brands);

brands.then(function(result){
  // console.log(result);
  for (var i = 0; i < result.length; i++) {
    details = getModel(result[i]);

  }
});
// console.log(models);
// allcaradisiac.push(models)
// fs.writeFile('caradisiac.json', json, 'utf8');
// fs.writeFile('caradisiac.json', json, 'utf8');

// var allcaradisiac ={};
// var json = JSON.stringify(allcaradisiac);
//
// // console.log(brands);
// for (var i = 0; i < result.length; i++) {
//   console.log('HI !!!!');
//   // details = getModel(brands[i]);
//   // console.log(details);
//   // allcaradisiac.push(details)
// }
// fs.writeFile('caradisiac.json', json, 'utf8');



// var client = new elasticsearch.Client({
//     host: '192.168.99.100:9292',//'localhost:9292',
//     log: 'trace'
// });
//
// var body = [];
// for (var i = 0; i < stocks.length; i++ ) {
//
//     var config = { index:  { _index: 'stocks', _type: 'stock', _id: i } };
//     body.push(config);
//     body.push(stocks[i]);
// }
//
// client.bulk({
//     body: body
// }, function (error, response) {
//     if (error) {
//         console.error(error);
//         return;
//     }
//     else {
//         console.log(response);  //  I don't recommend this but I like having my console flooded with stuff.  It looks cool.  Like I'm compiling a kernel really fast.
//     }
// });

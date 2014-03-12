var fs = require('fs');
var Terraformer = require('terraformer');
var argv = require('minimist')(process.argv.slice(2));
var readline = require('readline');


if (argv.f) {

  process.stdin.setEncoding('utf8');

  var geojson = JSON.parse(fs.readFileSync(argv.f, {'encoding':'utf-8'}));
  var polygon = new Terraformer.Primitive(geojson);

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false 
  });

  rl.on('line', function (line) {
    var row = line.split("\t");
    var point = new Terraformer.Primitive({
      "type": "Point",
        "coordinates" : [parseFloat(row[5]), parseFloat(row[4])]
      });

    if (point.within(polygon)) { 
        process.stdout.write(line + "\n");
    }

  });
  

} else { 
  console.log("Usage: unzip -p allCountries.zip | geochop -f <filterfile>");
  console.log("<filterfile> contains a GeoJSON geometry to filter on");
}







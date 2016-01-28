console.log('wgs2ms');
var fs = require("fs");
var proj4 = require("proj4");
var cli = require('cli');

cli.parse({
    infile:   ['i', 'Input file name'],
    outfile:  ['o', 'Output file name']
  });


var filename = "tests/lote102.json";
var ESPG = [{
  name: "MAGNA-SIRGAS / Colombia Far West zone",
  EPSGNum: 3114,
  EPSG: "EPSG:3114",
  proj4: "+proj=tmerc +lat_0=4.596200416666666 +lon_0=-80.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs "
}, {
  name: "MAGNA-SIRGAS / Colombia West zone",
  EPSGNum: 3115,
  EPSG: "EPSG:3115",
  proj4: "+proj=tmerc +lat_0=4.596200416666666 +lon_0=-77.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs "
}, {
  name: "MAGNA-SIRGAS / Colombia Bogota zone",
  EPSGNum: 3116,
  EPSG: "EPSG:3116",
  proj4: "+proj=tmerc +lat_0=4.596200416666666 +lon_0=-74.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs "
}, {
  name: "MAGNA-SIRGAS / Colombia East Central zone",
  EPSGNum: 3117,
  EPSG: "EPSG:3117",
  proj4: "+proj=tmerc +lat_0=4.596200416666666 +lon_0=-71.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs "
}, {
  name: "MAGNA-SIRGAS / Colombia East zone",
  EPSGNum: 3118,
  EPSG: "EPSG:3118",
  proj4: "+proj=tmerc +lat_0=4.596200416666666 +lon_0=-68.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs "
}];

var coords;

function print(element, index, array) {
  console.log(genXMLrtept(project(element), index));
}

function project(proj) {
  return proj4(ESPG[1].proj4, "EPSG:4326", proj);
}

function genXMLrtept(point, name) {
  var ptstr = "<rtept lat=\"" + point[1] + "\" lon=\"" + point[0] + "\">\n";
  ptstr += "  <name>" + name + "</name>\n";
  overhead = "  <sym>Waypoint</sym>\n" +
    "  <extensions>\n" +
    "    <trp:ViaPoint>\n" +
    "      <trp:CalculationMode>FasterTime</trp:CalculationMode>\n" +
    "      <trp:ElevationMode>Standard</trp:ElevationMode>\n" +
    "    </trp:ViaPoint>\n" +
    "    <gpxx:RoutePointExtension>\n" +
    "      <gpxx:Subclass>000000000000FFFFFFFFFFFFFFFFFFFFFFFF</gpxx:Subclass>\n" +
    "    </gpxx:RoutePointExtension>\n" +
    "  </extensions>\n" +
    "</rtept>";
  ptstr += overhead;
  return ptstr;
}

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  coords = JSON.parse(data);
  coords.coordinates.forEach(print);
});

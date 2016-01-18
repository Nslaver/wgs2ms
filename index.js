var fs = require("fs");
var proj4 = require("proj4");

var filename = "tests/lote101.json";
var mspro = [{
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
var firstProjection = 'PROJCS["NAD83 / Massachusetts Mainland",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",42.68333333333333],PARAMETER["standard_parallel_2",41.71666666666667],PARAMETER["latitude_of_origin",41],PARAMETER["central_meridian",-71.5],PARAMETER["false_easting",200000],PARAMETER["false_northing",750000],AUTHORITY["EPSG","26986"],AXIS["X",EAST],AXIS["Y",NORTH]]';
proj4(firstProjection,[-71,41]);

fs.readFile(filename, 'utf8', function (err, data) {
  if (err) throw err;
  coords = JSON.parse(data);
  coords.coordinates.forEach(project);
});

function project(element, index, array) {
    console.log(proj4(mspro[1].proj4,"EPSG:4326",element));
}





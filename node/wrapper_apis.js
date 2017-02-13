/*
les différentes librairies utilisées
http            : pour créer le serveur
express         : pour faciliter l'écriture bas niveau de node
fast-xml-parser : pour convertir le string xml du serveur en xml
puis convertir ce xml en json
url             : Avoir le nom de l'url
querystring     : faire un dictionnaire à partir des arguments passés en GET dans l'url
*/
var http          = require('http');
var express       = require('express');
var fastXmlParser = require('fast-xml-parser');
var url           = require('url');
var querystring   = require('querystring');
var app           = express();
var terre         = {
  r        : 6371,       // rayon approximatif de la terre en km
  };
var iss           = {
  v           : 27600,   // vitesse de l'iss en km/h
  alt         : 400,     //L’altitude moyenne de l’ISS en km
  inclinaison : 51.64,
  polar       : 90    //l'inclinaison de l'iss en °
  };

function radians(degrees)
{
  return degrees * (Math.PI/180);
}

function degrees(radians)
{
  return radians * (180/Math.PI);
}

function rotate(x,y,z,angle,axis){
  var x_, y_, z_;
  switch(axis){
    case 'x':
      x_ = x;
      y_ = y*Math.cos(angle) - z*Math.sin(angle);
      z_ = y*Math.sin(angle) + z*Math.cos(angle)
      break;

    case 'y':
      x_ = z*Math.sin(angle) + x*Math.cos(angle);
      y_ = y;
      z_ = z*Math.cos(angle) - x*Math.sin(angle);
      break;

    case 'z':
      x_ = x*Math.cos(angle) - y*Math.sin(angle);
      y_ = x*Math.sin(angle) + y*Math.cos(angle);
      z_ = z;
      break;
  }
  return [x_,y_,z_];
}

// on créé le serveur
app.get("/", function (req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    if ('lat' in params){
      	// on ouvre un serveur
          var options = {
      		// on se connecte au serveur api.geonames
              hostname: "api.geonames.org",
              method : 'GET',
      		// on fait appel à une fonction intermédiaire pour créér l'url
              path: create_path_geonames(params['lat'],params['lng'])
          };
          var gsaReq = http.get(options, function (response) {
      		// on envoit la réponse au serveur
              console.log('envoi d\' une requête au serveur');
              var completeResponse = '';
              response.on('data', function (chunk) {
      			// on construit la réponse avec ce que nous envoit le serveur geonames
                  completeResponse += chunk;
              });
              response.on('end', function() {
                  console.log('réponse du serveur reçu');
                  var jsonObj = fastXmlParser.parse(completeResponse);
                  console.log('Conversion XML to JSON terminé');
                  console.log(jsonObj);
                  res.jsonp(JSON.stringify(jsonObj));
                  res.end();
              })
          }).on('error', function (e) {
              console.log('problem with request: ' + e.message);
              res.write('problem with request: ' + e.message);
          });
      }
      else if ("first_connexion" in params) {
        console.log("caclul de la position simulé de l'iss");
        var  calcul = compute_iss_position(params['first_connexion'],params['last_connexion'],params['facteur_vitesse'])
        var jsonObj = { "latitude": calcul[0], "longitude":calcul[1]};
        console.log(jsonObj);
        res.jsonp(JSON.stringify(jsonObj));
        res.end();
        }
});

function create_path_geonames(lat,lng){
    var path = '/extendedFindNearby?lat='
    path    += lat +'&lng='
    path    += lng
    path    += '&username=arnaudgregoire'
    console.log("requête envoyé à l'url : " + path);
    return path
}

function compute_iss_position(first_connexion,last_connexion,facteur_vitesse){
  // calcul de la position de l'iss en mode debug
  var delta_t                = last_connexion - first_connexion;
  var d_parcouru             = (delta_t / 1000000)*iss.v*facteur_vitesse;
  var perimetre_orbite       = 2 * Math.PI * (terre.r + iss.alt);
  var azimuth                = (d_parcouru / perimetre_orbite)*360;
  var azimuth                = azimuth % 360;

  var x                      = terre.r * Math.cos(radians(azimuth)) * Math.sin(radians(iss.polar));
  var y                      = terre.r * Math.sin(radians(azimuth)) * Math.sin(radians(iss.polar));
  var z                      = Math.cos(radians(iss.polar));

  var rotation_y             = rotate(x,y,z,radians(iss.inclinaison),'y');
  x                          = rotation_y[0];
  y                          = rotation_y[1];
  z                          = rotation_y[2];

  var rotation_terre         = facteur_vitesse * (delta_t / 1000) * 2 * Math.PI/86400;
  rotation_terre             = rotation_terre % (2 * Math.PI);

  rotation_z                 = rotate(x,y,z,rotation_terre,'z');
  x                          = rotation_z[0];
  y                          = rotation_z[1];
  z                          = rotation_z[2];

  var temp                   = z/terre.r;
  var latitude               = degrees(Math.asin(temp)).toFixed(6);
  var longitude              = degrees(Math.atan2(y,x)).toFixed(6);
  return [latitude, longitude]
}
// on écoute les appels à notre serveur sur le port 8080
app.listen(8080);
console.log("Serveur ouvert à l'adresse http://127.0.0.1:8080/");

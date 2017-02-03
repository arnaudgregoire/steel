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


// on créé le serveur
app.get("/", function (req, res) {
    var params = querystring.parse(url.parse(req.url).query);
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
});

function create_path_geonames(lat,lng){
    var path = '/extendedFindNearby?lat='
    path    += lat +'&lng='
    path    += lng
    path    += '&username=arnaudgregoire'
    console.log("requête envoyé à l'url : " + path);
    return path
}

app.listen(8080);

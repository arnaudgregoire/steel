function create_url_nom(){
  //on créé l'url avec la bonne latitude/longitude
  var url= 'http://api.geonames.org/findNearbyPlaceNameJSON?lat='
  url   += latitude.toString()
  url   += '&lng='
  url   += longitude.toString()
  url   += "&username="
  url   += username
  return url
}

function create_url_extended(){
  //on créé l'url avec la bonne latitude/longitude
  var url= 'http://api.geonames.org/extendedFindNearby?lat='
  url   += latitude.toString()
  url   += '&lng='
  url   += longitude.toString()
  url   += "&username="
  url   += username
  console.log(url);
  return url
}

function create_url_api(){
  // on créé l'url qu'on envoie cette fois ci à notre API locale
  var url= 'http://localhost:8080/?lat='
  url   += latitude.toString()
  url   += '&lng='
  url   += longitude.toString()
  console.log(url);
  return url
}
function create_url(zoom){
  //on créé l'url en fonction des différents paramètres réglés par l'utilisateur
  var url = 'https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center='
  url    += latitude.toString()
  url    += ','
  url    += longitude.toString()
  url    += '&zoom='
  url    += zoom.toString()
  url    += '&size=640x400&key='
  url    += api_key
  return url
}

function create_url_iss_coord(first_connexion,last_connexion,facteur_vitesse) {
    var url = 'http://localhost:8080/?first_connexion='
    url    += first_connexion.toString()
    url    += '&last_connexion='
    url    += last_connexion.toString()
    url    += '&facteur_vitesse='
    url    += facteur_vitesse.toString()
    console.log(url);
    return url
}

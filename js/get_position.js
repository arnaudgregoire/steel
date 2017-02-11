function getValue() {
  // on fait une requête ajax pour récupérer les coordonnées latitude longitude de l'iss
  $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: 'http://api.open-notify.org/iss-now.json',
      crossDomain: true,
      complete: function (data) {
             if (data.readyState === 4 && data.status === 200) {
                latitude  = data.responseJSON.iss_position.latitude;
                longitude = data.responseJSON.iss_position.longitude;
              }
      }})
}

function get_iss_coord(){
      //calcul fictif de la position de l'iss
      var last_connexion         = Date.now();
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
      latitude                   = degrees(Math.asin(temp)).toFixed(6);
      longitude                  = degrees(Math.atan2(y,x)).toFixed(6);
      console.log(azimuth);
      console.log(latitude,longitude);
}

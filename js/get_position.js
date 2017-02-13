var terre         = {
  r        : 6371,       // rayon approximatif de la terre en km
  };
var iss           = {
  v           : 27600,   // vitesse de l'iss en km/h
  alt         : 400,     //L’altitude moyenne de l’ISS en km
  inclinaison : 51.64,
  polar       : 90    //l'inclinaison de l'iss en °
  };
var alert_debug  = false

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

function get_iss_coord(first_connexion,last_connexion,facteur_vitesse){
  $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: create_url_iss_coord(first_connexion,last_connexion,facteur_vitesse),
      crossDomain: true,
      complete: function (data) {
             if (data.readyState === 4 && data.status === 200) {
                var data_json = JSON.parse(data.responseJSON)
                latitude  = data_json.latitude;
                longitude = data_json.longitude;
                console.log(latitude,longitude);
              }
      },
      error: function(){
        if (alert_debug == false){
          alert('Veuillez ouvrir le serveur node pour utiliser le mode debug')
          alert_debug = true
        }
      }
      })
}

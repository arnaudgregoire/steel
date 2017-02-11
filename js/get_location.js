function xml2json(xml) {
	// fonction anciennement utilisé pour convertir directement du xml en json sans passser par un serveur
  try {
    var obj = {};
    if (xml.children.length > 0) {
      for (var i = 0; i < xml.children.length; i++) {
        var item = xml.children.item(i);
        var nodeName = item.nodeName;

        if (typeof (obj[nodeName]) == "undefined") {
          obj[nodeName] = xml2json(item);
        } else {
          if (typeof (obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];

            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xml2json(item));
        }
      }
    } else {
      obj = xml.textContent;
    }
    return obj;
  } catch (e) {
      console.log(e.message);
  }
}



function get_location(){
  //on utilise Find nearby populated place / reverse geocoding pour trouver un lieu à proximité
  $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: create_url_nom(),
      crossDomain: true,
      complete: function (data) {
             if (data.readyState === 4 && data.status === 200) {
                  if(data.responseJSON.geonames.length>0){
                      var nom  = data.responseJSON.geonames[0].name;
                      var pays = data.responseJSON.geonames[0].countryName;
                      set_location(pays,nom);
                      }
                  else{
                      get_location_extended();
                }
              }
      }})
}
function get_location_api(){
  //on utilise Find nearby populated place / reverse geocoding pour trouver un lieu à proximité
  // get_location_api se connecte à notre serveur local
  $.ajax({
      type: 'GET',
      dataType: "jsonp",
      url:create_url_api(),
      crossDomain: true,
      complete: function (data) {
              console.log(data.readyState);
              console.log(data.status);
              if (data.readyState === 4 && data.status === 200) {
                  var data_json = JSON.parse(data.responseJSON)
                  console.log(data_json);
                  console.log(data_json.geonames);
                  try {
                    var ocean = data_json.geonames.ocean.name
                    set_ocean(ocean)
                      }
                  catch (e) {}
                  try {
                    console.log(data_json.geonames);
                    var len  = data_json.geonames.geoname.length;
                    var nom  = data_json.geonames.geoname[len-1].name;
                    var pays = data_json.geonames.geoname[len-1].countryName;
                    set_location(pays,nom);
                      } catch (e) {}
              }
            }
      })
}
function get_location_extended(){
  //on utilise Find nearby populated place / reverse geocoding pour trouver un lieu à proximité
  $.ajax({
      type: 'GET',
      dataType: "xml",
      url: create_url_extended(),
      crossDomain: true,
      complete: function (data) {
              if (data.readyState === 4 && data.status === 200) {
  								console.log('connexion réussi');
  								var data_xml  = data.responseXML;
  								var data_json = xml2json(data_xml);
                  console.log(data_json);
                  ocean         = data_json.geonames.ocean.name
  								console.log(ocean);
                  set_ocean(ocean);
                  }
              else{
                  set_erreur();
              }
              }
      })
}

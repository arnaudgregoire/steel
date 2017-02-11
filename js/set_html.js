
function set_location(pays,nom) {
  // on initialise le h1 en fonction de la location trouvé
    document.getElementById("tweet_titre").innerHTML = 'Hello '+ nom +' ' +pays +'!';
}

function set_ocean(ocean){
   // on intialise le h1 avec le nom de l'ocean
   document.getElementById("tweet_titre").innerHTML = 'Hello '+ocean;
}

function set_erreur() {
  // on initialise le h1 en disant que aucune location n'a été trouvé à proximité :/
    document.getElementById("tweet_titre").innerHTML = "Aucune location n'a été trouvé à proximité :/"
}

function facteur_v_maj(){
  document.getElementById('facteur_v').innerHTML = 'Facteur vitesse (x'+facteur_vitesse+')'
}


function create_img(zoom){
  // on créé une image dans le div tweet en faisant appel à la fonction create_url(zoom)
  var photo = document.createElement("img");
  var twt=document.getElementById('tweet_img')
  while (twt.firstChild) {
    twt.removeChild(twt.firstChild);
    }
  photo.setAttribute("src",create_url(zoom));
  photo.setAttribute("height", "400");
  photo.setAttribute("width", "640");

  document.getElementById("tweet_img").appendChild(photo);
}

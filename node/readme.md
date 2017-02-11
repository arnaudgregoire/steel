# Steel

Service de Tweet Efficace et Localisé


## Présentation de la partie serveur
Lorsque le client appuie sur le bouton "Prendre une photo", un message apparait normalement dans la console, du type :
```shell
requête envoyé à l\'url : /extendedFindNearby?lat=-14.2960&lng=61.2176&username=arnaudgregoire
envoi d\' une requête au serveur
réponse du serveur reçu
Conversion XML to JSON terminé
{ geonames: { ocean: { name: 'Indian Ocean' } } }
```

###Lancement du serveur node sur le port 8080

Lancer le serveur node :

```shell
$ node wrapper_api_geonames.js
```

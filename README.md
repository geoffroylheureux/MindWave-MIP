# MindWave-MIP (sous Windows)
Controler un robot MIP à l'aide de notre niveau de concentration donné à l'aide d'un casque MindWave.  

### Matériel requis :
- Robot MIP WowWee
- Casque Neurosky MicroWave
- Adaptateur bluetooth USB
### Installation de NodeJS :

Aller sur le site officiel de [NodeJS](https://nodejs.org/en/download/)  
Il faut la version 8.12 de NodeJS et la version 6.4.1 de npm

### Installation des bibliothèques necessaires :

`npm install --global --production windows-build-tools`  

`npm install bluetooth-hci-socket`  

### Configuration de l'adaptateur bluetooth USB :
Télécharger [Zadig tool](https://zadig.akeo.ie/)  
Brancher l'adapteur et lancer Zadig  
changer le pilote par celui proposé par défaut  

Aller dans gestionnaire des périphériques et dans les propriétés de ce dernier puis détail et numéros d'identification du matériel  

Récupérer les 4 caractères après "VID" et les 4 après "PID  

Maintenant aller dans le dossier node_modules puis dans le dossier bluetooth-hci-socket puis lib puis le fichier usb.js  
Ajouter à la ligne 66 : || usb.findByIds(0x****,0x****) respectivement les 4 caractères de VID puis les 4 après PID  

### Installations des APIs  

`npm install wowweemip`  

`npm install mindwave`

### Configuration du casque MindWave :  
Ajouter un périphérique bluetooth avec Windows  
Une fois couplé, aller dans les paramètres bluetooth avancés et récupérer le port COM correspondant au casque  
Modifier si nécessaire la ligne 19 de server.js 

### Lancement du programme :
`cd chemin d'accès du projet`  
`node server.js`  
Lancer votre navigateur Web et aller sur localhost:8080

### Commandes :
Avec un niveau de concentration <10 le robot recule  
Avec un niveau de concentration entre 10 et 30 le robot ne bouge pas  
Avec un niveau de concentration entre 30 et 50 le robot avance  
Avec un niveau de concentration entre 50 et 70 le robot avance sur un eplus longue distance  
Avec un niveau de concentration >70 le robot tourne sur lui-même  



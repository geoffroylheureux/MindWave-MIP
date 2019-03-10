var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});


var wowweemip = require("wowweemip");
var mipFinder = new wowweemip.Finder();
var noble= require("noble");

var Mindwave = require('mindwave2');
var mw = new Mindwave();
mw.connect('COM5');
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');

    mipFinder.scan(function(err, robots) {	
		if (err != null) {
			console.log(err);
			return;
		}

		
		//connect to first mip
		var selectedMip = robots[0];
		var valeur=50;

		mipFinder.connect(selectedMip, function(err) {
			if (err != null) {
				console.log(err);
				return;
			}
			
			console.log("connected");
			
	    mw.on('attention', function(attention){
	    	
		   if (typeof(attention)==typeof(1)){
		   	  valeur=attention;
		      
	          
	        socket.emit('attentioncaptee',valeur)

		   }	
		});
    
			setInterval(()=>{
			 	console.log(valeur);
	     if (valeur<10){
	    	selectedMip.driveDistanceByCm(-10,0,function(err){
	    		console.log("be concentrated!");
	    	})
	    }
		if ((valeur>30) && (valeur<50)){
			console.log("attention captée");
			selectedMip.driveDistanceByCm(20, 0, function(err) {
		    console.log("moving toward");
			});
		}
		if ((valeur>=50) && (valeur<70)){
		console.log("attention captée");
		selectedMip.driveDistanceByCm(30, 0, function(err) {
	    console.log("moving toward further");
			});
		}
		if (valeur>70){
		console.log("attention captée");
		selectedMip.driveDistanceByCm(0, 100, function(err) {
	    console.log("You're turning!!");
			});
		}
		
	}
			 	,2000);

		});
	});
			 
});

server.listen(8080);
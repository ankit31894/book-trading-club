module.exports = {
	"auth": {
	  "clientSecret": "--yMWEqtY22YBFkryl2qrtFb" || process.env.clientSecret,
 		"callbackURL": "http://127.0.0.1:8080/login/google/callback" || process.env.callbackURL,
 		"clientID": "735886318720-1761jq0l31upq97hrt1qpkvdhd37bdtk.apps.googleusercontent.com" || process.env.clientID
 	},
  "db": {
  	"url": "mongodb://localhost:27017/letstrade" || process.env.MongoURI,
  } 
}
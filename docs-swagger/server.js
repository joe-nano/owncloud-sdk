var express = require("express");
var owncloud = require("../../js-owncloud-client");
var cors = require('cors');
var app = express();
var oc;

app.use(express.static('docs-swagger/assets'));
app.use(express.static('assets'));
app.use(cors());

function init() {
	oc = new owncloud('localhost/core');
	oc.login('noveens', '123');
}

/////////////////////////////
///////    GENERAL    ///////
/////////////////////////////

app.get('/', function(request, response) {
	response.redirect("index.html");
});

app.get('/initLibrary', function(request, response) {
	var url = request.query.url;
	oc = new owncloud(url);
	response.send(true);
});

app.get('/login', function(request, response) {
	var uname = request.query.user;
	var pass = request.query.pass;

	oc.login(uname, pass).then(result => {
		response.send(result);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/getConfig', function(request, response) {
	init();
	oc.getConfig().then(result => {
		response.send(result);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/getVersion', function(request, response) {
	init();
	oc.getVersion().then(result => {
		response.send(result);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/getCapabilities', function(request, response) {
	init();
	oc.getCapabilities().then(result => {
		response.send(result);
	}).catch(error => {
		response.send(error);
	});
});

///////////////////////////////////
///////    APP MANGEMENT    ///////
///////////////////////////////////

app.get('/getApps', function(request, response) {
	init();
	oc.getApps().then(apps => {
		response.send(apps);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/getAttribute', function(request, response) {
	var app = request.query.app;
	var key = request.query.key;

	init();
	oc.getAttribute(app, key).then(attr => {
		response.send(attr);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/setAttribute', function(request, response) {
	var app = request.query.app;
	var key = request.query.key;
	var value = request.query.value || '';

	init();
	oc.setAttribute(app, key, value).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/deleteAttribute', function(request, response) {
	var app = request.query.app;
	var key = request.query.key;

	init();
	oc.deleteAttribute(app, key).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/enableApp', function(request, response) {
	var appname = request.query.appname;
	
	init();
	oc.enableApp(appname).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/disableApp', function(request, response) {
	var appname = request.query.appname;
	
	init();
	oc.disableApp(appname).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

/////////////////////////////
///////    SHARING    ///////
/////////////////////////////

app.get('/shareFileWithLink', function(request, response) {
	var path = request.query.path;
	var optional = {};

	if (request.query.perms) {
		optional.perms = request.query.perms;
	}
	if (request.query.publicUpload) {
		optional.publicUpload = request.query.publicUpload;
	}
	if (request.query.password) {
		optional.password = request.query.password;
	}

	init();
	oc.shares.shareFileWithLink(path, optional).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/updateShare', function(request, response) {
	var shareId = request.query.shareId;
	var optional = {};

	if (request.query.perms) {
		optional.perms = request.query.perms;
	}
	if (request.query.publicUpload) {
		optional.publicUpload = request.query.publicUpload;
	}
	if (request.query.password) {
		optional.password = request.query.password;
	}

	init();
	oc.shares.updateShare(shareId, optional).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/shareFileWithUser', function(request, response) {
	var path = request.query.path;
	var username = request.query.username;
	var optional = {};

	if (request.query.perms) {
		optional.perms = request.query.perms;
	}
	if (request.query.remoteUser) {
		optional.remoteUser = request.query.publicUpload;
	}

	init();
	oc.shares.shareFileWithUser(path, username, optional).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/shareFileWithGroup', function(request, response) {
	var path = request.query.path;
	var groupName = request.query.groupName;
	var optional = {};

	if (request.query.groupName) {
		optional.perms = request.query.groupName;
	}

	init();
	oc.shares.shareFileWithGroup(path, groupName, optional).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/getShares', function(request, response) {
	var path = request.query.path;
	var optional = {};

	if (request.query.reshares) {
		optional.reshares = request.query.reshares;
	}
	if (request.query.subfiles) { 
		optional.subfiles = request.query.subfiles;
	}
	/*jshint camelcase: false */
	if (request.query.shared_with_me) {
		optional.shared_with_me = request.query.shared_with_me;
	}
	/*jshint camelcase: true */

	init();
	oc.shares.getShares(path, optional).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/isShared', function(request, response) {
	var path = request.query.path;
	
	init();
	oc.shares.isShared(path).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/getShare', function(request, response) {
	var shareId = request.query.shareId;
	
	init();
	oc.shares.getShare(shareId).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/listOpenRemoteShare', function(request, response) {
	init();
	oc.shares.listOpenRemoteShare().then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/acceptRemoteShare', function(request, response) {
	var shareId = request.query.shareId;
	
	init();
	oc.shares.acceptRemoteShare(shareId).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/declineRemoteShare', function(request, response) {
	var shareId = request.query.shareId;
	
	init();
	oc.shares.declineRemoteShare(shareId).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/deleteShare', function(request, response) {
	var shareId = request.query.shareId;
	
	init();
	oc.shares.deleteShare(shareId).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

/////////////////////////////////////
///////    USER MANAGEMENT    ///////
/////////////////////////////////////

app.get('/createUser', function(request, response) {
	var uname = request.query.username;
	var pass = request.query.password;
	
	init();
	oc.createUser(uname, pass).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/deleteUser', function(request, response) {
	var username = request.query.username;
	
	init();
	oc.deleteUser(username).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/searchUsers', function(request, response) {
	var username = request.query.username;
	
	init();
	oc.searchUsers(username).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/userExists', function(request, response) {
	var username = request.query.username;
	
	init();
	oc.userExists(username).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/getUsers', function(request, response) {
	init();
	oc.getUsers().then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/setUserAttribute', function(request, response) {
	var username = request.query.username;
	var key = request.query.key;
	var value = request.query.value;

	init();
	oc.setUserAttribute(username, key, value).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/addUserToGroup', function(request, response) {
	var username = request.query.username;
	var groupName = request.query.groupName;

	init();
	oc.addUserToGroup(username, groupName).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/getUserGroups', function(request, response) {
	var username = request.query.username;

	init();
	oc.getUserGroups(username).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/userIsInGroup', function(request, response) {
	var username = request.query.username;
	var groupName = request.query.groupName;

	init();
	oc.userIsInGroup(username, groupName).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/getUser', function(request, response) {
	var username = request.query.username;

	init();
	oc.getUser(username).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/removeUserFromGroup', function(request, response) {
	var username = request.query.username;
	var groupName = request.query.groupName;

	init();
	oc.removeUserFromGroup(username, groupName).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/addUserToSubadminGroup', function(request, response) {
	var username = request.query.username;
	var groupName = request.query.groupName;

	init();
	oc.addUserToSubadminGroup(username, groupName).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/getUserSubadminGroups', function(request, response) {
	var username = request.query.username;

	init();
	oc.getUserSubadminGroups(username).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/userIsInSubadminGroup', function(request, response) {
	var username = request.query.username;
	var groupName = request.query.groupName;

	init();
	oc.userIsInSubadminGroup(username, groupName).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

//////////////////////////////////////
///////    GROUP MANAGEMENT    ///////
//////////////////////////////////////

app.get('/createGroup', function(request, response) {
	var groupName = request.query.groupName;

	init();
	oc.createGroup(groupName).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/deleteGroup', function(request, response) {
	var groupName = request.query.groupName;

	init();
	oc.deleteGroup(groupName).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/getGroups', function(request, response) {
	init();
	oc.getGroups().then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/getGroupMembers', function(request, response) {
	var groupName = request.query.groupName;

	init();
	oc.getGroupMembers(groupName).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

app.get('/groupExists', function(request, response) {
	var groupName = request.query.groupName;

	init();
	oc.groupExists(groupName).then(status => {
		response.send(status);
	}).catch(error => {
		response.send(error);
	});
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log("Swagger documentation here : http://localhost:8080/");
	console.log("Caution : Don't close the process until you're done experimenting with the documentation!");
});
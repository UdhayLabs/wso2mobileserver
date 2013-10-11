var groupModule = require('/modules/group.js').group;
var group = new groupModule(db);

var featureModule = require('/modules/feature.js').feature;
var feature = new featureModule(db);

var policyModule = require('/modules/policy.js').policy;
var policy = new policyModule(db);

var mamModule = require('/modules/mam.js').mam;
var mam = new mamModule(db);

var userModule = require('/modules/user.js').user;
var user = new userModule(db);



configuration = function(appController){	
	
	try{
		var policies = policy.getAllPolicies({});
	}catch(e){
		var policies = [];
	}
			
	try{
		var groups = group.getGroups({});
	}catch(e){
		var groups = [];
	}
	
	context = appController.context();
	context.jsFile= "policies/configuration.js";
	context.title = context.title + " | Configuration";		
	context.page = "configuration";
	context.data = {
			configOption : "policies",
			policies: policies,
			groups: groups
		
		}
	return context;
}


assign_groups = function(appController){	
	
	
	var policyId = request.getParameter('policy');
	var policyName = request.getParameter('policyName');
		
	try{
		var groups = policy.getGroupsByPolicy({policyid: policyId});		
	}catch(e){
		log.info("Error form the Backend to UI >>>>>>>>>>>>>>>>>>>>>>>>>> " + e);
		var groups = [];
	}
	
	//print(groups);
	
	try{
		var users = policy.getUsersByPolicy({policyid: policyId});		
	}catch(e){
		log.info("Error form the Backend to UI >>>>>>>>>>>>>>>>>>>>>>>>>> " + e);
		var users = [];
	}
	
	
	try{
		var platforms = policy.getPlatformsByPolicy({policyid: policyId});		
	}catch(e){
		log.info("Error form the Backend to UI >>>>>>>>>>>>>>>>>>>>>>>>>> " + e);
		var platforms = [];
	}
	
	
	print(users);
	
				
	context = appController.context();
	context.title = context.title + " | Assign Users to group";	
	context.page = "configuration";	
	context.jsFile= "policies/assign_groups.js"
	context.data = {
		configOption : "policies",
		groups: groups,
		tenantId:session.get("mdmConsoleUser").tenantId,
		policyId: policyId,
		policyName: policyName
	}
	return context;
}



add = function(appController){	
	
	context = appController.context();
	
	
	try{
		var groups = group.getGroups({});		
	}catch(e){
		var groups = [];
	}
	
		
	try{
		var features =feature.getAllFeatures({});
	}catch(e){
		var features = [];
	}
	
	try{
		var installedApps = mam.getInstallAppList({});
	}catch(e){
		var installedApps = [];
	}
		
	context.jsFile= "policies/add.js";
	context.title = context.title + " | Configuration";	
	context.page = "configuration";
	context.data = {
			configOption : "policies",
			groups: groups,
			features: features,
			installedApps: installedApps
	}
	return context;
}


edit = function(appController){	
	
	context = appController.context();	
	
	
	var policyId = request.getParameter('policy');
	var policyName = request.getParameter('policy');
	
	
	context.jsFile= "policies/edit.js";
	context.title = context.title + " | Configuration";	
	context.page = "configuration";
	context.data = {
			configOption : "policies",
			policyId: policyId,
			policyName: policyName
			
	}
	return context;
}






add_bundle = function(appController){	
	
	context = appController.context();
		
	try{
		var groups = group.getGroups({});		
	}catch(e){
		var groups = [];
	}	
	
	try{
		var features = feature.getAllFeatures({});
	}catch(e){
		var features = [];
	}
	
	context.jsFile= "permissions/add_bundle.js";
	context.title = context.title + " | Configuration";	
	context.page = "configuration";
	context.data = {
			configOption : "permissions",
			groups: groups,
			features: features
	}
	return context;
}
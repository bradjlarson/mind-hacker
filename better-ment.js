//collections:
tasks = new Meteor.Collection("tasks");
summaries = new Meteor.Collection("summaries");
grateful = new Meteor.Collection("grateful");
done = new Meteor.Collection("done"); 
surveys = new Meteor.Collection("surveys");
counterfact = new Meteor.Collection("counterfact");
blocks = new Meteor.Collection("blocks");
about = new Meteor.Collection("about");
contact = new Meteor.Collection("contact");

if (Meteor.isServer)
{
	
//Accounts.config({forbidClientAccountCreation : true});
Meteor.publish("Tasks", function() {
	return tasks.find({user_id : this.userId});
});
Meteor.publish("Summaries", function() {
	return summaries.find({user_id : this.userId});
});
Meteor.publish("Grateful", function() {
	return grateful.find({user_id : this.userId});
});

Meteor.publish("Done", function() {
	return done.find({user_id : this.userId});
});

Meteor.publish("Surveys", function() {
	return surveys.find({user_id : this.userId});
});

Meteor.publish("Counterfact", function() {
	return counterfact.find({user_id : this.userId});
});

Meteor.publish("Blocks", function() {
	return blocks.find({user_id : this.userId});
});

Meteor.publish("About", function() {
	return about.find();
});

Meteor.publish("Contact", function() {
	return contact.find({user_id : this.userId});
});

Meteor.methods({
	'update_records' : function() {
	tasks.update({}, {$set : {user_id : this.userId}}, {multi : true});
	summaries.update({}, {$set : {user_id : this.userId}}, {multi : true});
	grateful.update({}, {$set : {user_id : this.userId}}, {multi : true});
	done.update({}, {$set : {user_id : this.userId}}, {multi : true});
	surveys.update({}, {$set : {user_id : this.userId}}, {multi : true});
	counterfact.update({}, {$set : {user_id : this.userId}}, {multi : true});
	return "records updated";
	}	
});

//Meteor.call('update_records', function(error, result){console.log(error+'/'+result)});

/*
tasks.update({}, {$set : {user_id : this.userId}});
summaries.update({}, {$set : {user_id : this.userId}});
grateful.update({}, {$set : {user_id : this.userId}});
done.update({}, {$set : {user_id : this.userId}});
surveys.update({}, {$set : {user_id : this.userId}});
counterfact.update({}, {$set : {user_id : this.userId}});
*/
}

if (Meteor.isClient)
{

Meteor.subscribe("Tasks");
Meteor.subscribe("Summaries");
Meteor.subscribe("Grateful");
Meteor.subscribe("Done", function() {Session.set("done_load", true);});
Meteor.subscribe("Surveys");
Meteor.subscribe("Counterfact");
Meteor.subscribe("Blocks");
Meteor.subscribe("About");
Meteor.subscribe("Contact");
	
//setTimeout(function(){var today = new Date(); Session.set("now", today.timeNow_is());}, 1000);
	
Meteor.startup(function() {
	var today = new Date();
	Session.setDefault("today", today.today_is());
	Session.setDefault("now", today.timeNow_is());
	today.setDate(today.getDate()-1);
	Session.setDefault("yesterday", today.today_is());
	//Session.setDefault("todays_summary", false);
});

Date.prototype.today_is = function(){ 
	console.log(this.getDate());
    return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear() 
};
//For the time now
Date.prototype.timeNow_is = function(){
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

Date.prototype.yesterday = function(){ 
	console.log(this.getDate());
    return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear() 
};


Template.todayis.today = function() {
	var today = new Date();
	Session.set("today", today.today_is());
	Session.set("now", today.timeNow_is());
	return Session.get("today");
};
Template.todayis.now = function() {
	return Session.get("now");
};

Template.splash.today_done = function() {
	return true;
}

Template.splash.today_not_done = function() {
	return false;
}

Template.splash.logged_out = function() {
	if (Meteor.user())
	{
		return false;
	}
	else
	{
		return true;
	}	
		
};

Template.splash.logged_in = function() {
	return Meteor.user();
};

Template.side_bar.events = {
	'click #launch_about' : function() {
		$('#main').html(Meteor.render(Template.about));
		console.log('main');},
	'click #launch_today' : function() {
		$('#main').html(Meteor.render(Template.today_main));
		console.log('today');
		today_better_check();},
	'click #launch_previous' : function(event) {
		$('#main').html(Meteor.render(Template.previously));
		console.log('previously');},
	'click #launch_progress' : function(event) {
		//$('#main').html(Meteor.render(Template.progress));
		console.log('progress');},
	'click #launch_settings' : function(event) {
		$('#main').html(Meteor.render(Template.settings));
		console.log('settings');},
	'click #launch_contact' : function(event) {
		$('#main').html(Meteor.render(Template.contact));
		console.log('contact');}										
};

function today_better_check() {
	if (Session.get("done_load"))
	{
		var num_done = done.find({create_date : Session.get("today")}).count();
		console.log(num_done);
		var current_block = num_done + 1;
		console.log(current_block);
		if (num_done < 7)
		{
		$("#block-"+current_block).modal('show');
		}
		console.log('better_check');
	}	
}



/*
tasks structure:
{
	task : string,
	create_date : 
	create_time :
	user_id :
	last_date :
	complete : 
}
*/

}

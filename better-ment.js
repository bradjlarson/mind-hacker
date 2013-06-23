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
export_docs = new Meteor.Collection("export_docs");
admins = new Meteor.Collection("admins");

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
	if (admins.find({user_id : this.userId}).fetch())
	{
		return contact.find();
	}
	else
	{
		return contact.find({user_id : this.userId});
	}
});

Meteor.publish("Export", function() {
	return export_docs.find({user_id : this.userId});
});

Meteor.publish("Admins", function() {
	return admins.find({user_id : this.userId});
});

Meteor.publish("userData", function () {
	if (admins.find({user_id : this.userId}).fetch())
	{
		return Meteor.users.find();
	}
  	else
	{
		return Meteor.users.find({_id: this.userId});
	}
});

Meteor.methods({
	/*
	'update_records' : function() {
	tasks.update({}, {$set : {user_id : this.userId}}, {multi : true});
	summaries.update({}, {$set : {user_id : this.userId}}, {multi : true});
	grateful.update({}, {$set : {user_id : this.userId}}, {multi : true});
	done.update({}, {$set : {user_id : this.userId}}, {multi : true});
	surveys.update({}, {$set : {user_id : this.userId}}, {multi : true});
	counterfact.update({}, {$set : {user_id : this.userId}}, {multi : true});
	return "records updated";
	}
	*/	
});

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
Meteor.subscribe("Export");
Meteor.subscribe("Admins");
Meteor.subscribe("userData");
	
//setTimeout(function(){var today = new Date(); Session.set("now", today.timeNow_is());}, 1000);
	
Meteor.startup(function() {
	var today = new Date();
	Session.setDefault("today", today.today_is());
	Session.setDefault("now", today.timeNow_is());
	Session.setDefault("block_intro", false);
	today.setDate(today.getDate()-1);
	Session.setDefault("yesterday", today.today_is());
	//Session.setDefault("todays_summary", false);
});

Date.prototype.today_is = function(){ 
	//console.log(this.getDate());
    return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear() 
};
//For the time now
Date.prototype.timeNow_is = function(){
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

Date.prototype.yesterday = function(){ 
	//console.log(this.getDate());
    return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear() 
};


Template.todayis.today = function() {
	var today = new Date();
	var today_update = today.today_is();
	Session.set("now", today.timeNow_is());
	if (Session.get("today") != today_update)
	{
		console.log("today updated");
		console.log(Session.get("today"));
		console.log(today_update);
		Session.set("today", today.today_is());
		today.setDate(today.getDate()-1);
		Session.set("yesterday", today.today_is());
	}
	return Session.get("today");
};
Template.todayis.now = function() {
	return Session.get("now");
};

Template.todayis.events = {
	'click .return-to-main' : function() {
		$('#main').html(Meteor.render(Template.today_main));
		$('.side-nav').removeClass("active");
		$('#launch_today').addClass("active");
		Template.todayis.today();
		block_show();
		console.log('today');
		//today_better_check();
	}
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
		Template.todayis.today();
		console.log('main');},
	'click #launch_today' : function() {
		$('#main').html(Meteor.render(Template.today_main));
		Template.todayis.today();
		block_show();
		console.log('today');
		//today_better_check();
		},
	'click #launch_previous' : function(event) {
		$('#main').html(Meteor.render(Template.previously));
		Template.todayis.today();
		console.log('previously');},
	'click #launch_progress' : function(event) {
		$('#main').html(Meteor.render(Template.progress));
		Template.todayis.today();
		console.log('progress');},
	'click #launch_settings' : function(event) {
		$('#main').html(Meteor.render(Template.settings));
		Template.todayis.today();
		console.log('settings');},
	'click #launch_contact' : function(event) {
		$('#main').html(Meteor.render(Template.contact));
		Template.todayis.today();
		console.log('contact');},
	'click #launch_export' : function(event) {
		$('#main').html(Meteor.render(Template.export_docs));
		Template.todayis.today();
		Session.set("export_flag", true);
		console.log('export');}
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

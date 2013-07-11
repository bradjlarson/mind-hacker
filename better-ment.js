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
user_settings = new Meteor.Collection("user_settings");

if (Meteor.isServer)
{
	
tasks.allow({
	insert : function(userId, doc) {return (userId && doc.user_id === userId);},
	update : function(userId, doc) {return (doc.user_id === userId);},
	remove : function(userId, doc) {return (doc.user_id === userId);},
	fetch: ['user_id']
});
summaries.allow({
	insert : function(userId, doc) {return (userId && doc.user_id === userId);},
	update : function(userId, doc) {return (doc.user_id === userId);},
	remove : function(userId, doc) {return (doc.user_id === userId);},
	fetch: ['user_id']
});
grateful.allow({
	insert : function(userId, doc) {return (userId && doc.user_id === userId);},
	update : function(userId, doc) {return (doc.user_id === userId);},
	remove : function(userId, doc) {return (doc.user_id === userId);},
	fetch: ['user_id']
});
done.allow({
	insert : function(userId, doc) {return (userId && doc.user_id === userId);},
	update : function(userId, doc) {return (doc.user_id === userId);},
	remove : function(userId, doc) {return (doc.user_id === userId);},
	fetch: ['user_id']
});
surveys.allow({
	insert : function(userId, doc) {return (userId && doc.user_id === userId);},
	update : function(userId, doc) {return (doc.user_id === userId);},
	remove : function(userId, doc) {return (doc.user_id === userId);},
	fetch: ['user_id']
});
counterfact.allow({
	insert : function(userId, doc) {return (userId && doc.user_id === userId);},
	update : function(userId, doc) {return (doc.user_id === userId);},
	remove : function(userId, doc) {return (doc.user_id === userId);},
	fetch: ['user_id']
});
contact.allow({
	insert : function(userId, doc) {return (userId && doc.user_id === userId);},
	update : function(userId, doc) {return (doc.user_id === userId);},
	remove : function(userId, doc) {return (doc.user_id === userId);},
	fetch: ['user_id']
});
export_docs.allow({
	insert : function(userId, doc) {return (userId && doc.user_id === userId);},
	update : function(userId, doc) {return (doc.user_id === userId);},
	remove : function(userId, doc) {return (doc.user_id === userId);},
	fetch: ['user_id']
});
user_settings.allow({
	insert : function(userId, doc) {return (userId && doc.user_id === userId);},
	update : function(userId, doc) {return (doc.user_id === userId);},
	remove : false,
	fetch: ['user_id']
});

admins.allow({
	insert : function(userId) {return (userId == "AR48pcJeTuLqmNFWn")},
	update : function(userId) {return (userId == "AR48pcJeTuLqmNFWn")},
	remove : function(userId) {return (userId == "AR48pcJeTuLqmNFWn")},
});

contact.allow({
	insert : function(userId) {return (userId == "AR48pcJeTuLqmNFWn")},
	update : function(userId) {return (userId == "AR48pcJeTuLqmNFWn")},
	remove : function(userId) {return (userId == "AR48pcJeTuLqmNFWn")},
});
Meteor.users.allow({
	insert : function(userId) {return (userId == "AR48pcJeTuLqmNFWn")},
	update : function(userId) {return (userId == "AR48pcJeTuLqmNFWn")},
	remove : function(userId) {return (userId == "AR48pcJeTuLqmNFWn")},
});
user_settings.allow({
	insert : function(userId) {return (userId == "AR48pcJeTuLqmNFWn")},
	update : function(userId) {return (userId == "AR48pcJeTuLqmNFWn")},
	remove : function(userId) {return (userId == "AR48pcJeTuLqmNFWn")},
});

tasks.deny({
	insert: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	remove: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	update: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	}
});

summaries.deny({
	insert: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	remove: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	update: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	}
});

grateful.deny({
	insert: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	remove: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	update: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	}
});

done.deny({
	insert: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	remove: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	update: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	}
});

surveys.deny({
	insert: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	remove: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	update: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	}
});

counterfact.deny({
	insert: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	remove: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	update: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	}
});

blocks.deny({
	insert: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	remove: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	update: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	}
});

about.deny({
	insert: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	remove: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	update: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	}
});

contact.deny({
	insert: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	remove: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	update: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	}
});

admins.deny({
	insert: function(userId) {
		return (userId != "AR48pcJeTuLqmNFWn");
	},
	remove: function(userId) {
		return (userId != "AR48pcJeTuLqmNFWn");
	},
	update: function(userId) {
		return (userId != "AR48pcJeTuLqmNFWn");
	}
});

export_docs.deny({
	insert: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	remove: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	update: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	}
});

user_settings.deny({
	insert: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	remove: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	},
	update: function(userId) {
		return (userId == "vaAvhoP84ouxRxRu9");
	}
});
	
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
	if (admins.find({user_id : this.userId}).count() > 0)
	{
		return done.find();
	}
	else
	{
		return done.find({user_id : this.userId});
	}
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
	if (admins.find({user_id : this.userId}).count() > 0)
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
	if (admins.find({user_id : this.userId}).count() > 0)
	{
		return Meteor.users.find();
	}
  	else
	{
		return Meteor.users.find({_id: this.userId});
	}
});

Meteor.publish("User_settings", function() {
	if (admins.find({user_id : this.userId}).count() > 0)
	{
		return user_settings.find();
	}
	else
	{
		return user_settings.find({user_id : this.userId});
	}
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
Meteor.subscribe("User_settings");
Meteor.subscribe("userData");
	
Meteor.startup(function() {
	var today = new Date();
	Session.setDefault("today", today.today_is());
	Session.setDefault("now", today.timeNow_is());
	Session.setDefault("block_intro", false);
	Session.setDefault("initial_load", false);
	today.setDate(today.getDate()-1);
	Session.setDefault("yesterday", today.today_is());
	//Session.setDefault("todays_summary", false);
});

Date.prototype.today_is = function(){ 
    return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear() 
};
//For the time now
Date.prototype.timeNow_is = function(){
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

Template.todayis.today = function() {
	var today = new Date();
	var today_update = today.today_is();
	Session.set("now", today.timeNow_is());
	if (Session.get("today") != today_update)
	{
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
		if (Session.get("done_load"))
		{
			var first_check = done.find({user_id : Meteor.userId(), block_id : "intro.1"});
			if (first_check.count() == 0)
			{
				$('#site_intro_modal').modal('show');
			}
			else
			{
				block_show();
			}
		}
		Template.todayis.today();
		//block_show();
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

Template.side_bar.admin_check = function() {
	var check = admins.find({user_id : Meteor.userId()});
	if(check.count() > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
};

Template.side_bar.conversations = function() {
	return contact.find({user_id : Meteor.userId(), resolved : true}, {sort : {create_date : -1}}).count();
};

Template.side_bar.adminsations = function() {
	return contact.find({resolved : false}, {sort : {create_date : -1}}).count();
};


Template.side_bar.events = {
	'click #launch_about' : function() {
		$('#main').html(Meteor.render(Template.about));
		Template.todayis.today();
		},
	'click #launch_today' : function() {
		$('#main').html(Meteor.render(Template.today_main));
		Template.todayis.today();
		if (Session.get("done_load"))
		{
			var first_check = done.find({user_id : Meteor.userId(), block_id : "intro.1"});
			if (first_check.count() == 0)
			{
				$('#site_intro_modal').modal('show');
			}
			else
			{
				block_show();
			}
		}
		//block_show();
		//today_better_check();
		},
	'click #launch_previous' : function(event) {
		$('#main').html(Meteor.render(Template.previously));
		Template.todayis.today();
		},
	'click #launch_progress' : function(event) {
		$('#main').html(Meteor.render(Template.progress));
		Template.todayis.today();
		},
	'click #launch_settings' : function(event) {
		$('#main').html(Meteor.render(Template.settings));
		Template.todayis.today();
		},
	'click #launch_contact' : function(event) {
		$('#main').html(Meteor.render(Template.contact));
		Template.todayis.today();
		},
	'click #launch_export' : function(event) {
		$('#main').html(Meteor.render(Template.export_main));
		Template.todayis.today();
		Session.set("export_flag", true);
		},
	'click #launch_admin' : function(event) {
		var check = admins.find({user_id : Meteor.userId()});
		if(check.count() > 0)
		{
			$('#main').html(Meteor.render(Template.admin));
		}
		Template.todayis.today();
	}
};

}

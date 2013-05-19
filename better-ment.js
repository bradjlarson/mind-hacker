//collections:
tasks = new Meteor.Collection("tasks");
summaries = new Meteor.Collection("summaries");
grateful = new Meteor.Collection("grateful");
done = new Meteor.Collection("done");
surveys = new Meteor.Collection("surveys");
counterfact = new Meteor.Collection("counterfact");

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
/*
Meteor.subscribe("Tasks");
Meteor.subscribe("Summaries");
Meteor.subscribe("Grateful");
Meteor.subscribe("Done");
Meteor.subscribe("Surveys");
Meteor.subscribe("Counterfact");
*/
	
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

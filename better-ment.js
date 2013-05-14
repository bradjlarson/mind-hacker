//collections:
tasks = new Meteor.Collection("tasks");
summaries = new Meteor.Collection("summaries");
grateful = new Meteor.Collection("grateful");
done = new Meteor.Collection("done");
surveys = new Meteor.Collection("surveys");

if (Meteor.isServer)
{
	
}

if (Meteor.isClient)
{
	
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

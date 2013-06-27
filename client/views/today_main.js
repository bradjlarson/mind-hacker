Template.today_main.events = {
	'click .task-remove' : function(event) {
		var task_id = $(event.target).attr("name");
		tasks.update(task_id, {$set : {complete : true}});
		console.log('task : '+task_id+' removed.');
	},
	'click .task-stay' : function(event) {
		var task_id = $(event.target).attr("name");
		console.log('task : '+task_id+' moved to today.');		
		tasks.update(task_id, {$set : {last_date : Session.get("today")}});
	},
	'click #add-task-main' : function(event) {
		var task_text = $('#todays-task-main').val();
		console.log(task_text);
		if (task_text)
		{
			tasks.insert({task : task_text, create_date : Session.get("today"), last_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), complete : false});	
			$('#todays-task-main').val("").focus();
		}
	}
};

Template.today_main.tasks = function() {
	return tasks.find({last_date : Session.get("today"), complete : false});
};
Template.today_main.grateful = function() {
	return grateful.find({create_date : Session.get("today")});
};
Template.today_main.counterfact = function() {
	return counterfact.find({create_date : Session.get("today")});
};

Template.today_main.rendered = function() {
	if(Session.get("done_load"))
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
};

Template.today_main.today_check = function() {
	var limit = user_settings.find({user_id : Meteor.userId()});
	var less_than = 3;
	if(limit.count() > 0)
	{
		var less_than = limit.fetch()[0]['num_tasks'];
	}
	console.log(less_than);
	var todays = tasks.find({complete : false});
	if (todays.count() < less_than)
	{
		return true;
		Session.set("today_done", false);
	}
	else
	{
		return false;
		Session.set("today_done", true);
	}
};
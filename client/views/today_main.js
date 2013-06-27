Template.today_main.events = {
	'click .task-remove-main' : function(event) {
		var task_id = $(event.target).attr("name");
		tasks.update(task_id, {$set : {complete : true}});
		return false;
	},
	'click .task-stay-main' : function(event) {
		var task_id = $(event.target).attr("name");
		tasks.update(task_id, {$set : {last_date : Session.get("today")}});
		return false;
	},
	'click #add-task-main' : function(event) {
		var task_text = $('#todays-task-main').val();
		if (task_text)
		{
			tasks.insert({task : task_text, create_date : Session.get("today"), last_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), complete : false});	
			$('#todays-task-main').val("").focus();
		}
		return false;
	}
};

Template.today_tasks_main.tasks = function() {
	return tasks.find({last_date : Session.get("today"), complete : false});
};
Template.today_main.grateful = function() {
	return grateful.find({create_date : Session.get("today")});
};
Template.today_main.counterfact = function() {
	return counterfact.find({create_date : Session.get("today")});
};

Template.today_main.rendered = function() {
	if (Session.get("initial_load") == false)
	{
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
			Session.set("initial_load", true);
		}
	}
	console.log('today main re-rendered');
};

Template.today_tasks_main.today_check = function() {
	console.log('today check main');
	var limit = user_settings.find({user_id : Meteor.userId()});
	var less_than = 3;
	if(limit.count() > 0)
	{
		var less_than = limit.fetch()[0]['num_tasks'];
	}
	var todays = tasks.find({complete : false});
	if (todays.count() < less_than)
	{
		return true;
		console.log('returned true');
	}
	else
	{
		return false;
		console.log('returned false');
	}
};

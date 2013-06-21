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
	'click #add-task' : function(event) {
		var task_text = $('#todays-task').val();
		console.log(task_text);
		if (task_text)
		{
			tasks.insert({task : task_text, create_date : Session.get("today"), last_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), complete : false});	
			$('#todays-task').val("").focus();
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
	block_show();
};

Template.today_main.today_check = function() {
	var todays = tasks.find({complete : false});
	if (todays.count() <3)
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
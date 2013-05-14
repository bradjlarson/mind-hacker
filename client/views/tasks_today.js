Template.tasks_today.today = function() {
	return tasks.find({last_date : Session.get("today"), complete : false});
};

Template.tasks_today.today_check = function() {
	var todays = tasks.find({complete : false});
	if (todays.count() <5)
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

Template.tasks_today.events = {
	'click #add-task' : function(event) {
		var task_text = $('#todays-task').val();
		console.log(task_text);
		if (task_text)
		{
			tasks.insert({task : task_text, create_date : Session.get("today"), last_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), complete : false});	
			$('#todays-task').val("");
		}
	},
};
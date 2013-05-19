Template.tasks_yesterday.events = {
	'click .task-remove' : function(event) {
		var task_id = $(event.target).attr("name");
		tasks.update(task_id, {$set : {complete : true}});
		console.log('task : '+task_id+' removed.');
	},
	'click .task-stay' : function(event) {
		var task_id = $(event.target).attr("name");
		console.log('task : '+task_id+' moved to today.');		
		tasks.update(task_id, {$set : {last_date : Session.get("today")}});
	}
};

Template.tasks_yesterday.yesterday = function() {
	return tasks.find({last_date : {$lte : Session.get("yesterday")}, complete : false});
};
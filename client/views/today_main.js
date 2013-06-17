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
}
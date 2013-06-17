

Template.better_blocks.previous = function() {
	var today_check = summaries.find({create_date : Session.get("today")});
	if (today_check.count() != 0)
	{
		Session.set("todays_summary", true);
	}
	else
	{
		Session.set("todays_summary", false);		
	}	 
	return Session.get("todays_summary");
};

Template.better_blocks.greeting = function() {
	var time = Session.get("now");
	var hour = time.slice(0,2);
	if (hour >= 17)
	{
		return "Good evening!";
	}
	else if(hour >= 12)
	{
		return "Good afternoon!";
	}
	else
	{
		return "Good morning!";
	}
}

Template.better_blocks.summary = function() {
	return summaries.find({create_date : Session.get("today")}, {$sort : {create_time : 1}}).fetch()[0]['summary'];
};

Template.better_blocks.yesterday = function() {
	return tasks.find({last_date : {$lte : Session.get("yesterday")}, complete : false});
};

Template.better_blocks.today = function() {
	return tasks.find({last_date : Session.get("today"), complete : false});
};

Template.better_blocks.today_check = function() {
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
		$('#todays_tasks').collapse('hide');
		$('#gratefuls').collapse('show');
		$("#today-task-header").addClass("text-success");
		console.log('today done');
	}
};

Template.better_blocks.gratitude = function() {
	return grateful.find({create_date : Session.get("today")});
};

Template.better_blocks.grateful_check = function() {
	var gratitudes = grateful.find({create_date : Session.get("today")});
	if (gratitudes.count() <3)
	{
		return true;
		Session.set("grateful_done", false);
	}
	else
	{
		return false;
		Session.set("grateful_done", true);
		$('#gratefuls').collapse('hide');
		$('#counter').collpase('show');
		$('#grateful_success').removeClass('hidden');
		$("#grateful-header").addClass("text-success");
		console.log('grateful done');
	}
};

Template.better_blocks.counter_fact = function() {
	return counterfact.find({create_date : Session.get("today")});
};

Template.better_blocks.counter_check = function() {
	var counters = counterfact.find({create_date : Session.get("today")});
	if (counters.count() <3)
	{
		return true;
		Session.set("counter_done", false);
	}
	else
	{
		return false;
		Session.set("counter_done", true);
		$('#counter').collapse('hide');
		$('#today_form').collapse('show');
		$('#counter_success').removeClass('hidden');
		$("#counter-header").addClass("text-success");
	}
};

Template.better_blocks.events = {
	'change #summ-yest' : function(event) {
		var summary_text = $(event.target).val();
		if (Session.get("todays_summary"))
		{
			var todays = summaries.find({create_date : Session.get("today")}).fetch();
			var todays_id = todays[0]['_id'];
			console.log(todays_id);
			summaries.update(todays_id,{$set : {summary : summary_text}});
		}
		else
		{
			summaries.insert({create_date : Session.get("today"), create_time : Session.get("now"), summary : summary_text, user_id : Meteor.userId()});
			Session.set("todays_summary", true);
		}
		//Need some way to signal that I've completed this task
		//done.insert({create_date : Session.get("today"), create_time : Session.get("now"), better_block : "summ-yest", display_name : });
		//Session.set("summary_done", true);
	},
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
	},
	'click #add_gratitude' : function(event) {
		var gratitude_text = $('#todays-gratitude').val();
		grateful.insert({item : gratitude_text, create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId()});
		$('#todays-gratitude').val("").focus();
	},
	'click #add-counterfact' : function(event) {
		var counter_text = $('#todays-counterfact').val();
		counterfact.insert({item : counter_text, create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId()});
		$('#todays-counterfact').val("");
		$('#todays-counterfact').focus();
	},
	'click .today_happy' : function(event){
		var input_val = $(event.target).val();
		var today_check = surveys.find({create_date : Session.get("today")});
		if (today_check.count() != 0)
		{
			var survey_id = today_check.fetch()[0]['_id'];
			console.log(survey_id);
			console.log(input_val);
			surveys.update(survey_id, {$set : {today_happy : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), today_happy : input_val});
		}
	},
	'click .today_motivated' : function(event){
		var input_val = $(event.target).val();
		var today_check = surveys.find({create_date : Session.get("today")});
		if (today_check.count() != 0)
		{
			var survey_id = today_check.fetch()[0]['_id'];
			console.log(survey_id);
			console.log(input_val);
			surveys.update(survey_id, {$set : {today_motivated : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), today_motivated : input_val});
		}
	},
	'click .today_zen' : function(event){
		var input_val = $(event.target).val();
		var today_check = surveys.find({create_date : Session.get("today")});
		if (today_check.count() != 0)
		{
			var survey_id = today_check.fetch()[0]['_id'];
			console.log(survey_id);
			console.log(input_val);
			surveys.update(survey_id, {$set : {today_zen : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), today_zen : input_val});
		}
	},
	'click .yesterday_happy' : function(event){
		var input_val = $(event.target).val();
		var today_check = surveys.find({create_date : Session.get("today")});
		if (today_check.count() != 0)
		{
			var survey_id = today_check.fetch()[0]['_id'];
			console.log(survey_id);
			console.log(input_val);
			surveys.update(survey_id, {$set : {yesterday_happy : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), yesterday_happy : input_val});
		}
	},
	'click .yesterday_motivated' : function(event){
		var input_val = $(event.target).val();
		var today_check = surveys.find({create_date : Session.get("today")});
		if (today_check.count() != 0)
		{
			var survey_id = today_check.fetch()[0]['_id'];
			console.log(survey_id);
			console.log(input_val);
			surveys.update(survey_id, {$set : {yesterday_motivated : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), yesterday_motivated : input_val});
		}
	},
	'click .yesterday_zen' : function(event){
		var input_val = $(event.target).val();
		var today_check = surveys.find({create_date : Session.get("today")});
		if (today_check.count() != 0)
		{
			var survey_id = today_check.fetch()[0]['_id'];
			console.log(survey_id);
			console.log(input_val);
			surveys.update(survey_id, {$set : {yesterday_zen : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), yesterday : Session.get("yesterday"), create_time : Session.get("now"), user_id : Meteor.userId(), yesterday_zen : input_val});
		}
	},
	'click .start-block' : function(event) {
		var input_id = $(event.target).attr("id");
		Session.set("block_intro", true);
		block_manager(input_id);
		//done.insert({create_time : Session.get("now"), create_date : Session.get("today"), block_id : input_id, user_id : Meteor.userId()});
	},
	'click .next-block' : function(event) {
		var input_id = $(event.target).attr("id");
		block_manager(input_id);
		done.insert({create_time : Session.get("now"), create_date : Session.get("today"), block_id : input_id, user_id : Meteor.userId()});
	},
	'click .previous-block' : function(event) {
		var input_id = $(event.target).attr("name");
		block_manager(input_id);
		done.insert({create_time : Session.get("now"), create_date : Session.get("today"), block_id : input_id, user_id : Meteor.userId()});
	}	
};

/*
Template.better_blocks.rendered = function() {
	if (Session.get("done_load"))
	{
		var num_done = done.find({create_date : Session.get("today")}).count();
		console.log(num_done);
		var current_block = num_done + 1;
		console.log(current_block);
		if (num_done < 7)
		{
			if (Session.get("block_intro"))
			{
				$("#block-"+current_block).modal('show');
			}
			else
			{
				$('#block-0').modal('show');
			}
		}
	}
}
*/

block_show = function() {
	if (Session.get("done_load"))
	{
		var num_done = done.find({create_date : Session.get("today")}).count();
		console.log(num_done);
		var current_block = num_done + 1;
		console.log(current_block);
		if (num_done < 7)
		{
			if (Session.get("block_intro"))
			{
				$("#block-"+current_block).modal('show');
			}
			else
			{
				$('#block-0').modal('show');
			}
		}
	}
};

block_manager = function(block_id) {
	var parts = block_id.split(".");
	$("#block-"+parts[0]).modal('hide');
	if (parts[1])
	{
		$("#block-"+parts[1]).modal('show');
	}
	console.log(block_id+"marked as done");
};

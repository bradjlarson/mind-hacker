Template.yesterday_i_felt.events = {
	'click .yesterday_happy' : function(event){
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
			surveys.update(survey_id, {$set : {today_motivated : input_val}});
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
			surveys.update(survey_id, {$set : {today_zen : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), yesterday_zen : input_val});
		}
	}
}
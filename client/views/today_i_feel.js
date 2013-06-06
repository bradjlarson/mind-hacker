Template.today_i_feel.events = {
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
	}
}
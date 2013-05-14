Template.today_i_feel.events = {
	'change input[name=today_happy]:checked' : function(event) {
		var input_val = $(event.target).val();
		var today_check = surveys.find({create_date : Session.get("today")});
		if (today_check.count() != 0)
		{
			var survey_id = today_check.fetch()[0]['_id'];
			console.log(survey_id);
			surveys.update(survey_id, {$set : {today_happy : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), today_happy : input_val});
		}
	},
	'change input[name=today_motivated]:checked' : function(event) {
		var input_val = $(event.target).val();
		var today_check = surveys.find({create_date : Session.get("today")});
		if (today_check.count() != 0)
		{
			var survey_id = today_check.fetch()[0]['_id'];
			console.log(survey_id);
			surveys.update(survey_id, {$set : {today_motivated : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), today_motivated : input_val});
		}
	},
	'change input[name=today_zen]:checked' : function(event) {
		var input_val = $(event.target).val();
		var today_check = surveys.find({create_date : Session.get("today")});
		if (today_check.count() != 0)
		{
			var survey_id = today_check.fetch()[0]['_id'];
			console.log(survey_id);
			surveys.update(survey_id, {$set : {today_zen : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), today_zen : input_val});
		}
	}
}
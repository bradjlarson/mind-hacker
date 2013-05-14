Template.yesterday_i_felt.events = {
	'change input[name=yesterday_happy]:checked' : function(event) {
		var input_val = $(event.target).val();
		var yesterday_check = surveys.find({create_date : Session.get("today")});
		if (yesterday_check.count() != 0)
		{
			var survey_id = yesterday_check.fetch()[0]['_id'];
			console.log(survey_id);
			surveys.update(survey_id, {$set : {yesterday_happy : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), yesterday_happy : input_val});
		}
	},
	'change input[name=yesterday_motivated]:checked' : function(event) {
		var input_val = $(event.target).val();
		var yesterday_check = surveys.find({create_date : Session.get("today")});
		if (yesterday_check.count() != 0)
		{
			var survey_id = yesterday_check.fetch()[0]['_id'];
			console.log(survey_id);
			surveys.update(survey_id, {$set : {yesterday_motivated : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), yesterday_motivated : input_val});
		}
	},
	'change input[name=yesterday_zen]:checked' : function(event) {
		var input_val = $(event.target).val();
		var yesterday_check = surveys.find({create_date : Session.get("today")});
		if (yesterday_check.count() != 0)
		{
			var survey_id = yesterday_check.fetch()[0]['_id'];
			console.log(survey_id);
			surveys.update(survey_id, {$set : {yesterday_zen : input_val}});
		}
		else
		{
			surveys.insert({create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId(), yesterday_zen : input_val});
		}
	}
}
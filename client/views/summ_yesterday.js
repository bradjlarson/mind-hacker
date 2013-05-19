Template.summ_yesterday.events = {
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
		//Session.set("summary_done", true);
		$('#summary_success').removeClass('hidden');
	},
	'click #summary_submit' : function(event) {
		//Code to add readonly input to textarea
		//change summary background to green alert (alert-success)
		//Add green check mark after better block header (maybe make a function for this)
	}
};

Template.summ_yesterday.previous = function() {
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
}
Template.summ_yesterday.summary = function() {
	return summaries.find({create_date : Session.get("today")}, {$sort : {create_time : 1}}).fetch()[0]['summary'];
}
Template.counter_factual.counter_fact = function() {
	return counterfact.find({create_date : Session.get("today")});
};

Template.counter_factual.counter_check = function() {
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
		$('#counter_success').removeClass('hidden');
	}
};

Template.counter_factual.events = {
	'click #add-counterfact' : function(event) {
		var counter_text = $('#todays-counterfact').val();
		counterfact.insert({item : counter_text, create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId()});
		$('#todays-counterfact').val("");
		$('#todays-counterfact').focus();
	}
};
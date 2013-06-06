Template.grateful.gratitude = function() {
	return grateful.find({create_date : Session.get("today")});
};

Template.grateful.grateful_check = function() {
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

Template.grateful.events = {
	'click #add_gratitude' : function(event) {
		var gratitude_text = $('#todays-gratitude').val();
		grateful.insert({item : gratitude_text, create_date : Session.get("today"), create_time : Session.get("now"), user_id : Meteor.userId()});
		$('#todays-gratitude').val("").focus();
	}
};
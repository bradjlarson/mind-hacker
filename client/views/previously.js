Template.previously.previously = function() {
	return done.find({create_date : {$lt : Session.get("today")}});
}

Template.previously.previous_summ = function() {
	return summaries.find({create_date : {$lt : Session.get("today")}}, {sort : {create_date : -1}});
}
Template.previously.previous_task = function() {
	return tasks.find({last_date : {$lte : Session.get("yesterday")}, complete : true}, {sort : {last_date : -1}});
}
Template.previously.previous_grateful = function() {
	return grateful.find({create_date : {$lt : Session.get("today")}}, {sort : {create_date : -1}});
}
Template.previously.previous_counter = function() {
	return counterfact.find({create_date : {$lt : Session.get("today")}}, {sort : {create_date : -1}});
}
Template.previously.rendered = function() {
	$('.collapse').collapse('hide');
}	
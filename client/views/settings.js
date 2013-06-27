Template.settings.events = {
	'click .email_option' : function(event) {
		//update_setting("email_reminders", $(event.target).val());
		$(event.target).button('toggle');
		$('#settings_save').removeClass('btn-primary').addClass('btn-warning').html('Update Settings');
		Session.set("email_reminders", $(event.target).val());
		return false;
	},
	'change .acct_setting' : function(event) {
		$('#settings_save').removeClass('btn-primary').addClass('btn-warning').html('Update Settings');
	},
	'click #settings_save' : function(event) {
		$('#settings_save').removeClass('btn-warning').addClass('btn-primary').html('Settings saved.');
		update_all();
		return false;
	}
};	
		
Template.settings.rendered = function() {
	var has_settings = user_settings.find({user_id : Meteor.userId()});
	if(has_settings.count() > 0)
	{
		console.log('settings found');
	}
	else
	{
		user_settings.insert({user_id : Meteor.userId(), name : "", email : "", age : "", gender : "", email_reminders : "off", num_tasks : 3, num_gratitudes : 3, num_counterfactuals : 3});
		console.log('settings added');
	}
	//var email = Meteor.users.find({_id : Meteor.userId()}).fetch()[0].emails[0]['address'];
	var current_profile = user_settings.find({user_id : Meteor.userId()}).fetch()[0];
	/*
	if(current_profile.email == "")
	{
		current_profile.email = email;
	}
	*/
	console.log(current_profile);
	$('#name').val(current_profile['name'] ? current_profile['name'] : "");
	$('#email').val(current_profile.email ? current_profile.email : "");
	$('#age').val(current_profile.age ? current_profile.age : "");
	$('#gender').val(current_profile.gender ? current_profile.gender : "");
	$('#num_tasks').val(current_profile.num_tasks ? current_profile.num_tasks : "");
	$('#num_gratitudes').val(current_profile.num_gratitudes ? current_profile.num_gratitudes : "");
	$('#num_counterfactuals').val(current_profile.num_counterfactuals ? current_profile.num_counterfactuals : "");
	Session.set("email_reminders", current_profile.email_reminders);
	console.log(current_profile.email_reminders);
	$('#emails_'+current_profile.email_reminders).button('toggle');
	$('#settings_save').removeClass('btn-warning').addClass('btn-primary').html('Settings saved.');
}		

function update_all() {
	update_setting("name", $('#name').val());
	update_setting("email", $('#email').val());
	update_setting("age", $('#age').val());
	update_setting("gender", $('#gender').val());
	update_setting("num_gratitudes", $('#num_gratitudes').val());
	update_setting("num_tasks", $('#num_tasks').val());
	update_setting("num_counterfactuals", $('#num_counterfactuals').val());
	update_setting("email_reminders", Session.get("email_reminders"));
}
		
function update_setting(setting, value) {
	/*
	var current_profile = Meteor.users.find({_id: Meteor.userId()}).fetch()[0];
	console.log(current_profile);
	var profile = current_profile['profile'];
	console.log(profile);
	profile[setting] = value;
	Meteor.users.update({_id: Meteor.userId()}, {$set: {profile : profile}});
	*/
	var doc_id = user_settings.find({user_id : Meteor.userId()}).fetch()[0]['_id'];
	var current_profile = user_settings.find({user_id : Meteor.userId()}).fetch()[0];
	console.log(current_profile);
	current_profile[setting] = value;
	user_settings.update(doc_id, current_profile);
}		
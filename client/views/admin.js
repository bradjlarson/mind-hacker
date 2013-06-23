Template.admin.is_admin = function() {
	if (admins.find({user_id: Meteor.userId()}).count() > 0) 
	{
		return true;
	}
	else
	{
		return false;
	}
};

Template.admin.issue = function() {
	return contact.find({resolved : false, messages : {$exists:true}}, {sort : {last_response : 1}});
};

Template.admin.rendered = function() {
	$('.collapse').collapse();
};

Template.admin.events = {
	'click .respond-submit' : function(event) {
		var doc_id = $(event.target).attr('name');
		var convo = contact.find({_id: doc_id}).fetch()[0];
		convo['last_response'] = Session.get("today")+":"+Session.get("now");
		convo['messages'].push({date : Session.get("today"), time: Session.get("now"), user: Meteor.userId(), text: $('#'+doc_id+'_respond').val()});
		convo['resolved'] = true;
		delete convo['_id'];
		console.log(convo);
		contact.update(doc_id, convo);
	}
}
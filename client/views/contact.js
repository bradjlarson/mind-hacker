Template.contact.events = {
	'click #contact_submit' : function(event) {
		new_feedback = {};
		new_feedback['user_id'] = Meteor.userId();
		new_feedback['create_date'] = Session.get("today");
		new_feedback['create_time'] = Session.get("now");
		new_feedback['last_response'] = Session.get("today")+":"+Session.get("now");
		new_feedback['feedback'] = $('#feedback_text').val();
		new_feedback['messages'] = [];
		new_feedback['messages'].push({date : Session.get("today"), time: Session.get("now"), user: Meteor.userId(), text: $('#feedback_text').val()});
		new_feedback['type'] = $('#feedback_type').val();
		new_feedback['resolved'] = false;
		console.log(new_feedback);
		console.log('contact submitted');
		contact.insert(new_feedback);
		$('#contact_form')[0].reset();
		$('#contact_submit').removeClass("btn-inverse").addClass("btn-success").html("Submitted!");
		return false;
	},
	'change #feedback_text' : function(event) {
		$('#contact_submit').removeClass("btn-success").addClass("btn-inverse").html("Submit");
		return false;
	},
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
};

Template.contact.conversations = function() {
	return contact.find({user_id : Meteor.userId(), resolved : true}, {sort : {create_date : -1}});
};

Template.contact.rendered = function() {
	$('.collapse').collapse();
	//$('.collapse')[0].collapse('show');
};
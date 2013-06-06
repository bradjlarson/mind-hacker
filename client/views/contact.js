Template.contact.events = {
	'click #contact_submit' : function(event) {
		new_feedback = {};
		new_feedback['user'] = Meteor.userId();
		new_feedback['create_date'] = Session.get("today");
		new_feedback['create_time'] = Session.get("now");
		new_feedback['feedback'] = $('#feedback_text').val();
		new_feedback['type'] = $('#feedback_type').val();
		new_feedback['resolved'] = false;
		console.log(new_feedback);
		contact.insert(new_feedback);
		$('#contact_form')[0].reset();
		$('#contact_submit').removeClass("btn-inverse").addClass("btn-success").html("Submitted!");
		return false;
	},
	'change #feedback_text' : function(event) {
		$('#contact_submit').removeClass("btn-success").addClass("btn-inverse").html("Submit");
		return false;
	}
};
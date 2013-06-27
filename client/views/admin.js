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

Template.admin.total_users = function() {
	return Meteor.users.find().count();
};

Template.admin.issue = function() {
	return contact.find({resolved : false, messages : {$exists:true}}, {sort : {last_response : 1}});
};
var chart_data = {};
Template.admin.rendered = function() {
	chart_data = {};
	Meteor.users.find().forEach(function(user){
		chart_data[user['_id']] = {};
		chart_data[user['_id']].num_done = 0;
	});
	//$('.collapse').collapse();
	var ctx = document.getElementById("blocks_completed_chart").getContext("2d");
	if (ctx)
	{	
		Meteor.users.find().forEach(function(user){
			chart_data[user['_id']].num_done = done.find({user_id : user['_id'], create_date : Session.get("today")}).count();
		});
		var labels = [];
		var data = [];
		for (user in chart_data) 
		{
			labels.push(user);
			data.push(chart_data[user].num_done);
		}
		var data_pass = {
			labels : labels,
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : data
				}
			]
		};
		var data_options = {
			scaleOverride : true,
			scaleSteps : 5,
			scaleStepWidth : 3,
			scaleStartValue : 0,
			scaleShowGridLines : true,
			scaleGridLineWidth : 2
		};
	}
	var tasks_chart = new Chart(ctx).Bar(data_pass, data_options);	
};

Template.admin.events = {
	'click .respond-submit' : function(event) {
		var doc_id = $(event.target).attr('name');
		var convo = contact.find({_id: doc_id}).fetch()[0];
		convo['last_response'] = Session.get("today")+":"+Session.get("now");
		convo['messages'].push({date : Session.get("today"), time: Session.get("now"), user: Meteor.userId(), text: $('#'+doc_id+'_respond').val()});
		convo['resolved'] = true;
		delete convo['_id'];
		contact.update(doc_id, convo);
	}
};


	


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

Template.admin.user_profile = function() {
	return user_settings.find({}, {sort : {name : 1}});
};

Template.admin.total_users = function() {
	return Meteor.users.find().count();
};

Template.admin.issue = function() {
	return contact.find({resolved : false, messages : {$exists:true}}, {sort : {last_response : 1}});
};
var chart_data = {};
Template.admin.rendered = function() {
	Meteor.users.find().forEach(function(a_user) {
		if (user_settings.find({user_id : a_user['_id'], email : ""}).count() > 0)
		{
			if ('services' in a_user) 
			{ 
				if ('google' in a_user['services']) 
				{ 
					var user_id = user_settings.find({user_id : a_user['_id']}).fetch()[0]; 
					user_settings.update(user_id['_id'], {$set : {email : a_user['services']['google']['email']}});
				} 
			}
			if (a_user.emails) 
			{
				var user_id = user_settings.find({user_id : a_user['_id']}).fetch()[0]; 
				user_settings.update(user_id['_id'], {$set : {email : a_user.emails[0].address}});
			}
		}
	});					
	var today = new Date();
	today.setDate(today.getDate()-30);
	chart_data = {};
	daily_usage = {};
	usage_labels = [];
	usage_data = [];
	for (var i=0; i<=30; i++)
	{
		if (!(today.today_is() in daily_usage))
		{
			daily_usage[today.today_is()] = {};
			daily_usage[today.today_is()].num_users = 0;
			daily_usage[today.today_is()].full_date = today.today_is();
			daily_usage[today.today_is()].short_date = today.today_is().slice(0,5);
			Meteor.users.find().forEach(function(user){
				var match_date = today.today_is();
				if (done.find({user_id : user['_id'], create_date : today.today_is()}).count() > 0)
				{
					daily_usage[today.today_is()].num_users ++;
				}
			});
		}
		usage_labels.push(today.today_is());
		usage_data.push(daily_usage[today.today_is()].num_users);
		today.setDate(today.getDate()+1);
	}
	
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
	var ctx2 = document.getElementById("user_activity_chart").getContext("2d");
	var usage_pass = {
		labels : usage_labels,
		datasets : [
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : usage_data
			}
		]
	};
	var usage_options = {
		scaleOverride : true,
		scaleSteps : 5,
		scaleStepWidth : 3,
		scaleStartValue : 0,
		scaleShowGridLines : true,
		scaleGridLineWidth : 2
	};
	var usage_chart = new Chart(ctx2).Line(usage_pass, usage_options);	
	
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
	},
	'click .send-message' : function(event) {
		var user_id = $(event.target).attr('name');
		$('#message-user_id').html('User: '+user_id);
		$('#message-text').attr('name', user_id);
		$('#message-modal').modal('show');
	},
	'click #message-send' : function(event) {
		var date_time = Session.get("today")+":"+Session.get("now");
		var user_id = $('#message-text').attr('name');
		var message = $('#message-text').val();
		var build_doc = {};
		if (user_id == "all")
		{
			Meteor.users.find().forEach(function(this_user){
				build_doc = {
					create_date : Session.get("today"),
					create_time : Session.get("now"),
					feedback : "Message from Admins",
					last_response: date_time,
					messages : [
						{
							date : Session.get("today"),
							text : message,
							time : Session.get("now"),
							user : Meteor.userId()
						}
					],
					resolved : true,
					type : "Admin Message",
					user_id : this_user['_id']
				};
				contact.insert(build_doc);	
			});
		}
		else
		{
			build_doc = {
				create_date : Session.get("today"),
				create_time : Session.get("now"),
				feedback : "Message from Admins",
				last_response: date_time,
				messages : [
					{
						date : Session.get("today"),
						text : message,
						time : Session.get("now"),
						user : Meteor.userId()
					}
				],
				resolved : true,
				type : "Admin Message",
				user_id : user_id
			};
			contact.insert(build_doc);
		}	
	}
};


	
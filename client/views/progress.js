Date.prototype.today_is = function(){
	//console.log(this.getDate());
    return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear() 
};
//For the time now
Date.prototype.timeNow_is = function(){
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

var chart_data = {};

Template.progress.rendered = function() {
//Set up the first task graph
chart_data = {};
var today = new Date();
today.setDate(today.getDate()-30);
var task_labels = [];
for (var i=0; i<=30; i++)
{
	if (!(today.today_is() in chart_data))
	{
		chart_data[today.today_is()] = {};
		chart_data[today.today_is()].completed = 0;
		chart_data[today.today_is()].created = 0;
		chart_data[today.today_is()].start_happy = 0;
		chart_data[today.today_is()].end_happy = 0;
		chart_data[today.today_is()].start_motivated = 0;
		chart_data[today.today_is()].end_motivated = 0;
		chart_data[today.today_is()].start_zen = 0;
		chart_data[today.today_is()].end_zen = 0;
		chart_data[today.today_is()].change_happy = 0;
		chart_data[today.today_is()].change_motivated = 0;
		chart_data[today.today_is()].change_zen = 0;
		chart_data[today.today_is()].blocks_completed = 0;
		chart_data[today.today_is()].full_date = today.today_is();
		chart_data[today.today_is()].short_date = today.today_is().slice(0,5);
		if (i%5 == 0)
		{
			chart_data[today.today_is()].skip_date = today.today_is().slice(0,5);;
		}
		else
		{
			chart_data[today.today_is()].skip_date = ' ';
		}
	}
	today.setDate(today.getDate()+1);
}
//console.log(chart_data);
	
var ctx = document.getElementById("tasks_completed_chart").getContext("2d");
if (ctx)
{	
	var all_tasks = tasks.find({last_date : {$gte : "05/12/2013"}}, {sort : {last_date : 1}});
	var task_data = [];
	var task_created = [];
	var end_happy = [];
	var end_motivated = [];
	var end_zen = [];
	var start_happy = [];
	var start_motivated = [];
	var start_zen = [];
	var blocks_completed = [];
	
	all_tasks.forEach(function(item) {
		var task_date = item.last_date;
		var create_date = item.create_date;
		//console.log(task_date);
		if (item['complete'] == true)
		{
			if (chart_data[task_date])
			{
				//console.log('task added');
				chart_data[task_date].completed ++;
			}
		}
		if (chart_data[create_date])
		{
			chart_data[create_date].created ++;
		}
	});
	
	var today_happy = surveys.find({today_happy : {$exists : true}, create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	var yesterday_happy = surveys.find({yesterday_happy : {$exists : true}, create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	var today_motivated = surveys.find({today_motivated : {$exists : true}, create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	var yesterday_motivated = surveys.find({yesterday_motivated : {$exists : true}, create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	var today_zen = surveys.find({today_zen : {$exists : true}, create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	var yesterday_zen = surveys.find({yesterday_zen : {$exists : true}, create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	var days_using = done.find({user_id : Meteor.userId(), create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	console.log(today_happy);
	//console.log(today_happy);
	//make_chart(today_happy, "create_date", "today_happy", "end_happy");
	//make_chart(today_motivated, "create_date", "today_motivated", "end_motivated");
	//make_chart(today_zen, "create_date", "today_zen", "end_zen");
	make_chart(today_happy, "create_date", "today_happy", "start_happy");
	make_chart(today_motivated, "create_date", "today_motivated", "start_motivated");
	make_chart(today_zen, "create_date", "today_zen", "start_zen");
	make_chart(yesterday_happy, "create_date", "yesterday_happy", "end_happy");
	make_chart(yesterday_motivated, "create_date", "yesterday_motivated", "end_motivated");
	make_chart(yesterday_zen, "create_date", "yesterday_zen", "end_zen");
	console.log(chart_data);
	var j = 0;
	var max_j = 0;
	for (days in chart_data)
	{
		task_labels.push(chart_data[days].short_date);
		task_data.push(chart_data[days].completed);
		task_created.push(chart_data[days].created);
		end_happy.push(chart_data[days].end_happy);
		end_motivated.push(chart_data[days].end_motivated);
		end_zen.push(chart_data[days].end_zen);
		start_happy.push(chart_data[days].start_happy);
		start_motivated.push(chart_data[days].start_motivated);
		start_zen.push(chart_data[days].start_zen);
		blocks_completed.push(done.find({user_id : Meteor.userId(), create_date : days}, {sort : {create_date : 1}}).count());
		if (done.find({user_id : Meteor.userId(), create_date : days}, {sort : {create_date : 1}}).count() > 0)
		{
			j++;
			if (j > max_j)
			{
				max_j = j;
			}
		}
		else
		{
			j = 0;
		}
	}
	var task_pass = {
		labels : task_labels,
		datasets : [
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : task_data
			}
			/*,
			{
				fillColor : "rgba(252,168,65,0.5)",
				strokeColor : "rgba(252,168,65,1)",
				pointColor : "rgba(252,168,65,1)",
				pointStrokeColor : "#fff",
				data : task_created
			}
			*/
		]
	};
	var happy_pass = {
		labels : task_labels,
		datasets : [
			{
				fillColor : "rgba(252,168,65,0.5)",
				strokeColor : "rgba(252,168,65,1)",
				pointColor : "rgba(252,168,65,1)",
				pointStrokeColor : "#fff",
				data : start_happy
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : end_happy
			}
		]
	};
	var motivated_pass = {
		labels : task_labels,
		datasets : [
			{
				fillColor : "rgba(252,168,65,0.5)",
				strokeColor : "rgba(252,168,65,1)",
				pointColor : "rgba(252,168,65,1)",
				pointStrokeColor : "#fff",
				data : start_motivated
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : end_motivated
			}
		]
	};
	var zen_pass = {
		labels : task_labels,
		datasets : [
			{
				fillColor : "rgba(252,168,65,0.5)",
				strokeColor : "rgba(252,168,65,1)",
				pointColor : "rgba(252,168,65,1)",
				pointStrokeColor : "#fff",
				data : start_zen
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : end_zen
			}
		]
	};
	var usage_pass = {
		labels : task_labels,
		datasets : [
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : blocks_completed
			}
		]
	};
	
	var task_options = {
		scaleOverride : true,
		scaleSteps : 5,
		scaleStepWidth : 1,
		scaleStartValue : 0,
		scaleShowGridLines : false,
		scaleGridLineWidth : 2
	};
	var usage_options = {
		scaleOverride : true,
		scaleSteps : 7,
		scaleStepWidth : 1,
		scaleStartValue : 0,
		scaleShowGridLines : false,
		scaleGridLineWidth : 2
	};
	var survey_options = {
		scaleOverride : true,
		scaleSteps : 5,
		scaleStepWidth : 1,
		scaleStartValue : 0,
		scaleShowGridLines : false,
		scaleGridLineWidth : 2
	};
	
	var tasks_chart = new Chart(ctx).Line(task_pass, task_options);
	if(max_j > 0)
	{
		$('#streak_length').html('<em>Longest Streak: '+max_j+' days in a row!</em>');
	}
	else
	{
		$('#streak_length').html('No activity yet - click on "Today" to get started!');
	}	
	
	var ctx1 = document.getElementById("usage_chart").getContext("2d");
	var usage_chart = new Chart(ctx1).Line(usage_pass, usage_options);
	var ctx2 = document.getElementById("happy_chart").getContext("2d");
	var happy_chart = new Chart(ctx2).Line(happy_pass, survey_options);
	var ctx3 = document.getElementById("motivated_chart").getContext("2d");
	var happy_chart = new Chart(ctx3).Line(motivated_pass, survey_options);
	var ctx4 = document.getElementById("zen_chart").getContext("2d");
	var happy_chart = new Chart(ctx4).Line(zen_pass, survey_options);
}



	
}	

make_chart = function(data, index, value, name) {
	data.forEach(function(item) {
		var check = item[index];
		if (chart_data[check])
		{
			chart_data[check][name] = item[value];
		}
	});
}

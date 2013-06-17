Date.prototype.today_is = function(){
	//console.log(this.getDate());
    return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear() 
};
//For the time now
Date.prototype.timeNow_is = function(){
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

Date.prototype.yesterday = function(){ 
	//console.log(this.getDate());
    return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear() 
};

var chart_data = {};

Template.progress.rendered = function() {
//Set up the first task graph

var today = new Date();
today.setDate(today.getDate()-30);
var task_labels = [];
for (var i=0; i<=30; i++)
{
	if (!(today.today_is() in chart_data))
	{
		chart_data[today.today_is()] = {};
		chart_data[today.today_is()].completed = 0;
		chart_data[today.today_is()].start_happy = 0;
		chart_data[today.today_is()].end_happy = 0;
		chart_data[today.today_is()].start_motivated = 0;
		chart_data[today.today_is()].end_motivated = 0;
		chart_data[today.today_is()].start_zen = 0;
		chart_data[today.today_is()].end_zen = 0;
		chart_data[today.today_is()].change_happy = 0;
		chart_data[today.today_is()].change_motivated = 0;
		chart_data[today.today_is()].change_zen = 0;
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
	var end_happy = [];
	var end_motivated = [];
	var end_zen = [];
	all_tasks.forEach(function(item) {
		var task_date = item.last_date;
		//console.log(task_date);
		if (item['complete'] == true)
		{
			if (chart_data[task_date])
			{
				console.log('task added');
				chart_data[task_date].completed ++;
			}
		}
	});
	
	var today_happy = surveys.find({today_happy : {$exists : true}, create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	var yesterday_happy = surveys.find({yesterday_happy : {$exists : true}, create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	var today_motivated = surveys.find({today_motivated : {$exists : true}, create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	var yesterday_motivated = surveys.find({yesterday_motivated : {$exists : true}, create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	var today_zen = surveys.find({today_zen : {$exists : true}, create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	var yesterday_zen = surveys.find({yesterday_zen : {$exists : true}, create_date : {$gte : "05/12/2013"}}, {sort : {create_date : 1}});
	//console.log(today_happy);
	make_chart(today_happy, "create_date", "today_happy", "end_happy");
	make_chart(today_motivated, "create_date", "today_motivated", "end_motivated");
	make_chart(today_zen, "create_date", "today_zen", "end_zen");
	make_chart(yesterday_happy, "create_date", "yesterday_happy", "end_happy");
	make_chart(yesterday_motivated, "create_date", "yesterday_motivated", "end_motivated");
	make_chart(yesterday_zen, "create_date", "yesterday_zen", "end_zen");
	
	//console.log(chart_data);
	
	for (days in chart_data)
	{
		task_labels.push(chart_data[days].short_date);
		task_data.push(chart_data[days].completed);
		end_happy.push(chart_data[days].end_happy);
		end_motivated.push(chart_data[days].end_motivated);
		end_zen.push(chart_data[days].end_zen);
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
		]
	};
	var happy_pass = {
		labels : task_labels,
		datasets : [
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
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : end_zen
			}
		]
	};
	var task_options = {
		scaleOverride : true,
		scaleSteps : 3,
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
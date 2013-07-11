Template.export_docs.export_item = function() {
	return export_docs.find();
};

Template.export_docs_chartjs.export_item = function() {
	return export_docs.find();
};

//[tasks, summaries, grateful, done, surveys, counterfact, blocks, about, contact];
Template.export_main.events = {
	'click #generate_export' : function() {
		$('#export_container').html(Meteor.render(Template.export_docs));
	},
	'click #generate_chartjs' : function() {
		$('#export_container').html(Meteor.render(Template.export_docs_chartjs));
	}
};

Template.export_docs.rendered = function() {
console.log("export rendered");
var collections = {};
var task_records = tasks.find().fetch();
var summary_records = summaries.find().fetch();
var grateful_records = grateful.find().fetch();
var done_records = done.find().fetch();
var surveys_records = surveys.find().fetch();
var counterfact_records = counterfact.find().fetch();
var blocks_records = blocks.find().fetch();
//var about_records = about.find().fetch();
var contact_records = contact.find().fetch();
collections['tasks'] = {col_name : "tasks", objs : task_records};
collections['summaries'] = {col_name : "summaries", objs : summary_records};
collections['grateful'] = {col_name : "grateful", objs : grateful_records};
collections['done'] = {col_name : "done", objs : done_records};
collections['surveys'] = {col_name : "surveys", objs : surveys_records};
collections['counterfact'] = {col_name : "counterfact", objs : counterfact_records};
collections['blocks'] = {col_name : "blocks", objs : blocks_records};
//collections['about'] = {col_name : "about", objs : about_records};
collections['contact'] = {col_name : "contact", objs : contact_records};
var all_data = collections;
if (Session.get("export_flag"))
{
	clear_export();
	//add_to_export(all_data[col].col_name, all_data[col].objs);
}
for (col in all_data)
{
	if (Session.get("export_flag"))
	{
		//clear_export();
		add_to_export(all_data[col].col_name, all_data[col].objs);
	}
}
Session.set("export_flag", false);	
}

function add_to_export(col_name, objs) {
	for (obj in objs) 
	{
		delete objs[obj]['_id'];
		var insert_text = col_name+".insert("+JSON.stringify(objs[obj])+")";
		export_docs.insert({item_type : col_name, item_text : insert_text, user_id : Meteor.userId()});
	}
	//Session.set("export_flag", false);
}

add_for_chartjs = function(col_name, objs) {
	for (obj in objs) 
	{
		delete objs[obj]['_id'];
		if(col_name == "tasks") {delete objs[obj]['task'];}
		var insert_text = col_name+".insert("+JSON.stringify(objs[obj])+")";
		console.log(insert_text);
		export_docs.insert({item_type : col_name, item_text : insert_text, user_id : Meteor.userId()});
	}
	//Session.set("export_flag", false);
}

clear_export = function() {
	var docs = export_docs.find().forEach(function(doc) {
		export_docs.remove(doc['_id']);
	});
}
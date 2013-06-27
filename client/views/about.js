Template.about.block = function() {
	return about.find({}, {sort : {order : 1}});
};

Template.about.events = {
	'change .about-editable' : function(event) {
		var doc_name = $(event.target).attr("name");
		var doc_id = doc_name.split('.')[1];
		var update_val = $(event.target).val();
		var doc_field = doc_name.split('.')[0];
		if (doc_field == "about-header")
		{
			about.update(doc_id, {$set : {about_header : update_val}});
		}
		else if (doc_field == "about-body")
		{
			about.update(doc_id, {$set : {about_body : update_val}});
		}
		else if (doc_field == "block-name")
		{
			about.update(doc_id, {$set : {block_name : update_val}});
		}
	},
	'click .accordion-group' : function(event) {
		$("#about_instruct").alert('close');
	}
};

Template.about.rendered = function() {
	//$(".collapse").collapse('hide');
	show_first();
};

function show_first() {
	console.log("showing first");
	$('.collapse').first().collapse('show');
}

/*
about collection structure:
{
block_code : String, (not used currently - might be useful for future joins)
block_name : String,
about_header : String,
about_body : String
}
Note: These strings can be markdown formatted, and that formatting will be preserved

Current blocks:
Summarizing Yesterday (summ-yest)
Goal Setting (tasks)
Gratitude Journal (grateful)
Additive CounterFactuals (counterfact)
Surveys

*/
$(document).ready( initPage);

function initPage() {

	var $tab = $('#tab-mother').tabs(
		{
			event: "mouseover",
			collapsible: true
		}
		);
	$tab.find( ".ui-tabs-nav").sortable( { axis: "x"});
}

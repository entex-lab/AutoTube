$(document).ready( initPage;

/* ajax */

var exist = false;

function changeTitle() {

	var target = document.getElementById( 'video_title');

	target.innerHTML = 'hey charlie';

}

function onYouTubePlayerReady(playerId) {

	ytplayer = document.getElementById( 'AutoPlayer');
	ytplayer.addEventListener("onStateChange", "onPlayerStateChange");

}

function changeVideo( videoID) {
	if( exist) {
		swfobject.removeSWF("AutoPlayer");
		var d = document.createElement("div");
		d.setAttribute("id", "player");
		document.getElementById("left").appendChild(d);
	}
	exist = true;
	var params = { allowScriptAccess: 'always'};
	var atts = { id: "AutoPlayer"};
	swfobject.embedSWF("http://www.youtube.com/v/" + videoID + "&enablejsapi=1&autoplay=1&rel=0&playerapiid=AutoPlayer", 
               "player", "480", "360", "8", null, null, params, atts);
}

function videoRelated() {

	var linkArray = new Array();
	for( var i = 1; i <= 5; i++) {
		var tmp = document.getElementById( 'timg'+i);
		linkArray[i-1] = tmp;
	}
	// ranking rule not yet.
	var dice = Math.floor( Math.random() * 5);
	eval( linkArray[dice].toString());

}

function onPlayerStateChange(newState) {
	
    var currentUrl = ytplayer.getVideoUrl();
	if( newState == 0 ) {
		changeRelatedList( currentUrl);
		videoRelated();
	}
}

function createList( ) {

	var searchTerm = document.getElementById( 'term').value;

	$('#right').load('./action.psp?term='+searchTerm,
		function(){
			$('#right').fadeIn();
		}
	);

	return false;
}

function changeRelatedList( url) {

	$('#right').load('./action.psp?related='+url, 
		function() {
			$('#right').fadeIn();
		}
	);

}


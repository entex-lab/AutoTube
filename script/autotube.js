$(document).ready( initPage);

/* ajax */

var exist = false;
var changeList = false;

function initPage() {

/*
	$('#left').load( './init.psp?which=left', function( data) {
		$('#left').fadeIn();
	}
	);
*/
	$('#right').load( './init.psp?which=right', function() {
		$('#right').fadeIn();
	}
	);

	changeTitle( 'video_title', 'Random Most Viewed Video');
	changeTitle( 'sideList', 'Random List');

}

function changeTitle( targetId, text) {

	var target = document.getElementById( targetId );
	target.innerHTML = text.replace( /"/g, '&quot').replace( /\'/g, '&#039;');

}

function updatePlayerInfo() {


	if( ytplayer && ytplayer.getDuration() > 0 && !changeList) {
		if( ytplayer.getCurrentTime() >= ytplayer.getDuration() * 0.25) {
			var currentUrl = ytplayer.getVideoUrl();
			changeRelatedList( currentUrl);
			changeList = true;
		}
	}

}

function onYouTubePlayerReady(playerId) {

	ytplayer = document.getElementById( 'AutoPlayer');
	setInterval( updatePlayerInfo, 500);
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
	var params = { allowScriptAccess: 'always', allowfullscreen: 'true'};
	var atts = { id: "AutoPlayer"};
	swfobject.embedSWF("http://www.youtube.com/v/" + videoID + "&enablejsapi=1&autoplay=1&rel=0&fs=1&playerapiid=AutoPlayer", 
               "player", "480", "360", "8", null, null, params, atts);
}
                                                                
function changeRelatedList( url) {

	$('#right').load('./action.psp?related='+url, 
		function() {
			$('#right').fadeIn();
		}
	);

}

function videoRelated() {

	var linkArray = new Array();
	var newTitle;
	var dice, sdice;
	for( var i = 0; i < 6; i++) {
		var tmp = document.getElementById( 'aimg'+i);
		linkArray[i] = tmp;
	}
	// ranking rule not yet.
	dice = Math.floor( Math.random() * 6);
	sdice = dice.toString();
	newTitle = document.getElementById( 'atitle_' + sdice ).innerHTML;
	changeTitle( 'video_title', newTitle);
	changeTitle( 'sideList', 'Current Related List');
	eval( linkArray[dice].toString());

}

function onPlayerStateChange(newState) {
	

	if( newState == 0 ) { 
/*		if( !changeList)
			changeRelatedList( ytplayer.getVideoUrl());*/
		videoRelated();
		changeList = false;
	}
}

function createList( ) {

	var searchTerm = document.getElementById( 'term').value;
	searchTerm = encodeURIComponent( searchTerm);

	$('#right').load('./action.psp?term='+searchTerm,
		function(){
			$('#right').fadeIn();
		}
	);

	changeTitle( 'sideList', 'Current Related Video');

	return false;
}


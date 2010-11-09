$(document).ready( initPage);

/* ajax */

var exist = false;
var changeList = false;
var videoNumber = 0;

function initPage() {

/*
	$('#left').load( './init.psp?which=left', function( data) {
		$('#left').fadeIn();
	}
	);
*/

	var url = window.location.toString();
	var arg = new Array();

	if( url.indexOf("?") != -1) {
		var ary = url.split("?")[1].split("&");
		for( var i in ary) {
			arg[ ary[i].split("=")[0].toString()] = decodeURI( ary[i].split("=")[1].toString());
		}
	}

	if( arg['q']) {
		$('#right').load( './action.psp?term='+encodeURIComponent( arg['q']), function() {
			$('#right').fadeIn();
			document.getElementById('term').value = arg['q'];
		}
		);
	}
	else {
		$('#right').load( './init.psp?which=right', function() {
			$('#right').fadeIn();
		}
		);
	}

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

    changeList = false;                    
}
              /*                                                  
jQuery("#ytplayer-container").tubeplayer( {
	width: 480,
	height: 360,
	allowfullscreen: "true",
	playerID:  
*/
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
	// bug need to fix
	for( var i = 0; i < 6; i++) {
		var tmp = document.getElementById( 'aimg'+i);
		linkArray[i] = tmp;
	}
	// ranking rule not yet.
	dice = Math.floor( Math.random() * 6);
	sdice = dice.toString();
	videoNumber = videoNumber + 1;
	newTitle = videoNumber.toString() + '. ' + document.getElementById( 'atitle_' + sdice ).innerHTML;
	changeTitle( 'video_title', newTitle);
	changeTitle( 'sideList', 'Current Related List');
	eval( linkArray[dice].toString());
	var d = document.createElement("option");
	d.innerHTML = newTitle;
	d.setAttribute( "value", linkArray[dice].toString().slice( 25, 36) );
	document.getElementById("real_list").appendChild(d);

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
	videoNumber = 0;
	var d = document.createElement("option");
	d.innerHTML = "-- New Search Mission --";
	document.getElementById("real_list").appendChild(d);


	return false;
}


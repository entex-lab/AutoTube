var index = 0;

function overlap() {

	var container = new Array();
	// first;
	var d = document.getElementById('first');
	var ol = d.getElementsByTagName('ol');
	var lis = ol[0].getElementsByTagName('li');
	for( var i = 0; i < lis.length; ++i) {
		var temp_a = lis[i].getElementsByTagName('a');
		container[ temp_a[0].href.slice( 25, 36)] = 1;
	}
	// second;
	var d2 = document.getElementById('second');
	var ol2 = d2.getElementsByTagName('ol');
	var lis2 = ol2[0].getElementsByTagName('li');
	for( var i = 0; i < lis2.length; ++i) {
		var temp_b = lis2[i].getElementsByTagName('a');
		var tmp = container[ temp_b[0].href.slice( 25, 36)];
		container[ temp_b[0].href.slice( 25, 36)] = tmp ? (tmp + 1) : 1;
	}
	// third;
	var d3 = document.getElementById('third');
	var ol3 = d3.getElementsByTagName('ol');
	if( ol3.length > 0 ) { 
		var lis3 = ol3[0].getElementsByTagName('li');
		for( var i = 0; i < lis3.length; ++i) {
			var temp_c = lis3[i].getElementsByTagName('a');
			var tmp = container[ temp_c[0].href.slice( 25, 36)];
			container[ temp_c[0].href.slice( 25, 36)] = tmp ? ( tmp + 1) : 1;
		}
	}
	// overlap 
	if( document.getElementById( 'ov2'))
		document.getElementById( 'overlap2').removeChild( document.getElementById('ov2'));
	if( document.getElementById( 'ov3'))
		document.getElementById( 'overlap3').removeChild( document.getElementById('ov3'));
	var ov2 = document.createElement( 'ol');
	var ov3 = document.createElement( 'ol');
	ov2.setAttribute( "id", "ov2");
	ov3.setAttribute( "id", "ov3");
	for( var x in container) {
		if( container[x] == 2 ) {
			var tmp = document.createElement( 'li');
			tmp.innerHTML = x;
			ov2.appendChild( tmp);
		}
		if( container[x] == 3) {
			var tmp = document.createElement( 'li');
			tmp.innerHTML = x;
			ov3.appendChild( tmp);
		}
	}
	var aov2 = document.getElementById( 'overlap2').appendChild( ov2);
	var aov3 = document.getElementById( 'overlap3').appendChild( ov3);

}

function search() {

	var searchTerm = document.getElementById( 'term').value;
	searchTerm = encodeURIComponent( searchTerm);

	switch( index % 3) {
		case 0: {
			$('#first').load('./search.psp?term='+searchTerm,
				function(){
					$('#first').fadeIn();
					if( index > 1)
						overlap();
				}
			);
			break;
		}
		case 1: {
			$('#second').load('./search.psp?term='+searchTerm,
				function(){
					$('#second').fadeIn();
					overlap();
				}
			);
			break;
		}
		case 2: {
			$('#third').load('./search.psp?term='+searchTerm,
				function(){
					$('#third').fadeIn();
					overlap();
				}
			);
			break;
		}
		default : {
			//nothing
			alert('nothing');
		}
	}
	index += 1;
	return ;
}


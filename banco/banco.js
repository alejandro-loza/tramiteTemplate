banco = {
	sendBack: function() {
		console.log('location --> ' + location.toString().split('/')[3] );
		var newLoc = location.toString();
		
		var jumpTo = newLoc.split('/')[0] + '//' + newLoc.split('/')[2] +'/'+ newLoc.split('/')[3]  + '?q=success';
		location.href = jumpTo;
	}
}
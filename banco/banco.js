banco = {
	init: function() {

	},
	sendBack: function() {
		console.log('location --> ' + location.toString().split('/')[3] );
		var newLoc = location.toString();
		
		$('.pago-tarjeta').addClass('hidden');
		$('.loader').removeClass('hidden');

		var jumpTo = newLoc.split('/')[0] + '//' + newLoc.split('/')[2] +'/'+ newLoc.split('/')[3]  + '?q=success';

		setTimeout(function () {
            location.href = jumpTo;
        }, 1400);
	}
}
tramite = {
	url: "http://localhost:8080/",
	ws: "ws/bla",
	steps: ['buscar','preview','checkout','confirmation'],
	step: 0,
	init: function() {},
	current_step: function() {
		
	},
	next_step: function() {	
		var controller = this;	
		this.step++;
		var current_step = this.step;
		//console.log('ENTER ------->');
		//$('section').fadeOut('500', function() {
			$('section').addClass('hidden');
			$('.'+controller.steps[current_step]).removeClass('hidden');
			//console.log('controller.steps[current_step] --> ' + controller.steps[current_step]);
		//});
		if( controller.steps[current_step] == 'confirmation') {
			setTimeout(function() {
			$('.confirmation .loader').hide('fast', function() {			
				controller.confirmation();
			});
		}, 1000);
		}
	},
	previous_step: function() {
		$('section').addClass('hidden');
		$(this.steps[this.step-1]).removeClass('hidden');	
	},
	search: function() {
		
		var controller = this;
		//$('')

		var data = [
			{folio: '12AD23', nombre: 'Juan', primer_apellido: 'Gomez'},
			{folio: '14BC23', nombre: 'Pedro', primer_apellido: 'Gomez'},
			{folio: '21RT23', nombre: 'Gabriel', primer_apellido: 'Gomez'}
		];

		$('#folios').removeClass('hidden').show('slow');

		setTimeout(function() {
			$('#folios .loader').hide('fast', function() {			
				controller.addFolios(data);
			});
		}, 1000);
		/*
		$.ajax({
			url: controller.url + controller.ws,
			type: 'GET',
			success: function() {
				//steps: selected step + 1 
			},
			error: function() {

			}
		});
		*/
	},
	addFolios: function(data) {
		var controller = this;
		data.forEach(function(folio) {	
			var folio = $('<div/>')
			  .data('folio', folio.folio)
			  .addClass('folio col-md-12')
			  .css({'background-color':'#ececec','margin-bottom':'8px','padding':'10px'})
			  .text(folio.folio)
			  .on('click', function() {controller.selectFolio(this) })
			  .appendTo('.folios-holder');
		});
	},
	selectFolio: function(element) {		
		$(element).css({'background-color':'#999'})
		$('.next_step').removeClass('hidden');
	},
	preview: function() {
		// TODO ajax to get preview acta
		alert('ajua');
	},
	dataError: function() {

	},
	checkout: function() {
		//$('section').addClass('hidden');
		//$('.checkout').removeClass('hidden');
	},
	confirmation: function() {
		//$('section').addClass('hidden');
		//$('.confirmation').removeClass('hidden');
		$('.exito').removeClass('hidden');
	}
}
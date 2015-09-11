tramite = {
	//ls: 'gobmx-tramites-v1',
	ls: 'gob_mx_session_token:atuh-manager-v1.0',
	//url: "http://172.20.161.4:7101/",
	url: "http://10.15.3.32/",
	ws: "ActaNac/RestService/ActaNac/byCURP",
	rightNow: '',
	steps: ['buscar','preview','checkout','confirmation'],
	step: 0,
	init: function() {
		if( localStorage.getItem(this.ls) != null ) {
			console.log('session exists');
			
			var key = JSON.parse(window.localStorage[this.ls]);
			var token = key.json.token;		
			var expires = new Date(key.json.expires);
			this.rightNow = new Date();

			if( expires.getTime() > this.rightNow.getTime() ) {
				console.log('still alive');

				/*
				$.ajax({
					url: '/authToken',
					dataType: '',
					success: function() {

					},
					error: function() {

					}
				});*/

				this.step = key.json.step;
				console.log(' step ---> ' + this.step);
				this.current_step();

			} else {
				console.log('expired');
				//delete window.localStorage[this.ls]
				this.step = 0;
			}			
		} else { this.step = 0; }

		
		//localStorage.setItem(this.ls, {"json":{"token": "333X2A", "step": 2, "expires":"Thu, 18 Dec 2013 12:00:00 UTC;"}, status: 201}");
		//document.cookie="username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC;";		
	},
	current_step: function() {
		var controller = this;
		var current_step = this.step;

		$('section').addClass('hidden');
		$('.'+controller.steps[current_step]).removeClass('hidden');
	},
	next_step: function() {	
		var controller = this;
		var current_step = this.step++;

		$('section').addClass('hidden');
		$('.'+controller.steps[current_step]).removeClass('hidden');

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
		
		$.ajax({
			url: this.url + this.ws,
			type: 'POST',
        	contentType: "application/json",        	
        	dataType: 'json',
		    crossOrigin:true,
		    crossDomain:true,
			data: JSON.stringify({
				"dependencia" : "PRESIDENCIA",
				"curp" : "HUTR840605HDFRRB00",
				"hash" : "b09ffbf37a4a284c9fdff4f2c5532f22ae454486",
				"isImg" : 0
			}),
			success: function(response) {
				//steps: selected step + 1 
				var filteredResponse = JSON.stringify(response.return.nacimientos[0]);
				alert(filteredResponse);
			},
			error: function(e) {
				alert("error" + e )
			}
		});
		

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
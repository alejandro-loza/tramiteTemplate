tramite = {
    //ls: 'gobmx-tramites-v1',
	ls: 'gob_mx_session_token:atuh-manager-v1.0',

    url: "http://10.15.3.32/",
	ws: "ActaNac/RestService/ActaNac/byCURP",



    steps: ['buscar', 'preview', 'select-folio', 'checkout', 'confirmation'],
    step: 0,
    init: function () {
    },
    current_step: function () {

    },
    next_step: function () {
        var controller = this;
        this.step++;
        var current_step = this.step;
        //console.log('ENTER ------->');
        //$('section').fadeOut('500', function() {
        $('section').addClass('hidden');
        $('.' + controller.steps[current_step]).removeClass('hidden');
        //console.log('controller.steps[current_step] --> ' + controller.steps[current_step]);
        //});
        if (controller.steps[current_step] == 'confirmation') {
            setTimeout(function () {
                $('.confirmation .loader').hide('fast', function () {
                    controller.confirmation();
                });
            }, 1000);
        }
    },
    previous_step: function () {
        $('section').addClass('hidden');
        $(this.steps[this.step - 1]).removeClass('hidden');
    },
    search: function () {

        var controller = this;
        var actaResponse;

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
				 actaResponse = response.return.nacimientos[0];

			},
			error: function(e) {
				alert("error" + e )
			}
		});

        $('#folios').removeClass('hidden').show('slow');

        setTimeout(function () {
            $('#folios .loader').hide('fast', function () {
                controller.addActa(actaResponse);
            });
        }, 1000);       
    },
    addActa: function (actaResponse) {        

        var camposActa=['folio','oficialia','foja','libro','noActa','nombre','fechaNacimiento','curp','estadoNacNombre','nacionalidad','nombre','primerApellido','segundoApellido','sexo','vivoMuerto'];           
        for(x=0; x<camposActa.length; x++){ 
            var acta = $("<p style='font-size: 8pt; text-align: center;'/>")
            acta.text(camposActa[x] +':'+ actaResponse[camposActa[x]])
            acta.appendTo('.detalle-acta');
        }
                       

    },
    selectFolio: function (element) {
        $(element).css({'background-color': '#999'})
        $('.next_step').removeClass('hidden');
    },
    preview: function () {
        // TODO ajax to get preview acta
        alert('ajua');
    },
    dataError: function () {

    },
    checkout: function () {
        //$('section').addClass('hidden');
        //$('.checkout').removeClass('hidden');
    },
    confirmation: function () {
        //$('section').addClass('hidden');
        //$('.confirmation').removeClass('hidden');
        $('.exito').removeClass('hidden');
    }
}
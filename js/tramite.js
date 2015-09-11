tramite = {
    url: "http://localhost:8080/",
    ws: "ws/bla",
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
        //$('')

        var actaResponse = [{"folio": "12AD23", "nombre": "Juan", "apellido": "Gomez"}];

        $('#folios').removeClass('hidden').show('slow');

        setTimeout(function () {
            $('#folios .loader').hide('fast', function () {
                controller.addFolios(actaResponse);
            });
        }, 1000);       
    },
    addFolios: function (actaResponse) {        

        var camposActa=['folio','oficialia','foja','libro','noActa','nombre','fechaNacimiento','curp','estadoNacNombre','nacionalidad','nombre','primerApellido','segundoApellido','sexo','vivoMuerto'];           
        for(x=0; x<camposActa.length; x++){ 
            var acta = $("<p style='font-size: 8pt; text-align: center;'/>")
            acta.text(Object.keys(actaResponse[0])[x] +':'+ actaResponse[0][camposActa[x]])
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
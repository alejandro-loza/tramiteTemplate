tramite = {
    //ls: 'gobmx-tramites-v1',
    ls: 'gob_mx_session_token:auth-manager-v0.1',
    url: "http://10.15.3.32",      
    wsCURP:  "/ActaNac/RestService/ActaNac/byCURP",  
    wsPDF: "/ActaNac/RestService/ActaNac/getPDF",        
    steps: ['buscar', 'preview', 'checkout', 'confirmation'],
    step: 0,
    actaResponse: '',
    init: function () {
        var controller = this;
        //console.log(' -------> ' + window.location.toString().split('?')[1] );

        //localStorage.setItem(this.ls, '{"json":{"token": "333X2A", "step": 2, "expires":"Mon, 14 Sep 2015 13:20:00 UTC;"}, "status": 201}');
        //localStorage.setItem(this.ls, JSON.stringify({"json":{"token": "333X2A", "step": 0, "folio": "", "expires":"Mon Sep 14 2015 16:10:00 GMT-0500"}, "status": 201}));
        console.log('session search ' + JSON.stringify(window.localStorage) );
        if( localStorage[this.ls] != null ) {
            console.log('session exists');            
            var key = JSON.parse(window.localStorage[this.ls]);
            var token = key.json.token;     
            var expires = new Date(key.json.expires);
            this.rightNow = new Date();
            
            if( expires.getTime() > this.rightNow.getTime() ) {
                console.log('still alive');

                if( window.location.toString().split('=')[1] == 'success') {
                    controller.step = 3;                    
                } else if( window.location.toString().split('=')[1] == 'excepction') {
                    controller.step = 4;
                } else {
                    this.step = 0;
                }

                /* TODO TOKEN AJAX
                $.ajax({
                    url: '/authToken',
                    dataType: '',
                    success: function() {

                    }
                });*/

                console.log(' step ---> ' + this.step);
                

            } else {
                console.log('expired');
                //delete window.localStorage[this.ls]
                this.step = 0;
            }           
        } else { 
            console.log('what');
            //localStorage.setItem(this.ls, '{"json":{"token": "333X2A", "step": 2, "expires":"Mon, 14 Sep 2015 13:20:00 UTC;"}, "status": 201}');
            this.step = 0; 
        }
        this.current_step();        
    },
    current_step: function () {
        var controller = this;
        var current_step = this.step;
        console.log(' current_step ---> ' + controller.steps[current_step] );
        $('section').addClass('hidden');
        $('.'+controller.steps[current_step]).removeClass('hidden');
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
        var curp = document.getElementById("CURP").value;
        //alert (curp);

        var shaObj = new jsSHA("SHA-1", "TEXT");
        shaObj.update("PRESIDENCIA"+curp);
        var hash = shaObj.getHash("HEX");
        //alert (hash);
        
        $.ajax({
            url: this.url + this.wsCURP,
            type: 'POST',            
            contentType: "application/json",            
            dataType: 'json',
            crossOrigin: true,
            crossDomain: true,
            data: JSON.stringify({
                "dependencia": "PRESIDENCIA",
                //"curp": "HUTR840605HDFRRB00",
                "curp": curp,
                //hash": "b09ffbf37a4a284c9fdff4f2c5532f22ae454486",                           
                "hash": hash,
                "isImg": 0
            }),
            success: function (response) {
                //steps: selected step + 1 
                controller.actaResponse = response.return.nacimientos[0];
                //alert("Respuesta: " + actaResponse);

            },
            error: function (e) {
                alert("Error: " + e);
            }
        });

        $('#folios').removeClass('hidden').show('slow');

        setTimeout(function () {
            $('#folios .loader').hide('fast', function () {
                controller.addActa(controller.actaResponse);
            });
        }, 1000);
    },
    addActa: function (actaResponse) {
        var controller = this;
        var camposActa = ['folio', 'oficialia', 'foja', 'libro', 'noActa', 'fechaNacimiento', 'curp', 'estadoNacNombre', 'nombre', 'primerApellido', 'segundoApellido', 'sexo', 'vivoMuerto'];
        for (x = 0; x < camposActa.length; x++) {
            var acta = $("<p style='font-size: 8pt; text-align: center;'/>")
            acta.text(camposActa[x] + ':' + controller.actaResponse[camposActa[x]])
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
    },
    download: function () {
    	var pdf;
        var controller = this;
        var folio = JSON.parse(window.localStorage[controller.ls]).json.folio;
        $('.download-loading').removeClass('hidden');

        
    	$.ajax({
            url: this.url + this.wsPDF,
            type: 'POST',            
            contentType: "application/json",            
            dataType: 'json',
            crossOrigin: true,
            crossDomain: true,
            data: JSON.stringify({               	
					"arg0": folio
            }),
            success: function (response) {
                pdf = response.return.Reporte;
                setTimeout(function(){
                	var url = 'data:aplication/pdf;base64,' + pdf ;
                	window.open(url);
                    console.log('start download');
                    $('.download-loading').addClass('hidden');
                },3000);
            },
            error: function (e) {
                alert("Error: " + e);
            }
        });



    },   
}
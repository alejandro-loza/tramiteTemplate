tramite = {
    //ls: 'gobmx-tramites-v1',
    ls: 'gob_mx_session_token:atuh-manager-v1.0',
    url: "http://10.15.3.32",
    wsCURP: "/ActaNac/RestService/ActaNac/byCURP",
    wsPDF: "/ActaNac/RestService/ActaNac/getPDF",
    steps: ['buscar', 'preview', 'checkout', 'confirmation'],
    step: 0,
    actaResponse: '',
    init: function () {
        var controller = this;
        
        //localStorage.setItem(this.ls, JSON.stringify({"json":{"token": "333X2A", "step": 0, "folio": "", "expires":"Mon Sep 15 2015 16:10:00 GMT-0500"}, "status": 201}));
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

                console.log(' step ---> ' + this.step);


            } else {
                delete window.localStorage[this.ls]
                this.step = 0;
            }           
        } else { 
            console.log('what');            
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
        $('section').addClass('hidden');
        $('.' + controller.steps[current_step]).removeClass('hidden');        
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
	startTimeOut: function() {
		setTimeout(function() {
			$("#errorLog").fadeOut();
		}, 3000);
	},
    search: function () {
        var controller = this;
        var user = document.getElementById("user").value;
        var password = document.getElementById("password").value;
        if(user === password){
            //TODO ws de logeo
            this.next_step();
        }
        else{
            errorFlagMessage("password incorrecto");
			controller.startTimeOut(controller.masterTimer);
        }

			function errorFlagMessage(message) {
				$("#errorLog").html('<span class="alert alert-danger alert-complement"><small>' + message + '</small></span>').show();
			}
    },

}
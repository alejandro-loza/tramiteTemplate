tramite = {
    //ls: 'gobmx-tramites-v1',
    ls: 'gob_mx_session_token:atuh-manager-v1.0',
    url: "http://10.15.3.32",
    wsCURP: "/ActaNac/RestService/ActaNac/byCURP",
    wsPDF: "/ActaNac/RestService/ActaNac/getPDF",
    steps: ['buscar', 'preview'],
    step: 0,
	flag : 1,
    actaResponse: '',
    init: function () {
        var controller = this;
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
        if(user === password && controller.flag != 0){
			console.log("sin confirmar pass")
            //TODO ws de logeo
            this.next_step();
        }
		else if(user === '' || password === '' || user === undefined || password === undefined){
            errorFlagMessage("Usuario y password requeridos");
		}
		else if(user === password && controller.flag === 0){
		  $('#myModal').modal('show');	
		}
        else{
            errorFlagMessage("password incorrecto");
			controller.startTimeOut(controller.masterTimer);
        }

	    function errorFlagMessage(message) {
		   $("#errorLog").html('<span class="alert alert-danger alert-complement"><small>' + message + '</small></span>').show();
		}
    },
	evaluateValueInRegex: function(value,regex) {
     	var exp = new RegExp(/(?=^.{6,}$)((?=.*\d)|(?!=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
		return  exp.test(value);
	},
	changePassword: function(){
        var controller = this;
        var password = document.getElementById("password").value;
        var passwordToChange = document.getElementById("passwordChange").value;
        var newPassword = document.getElementById("newPassword").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
		if(password !== passwordToChange){
            errorMessage("Password incorrecto");
		}
		else if (newPassword !== confirmPassword){
            errorMessage("Las nuevas contraseñas no son iguales");
		}
		else if (newPassword.length < 6 || newPassword.length > 11 ){
            errorMessage("Longitud inválida la contraseña debe tener entre 6 a 10 caracteres");
		}
		else if (!this.evaluateValueInRegex(newPassword )){
            errorMessage("Formato invalido");
		}
		else{
            document.getElementById("password").value = '';
			this.flag = 1;
			$('#myModal').modal('hide');
		}

		function errorMessage(message) {
			$("#errorModalFlashMessage").html('<span class="alert alert-danger alert-complement"><small>' + message + '</small></span>').show();
			controller.startTimeOut(controller.masterTimer);
		}
	},
	sendMacrotramite:function(){
        var controller = this;
		if( $('#tab-01').hasClass('active')) {
            var folioSeguimiento = document.getElementById("folioSeguimiento") ;
            var homoclave = document.getElementById("homoclave");
            var estatus = document.getElementById("estatus")  ;
            var resolucion = document.getElementById("resolucion");
            var nota = document.getElementById("nota") ;
			var formData = [folioSeguimiento, homoclave, estatus, resolucion, nota];
			var busqueda =formData.find(findMissing );
			if(formData.find(findMissing )){
				alert("faltan campos")
			}else{
               document.getElementById("folioSeguimiento").value = '';
               document.getElementById("homoclave").value= '';
               document.getElementById("estatus").value  = '';
               document.getElementById("resolucion").value= '';
               document.getElementById("nota").value = '';
				$("#errorLog").html('<span class="alert alert-success alert-complement"><small>' + 'Tramite Creado' + '</small></span>').show();
				controller.startTimeOut(controller.masterTimer);
			}
		}
		else if($('#tab-02').hasClass('active')){
			$('#myModal2').modal('show');
		}
		function findMissing(form) {
	       return form.value === '';
		}
   	}

}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* COMPORTAMIENTOS DE LAS TARJETAS */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

$(document).ready(function(){

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// FORM.HTML
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	$("#email-input").focus();

	formSettings("1");
	formSettings("2");

	var div = "";

	if(localStorage.getItem('button') === 'payment'){
	    showCard("1");
	} else if(localStorage.getItem('button') === 'recovery') {
		showCard("2");
	} else {
		showCard("1");
	}

	//localStorage.removeItem('button');

	// Función para mostrar la tarjeta de compra o de recuperación
	function showCard(cardId) {
		$("#main-subcontainer_" + cardId + div).css('opacity', '1');
		$("#main-subcontainer_" + cardId + div).css('pointer-events', 'auto');
		$("#main-subcontainer_" + cardId + div).css('transform', 'translate(0, 0)');

		if($(window).width() > 980) {
			$("#email-input_" + cardId).focus();
		}
		$(window).scrollTop(0);
	}

	// Subtítulo para cambiar al formulario de recuperación
	$("#main-subcontainer_1 .payment-card-subtitle a").click(function() {

		localStorage.setItem('button', 'recovery');

		$(".main-subcontainer").css('transition', '.4s');
		$("#main-subcontainer_2 .payment-card-subtitle a").css('pointer-events', 'none');

		// Desvanecemos el formulario de inicio de sesión
		$("#main-subcontainer_1" + div).animate({opacity: 0}, {queue: true, duration: 50});
		$("#main-subcontainer_1" + div).css('pointer-events', 'none');

		$("#main-subcontainer_1" + div).css('transform', 'translate(-54em, 0)');

		// Pasados unos milisegundos
		setTimeout(function() {		

			// Hacemos aparecer el formulario de registro
			$("#main-subcontainer_2" + div).animate({opacity: 1}, {queue: false, duration: 80});
			$("#main-subcontainer_2" + div).css('pointer-events', 'auto');
			$("#main-subcontainer_2" + div).css('transform', 'translate(0, 0)');					

			// Buscamos el campo vacío más cercano al top para ubicar el focus
			if($(window).width() > 980) {
				$("#main-subcontainer_2 input").focus();
			}			
		}, 50)

		setTimeout(function() {
			$("#main-subcontainer_1" + div).css('transform', 'translate(-25em, 0)');
			$(".main-subcontainer").css('transition', '.0s');
			$("#main-subcontainer_2 .payment-card-subtitle a").css('pointer-events', 'auto');
		}, 500)
	});

	// Subtítulo para cambiar al formulario de registro
	$("#main-subcontainer_2 .payment-card-subtitle a").click(function() {

		localStorage.setItem('button', 'payment');

		$(".main-subcontainer").css('transition', '.4s');
		$("#main-subcontainer_1 .payment-card-subtitle a").css('pointer-events', 'none');

		// Desvanecemos el formulario de inicio de sesión
		$("#main-subcontainer_2" + div).animate({opacity: 0}, {queue: true, duration: 50});
		$("#main-subcontainer_2" + div).css('pointer-events', 'none');

		$("#main-subcontainer_2" + div).css('transform', 'translate(54em, 0)');

		// Pasados unos milisegundos
		setTimeout(function() {		

			// Hacemos aparecer el formulario de registro
			$("#main-subcontainer_1" + div).animate({opacity: 1}, {queue: false, duration: 80});
			$("#main-subcontainer_1" + div).css('pointer-events', 'auto');
			$("#main-subcontainer_1" + div).css('transform', 'translate(0, 0)');	

			// Buscamos el campo vacío más cercano al top para ubicar el focus
			if($(window).width() > 980) {
				$("#main-subcontainer_1 input").focus();
			}
		}, 50)

		setTimeout(function() {					
			$("#main-subcontainer_2" + div).css('transform', 'translate(25em, 0)');
			$(".main-subcontainer").css('transition', '0s');
			$("#main-subcontainer_1 .payment-card-subtitle a").css('pointer-events', 'auto');
		}, 500)
	});

	// Función para configurar los formularios de la sección Pro
	function formSettings(formId) {

		// Verificación de lo escrito en el campo de texto del email
		$('#main-subcontainer_' + formId + ' .field-container input').on('input', function() {

			// Al introducir un valor válido en los campos del formulario, el icono se resalta		
			if(isValidEmailAddress($('#main-subcontainer_' + formId + ' .field-container input').val())) {
				if(formId == 1) {
					$('#main-subcontainer_' + formId + ' .payment-card-icon').css('opacity', '.5');
				} else {
					$('#main-subcontainer_' + formId + ' .recover-icon').css('opacity', '.7');
				}			
			}
			// Si no hay ningún carácter en los campos de texto, el icono disminuye su intensidad
			else {
				if(formId == 1) {
					$('#main-subcontainer_' + formId + ' .payment-card-icon').css('opacity', '.1');
				} else {
					$('#main-subcontainer_' + formId + ' .recover-icon').css('opacity', '.4');
				}			
			}
		});

		// Al pulsar el botón del formulario
		$('#main-subcontainer_' + formId + ' .payment-card-subcontainer .submit').click(function() {

			// Si el formulario es válido
			if($('#main-subcontainer_' + formId + ' form').valid()) {

				// Subimos el scroll al top en la versión móvil
				if($(window).width() <= 980) {
					$(window).scrollTop(0);
				}

				// AJAX. Comprobamos si el usuario existe en la base de datos
				var xmlhttp9 = new XMLHttpRequest();
		        xmlhttp9.open("GET", "check_user.php?q=" + $("#email-input_" + formId).val(), true);
		        xmlhttp9.send();
				
		        xmlhttp9.onreadystatechange = function() {
		            if (this.readyState == 4 && this.status == 200) {

		            	// Formulario para acceder al pago
		            	if(formId == 1) {

		            		// Si el email no se encuentra en la base de datos
							if (xmlhttp9.responseText == 0) {

								// La interfaz principal se desvanece
								$('#main-subcontainer_' + formId + ' .payment-card-subcontainer').animate({opacity: 0}, {queue: false, duration: 200});
								$('#main-subcontainer_' + formId + ' .payment-card-subcontainer').css('pointer-events', 'none');

								// Pasados unos milisegundos aparece el icono de carga
								setTimeout(function() {
									$('#main-subcontainer_' + formId + ' .loading-container').animate({opacity: 1}, {queue: false, duration: 270});
									$('#main-subcontainer_' + formId + ' .loading-container').css('pointer-events', 'auto');
								}, 50);

								// AJAX. Enviamos el email introducido desde el propio HTML
								var xmlhttp = new XMLHttpRequest();
						        xmlhttp.open("GET", "emailing.php?q=" + $("#email-input_" + formId).val(), true);
						        xmlhttp.send();

						        // Cuando se reciba respuesta del php se muestra el tick
						        xmlhttp.onreadystatechange = function() {

						            if (this.readyState == 4 && this.status == 200) {

						            	// alert(xmlhttp.responseText);

						                $('#main-subcontainer_' + formId + ' .loading-container').animate({opacity: 0}, {queue: false, duration: 270});
										$('#main-subcontainer_' + formId + ' .loading-container').css('pointer-events', 'none');

										// Si el email se ha enviado
										if (xmlhttp.responseText == 1) {

											setTimeout(function() {
												$('#main-subcontainer_' + formId + ' .confirmation-message').animate({opacity: 1}, {queue: false, duration: 270});
												$('#main-subcontainer_' + formId + ' .confirmation-message').css('pointer-events', 'none');
											}, 150);
										} 
										// Si no se ha podido enviar el email
										else if (xmlhttp.responseText == 0) {

											setTimeout(function() {
												alert("No se ha podido enviar el email");

												$('#main-subcontainer_' + formId + ' .loading-container').animate({opacity: 0}, {queue: false, duration: 150});
												$('#main-subcontainer_' + formId + ' .loading-container').css('pointer-events', 'none');
												
												setTimeout(function() {
													$('#main-subcontainer_' + formId + ' .payment-card-subcontainer').animate({opacity: 1}, {queue: false, duration: 270});
													$('#main-subcontainer_' + formId + ' .payment-card-subcontainer').css('pointer-events', 'auto');
												}, 100);											
											}, 270);										
										}									
						            }
						        };

			            	} 
			            	// Si el email ya está registrado
			            	else if (xmlhttp9.responseText == 1) {

			            		alert("¡Email ya registrado!");
			            	}
			            }

			            // Formulario para recuperar la clave de producto
			            else {

			            	// Si el email no se encuentra en la base de datos
			            	if (xmlhttp9.responseText == 0) {

			            		alert("¡Email no encontrado!");
								
			            	} 
			            	// Si el email ya está registrado
			            	else if (xmlhttp9.responseText == 1) {

			            		// La interfaz principal de desvanece
								$('#main-subcontainer_' + formId + ' .payment-card-subcontainer').animate({opacity: 0}, {queue: false, duration: 200});
								$('#main-subcontainer_' + formId + ' .payment-card-subcontainer').css('pointer-events', 'none');

								// Pasados unos milisegundos aparece el icono de carga
								setTimeout(function() {
									$('#main-subcontainer_' + formId + ' .loading-container').animate({opacity: 1}, {queue: false, duration: 270});
									$('#main-subcontainer_' + formId + ' .loading-container').css('pointer-events', 'auto');
								}, 50);

								// AJAX. Enviamos el email introducido desde el propio HTML
								var xmlhttp = new XMLHttpRequest();
						        xmlhttp.open("GET", "emailing_iampro.php?q=" + $("#email-input_" + formId).val(), true);
						        xmlhttp.send();

						        // Cuando se reciba respuesta del php se muestra el tick
						        xmlhttp.onreadystatechange = function() {
						            
						            if (this.readyState == 4 && this.status == 200) {
						                
										$('#main-subcontainer_' + formId + ' .loading-container').animate({opacity: 0}, {queue: false, duration: 270});
										$('#main-subcontainer_' + formId + ' .loading-container').css('pointer-events', 'none');

										// Si el email se ha enviado
										if (xmlhttp.responseText == 1) {

											setTimeout(function() {
												$('#main-subcontainer_' + formId + ' .confirmation-message').animate({opacity: 1}, {queue: false, duration: 270});
												$('#main-subcontainer_' + formId + ' .confirmation-message').css('pointer-events', 'auto');
											}, 150);
										} 
										// Si no se ha podido enviar el email
										else if (xmlhttp.responseText == 0) {

											setTimeout(function() {
												alert("No se ha podido enviar el email");

												$('#main-subcontainer_' + formId + ' .loading-container').animate({opacity: 0}, {queue: false, duration: 150});
												$('#main-subcontainer_' + formId + ' .loading-container').css('pointer-events', 'none');
												
												setTimeout(function() {
													$('#main-subcontainer_' + formId + ' .payment-card-subcontainer').animate({opacity: 1}, {queue: false, duration: 270});
													$('#main-subcontainer_' + formId + ' .payment-card-subcontainer').css('pointer-events', 'auto');
												}, 100);											
											}, 270);										
										}
						            }
						        };	            		
			            	}
			   			}
		            }
		        };
			} else {
				$("#email-input_" + formId).focus();
			}			
		});

		// Atajo de teclado para registrar nuevos nombres mediante la tecla enter si el focus lo tiene el campo del correo
		$('#main-subcontainer_' + formId + ' .field-container input').keydown(function(){

			var x = event.keyCode;				
			if(x == 13 && $('#main-subcontainer_' + formId + ' .payment-card-subcontainer .submit').attr("disabled") != "disabled") {
				$('#main-subcontainer_' + formId + ' .payment-card-subcontainer .submit').click();
			}
		});

		// Email al ganar el focus
		$('#main-subcontainer_' + formId + ' .email-input').focus(function() {

			// El placeholder personalizado pasa a estar por encima de su campo de texto
			$('#main-subcontainer_' + formId + ' #placeholder_email').addClass("placeholder_up");
			// Se resalta el icono que ilustra el campo de texto
			$('#main-subcontainer_' + formId + ' .field-icon').addClass("field-icon_up");
		});
		// Email al perder el focus
		$('#main-subcontainer_' + formId + ' .email-input').focusout(function(){

			// Si el campo de texto está vacío
			if($('#main-subcontainer_' + formId + ' .email-input').val() == "") {

				// El placeholder vuelve a su posición original
				$('#main-subcontainer_' + formId + ' #placeholder_email').removeClass("placeholder_up");
				// El icono toma su opacidad original
		  		$('#main-subcontainer_' + formId + ' .field-icon').removeClass("field-icon_up");
			}			  	
		});

		// Validación del formulario
		$(function() {

			$('#main-subcontainer_' + formId + ' form').validate({

				// Reglas
				rules: {
					email: {							
						required: true,
						noSpace: true,
						maxlength: 60,	
						email: false,
						custom_email: true,
					},				
				},

				// Mensajes de error
				messages: {
					email: {
						required: "Campo requerido",
						maxlength: "El campo no puede superar los 60 caracteres",
					},
				},
			});

			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

			// Método para el email
			$.validator.addMethod("custom_email", function(value, element) {
			    return value.match(emailReg)
			}, "Por favor, introduzca un email válido"); // "El email debe seguir el formato *@*.*");

			// Método para el @
			/*$.validator.addMethod("reg_at", function(value, element) {
			    return value.match("@")
			}, "El email debe incluir @");

			// Método para el "."
			$.validator.addMethod("reg_dot", function(value, element) {
			    return value.match(/\./g)
			}, "El email debe incluir un punto que separe el dominio");*/

			// Método para controlar que ho haya espacios en blanco
			jQuery.validator.addMethod("noSpace", function(value, element) { 
			  return value.match(whiteSpaceReg); 
			}, "Los espacios en blanco no están permitidos");
		});		
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// CONTACT.HTML
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	contactInputs("1");
	contactInputs("2");

	function contactInputs(inputId) {
		// Campo al ganar el focus
		$('#main-subcontainer_contact #input_' + inputId).focus(function() {

			// El placeholder personalizado pasa a estar por encima de su campo de texto
			$('#main-subcontainer_contact #placeholder_key_' + inputId).addClass("placeholder_up_dark");
			// Se resalta el icono que ilustra el campo de texto
			$('#main-subcontainer_contact #icon_key_' + inputId).addClass("field-icon_up");
		});
		// Campo al perder el focus
		$('#main-subcontainer_contact #input_' + inputId).focusout(function(){

			// Si el campo de texto está vacío
			if($('#main-subcontainer_contact #input_' + inputId).val() == "") {

				// El placeholder vuelve a su posición original
				$('#main-subcontainer_contact #placeholder_key_' + inputId).removeClass("placeholder_up_dark");
				// El icono toma su opacidad original
		  		$('#main-subcontainer_contact #icon_key_' + inputId).removeClass("field-icon_up");
			}
		});
	}

	// Validación del formulario
	$(function() {

		$('#main-subcontainer_contact form').validate({

			// Reglas
			rules: {
				email: {							
					required: true,
					noSpace: true,
					maxlength: 60,	
					email: false,
					custom_email: true,
				},
				subject: {							
					required: true,
					minlength: 3,
					maxlength: 60,
					email: false,
				},
				body: {
					required: true,
					email: false,
					maxlength: 2000,
				},		
			},

			// Mensajes de error
			messages: {
				email: {
					required: "Campo requerido",
					maxlength: "El campo no puede superar los 60 caracteres",
				},
				subject: {
					required: "Campo requerido",
					minlength: "Por favor, introduzca tres caracteres por lo menos",
					maxlength: "El campo no puede superar los 60 caracteres",
				},
				body: {
					required: "Campo requerido",
					maxlength: "El campo no puede superar los 2000 caracteres",
				},
			},
		});

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		
		// Método para el email
		$.validator.addMethod("custom_email", function(email, element) {
		    return email.match(emailReg)
		}, "Por favor, introduzca un email válido");

		// Método para controlar que ho haya espacios en blanco
		jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.match(whiteSpaceReg); 
		}, "Los espacios en blanco no están permitidos");
	});

	$("#input_1").focus();

	$("#main-subcontainer_contact .submit").on("click", function(e) {

		if($("#main-subcontainer_contact form").valid()) {

			// Apaño para evitar que el email se envíe dos veces
			var $link = $(e.target);
		    e.preventDefault();

		    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
		        // La interfaz principal de desvanece
				$('#main-subcontainer_contact .payment-card-subcontainer').animate({opacity: 0}, {queue: false, duration: 200});
				$('#main-subcontainer_contact .payment-card-subcontainer').css('pointer-events', 'none');

				// Pasados unos milisegundos aparece el icono de carga
				setTimeout(function() {
					$('#main-subcontainer_contact .loading-container').animate({opacity: 1}, {queue: false, duration: 270});
					$('#main-subcontainer_contact .loading-container').css('pointer-events', 'auto');
				}, 50);

				var xmlhttp3 = new XMLHttpRequest();
			    xmlhttp3.open("GET", "contact.php?e=" + $("#input_1").val() + "&s=" + $("#input_2").val() + "&b=" + $("#main-subcontainer_contact textarea").val(), true);
			    xmlhttp3.send();

			    // Cuando se reciba respuesta del php se muestra el tick
			    xmlhttp3.onreadystatechange = function() {		        
		        	if (this.readyState == 4 && this.status == 200) {
		                $('#main-subcontainer_contact .loading-container').animate({opacity: 0}, {queue: false, duration: 270});
						$('#main-subcontainer_contact .loading-container').css('pointer-events', 'none');

						// Si el email se ha enviado
						if (xmlhttp3.responseText == 1) {

							setTimeout(function() {
								$('#main-subcontainer_contact .confirmation-message').animate({opacity: 1}, {queue: false, duration: 270});
								$('#main-subcontainer_contact .confirmation-message').css('pointer-events', 'auto');
							}, 150);
						}
						// Si no se ha podido enviar el email
						else if (xmlhttp3.responseText == 0) {

							setTimeout(function() {
								alert("No se ha podido enviar el email");

								$('#main-subcontainer_contact .loading-container').animate({opacity: 0}, {queue: false, duration: 270});
								$('#main-subcontainer_contact .loading-container').css('pointer-events', 'none');
								
								setTimeout(function() {

									$('#main-subcontainer_contact .payment-card-subcontainer').animate({opacity: 1}, {queue: false, duration: 270});
									$('#main-subcontainer_contact .payment-card-subcontainer').css('pointer-events', 'auto');
								}, 100);											
							}, 270);										
						}
	            	}
			    };

			    if (this.readyState == 4 && this.status == 200) {
					                
					$('#main-subcontainer_' + formId + ' .loading-container').animate({opacity: 0}, {queue: false, duration: 270});
					$('#main-subcontainer_' + formId + ' .loading-container').css('pointer-events', 'none');

					// Si el email se ha enviado
					if (xmlhttp.responseText == 1) {

						setTimeout(function() {
							$('#main-subcontainer_' + formId + ' .confirmation-message').animate({opacity: 1}, {queue: false, duration: 270});
							$('#main-subcontainer_' + formId + ' .confirmation-message').css('pointer-events', 'auto');
						}, 150);
					} 
					// Si no se ha podido enviar el email
					else if (xmlhttp.responseText == 0) {

						setTimeout(function() {
							alert("No se ha podido enviar el email");

							$('#main-subcontainer_' + formId + ' .loading-container').animate({opacity: 0}, {queue: false, duration: 150});
							$('#main-subcontainer_' + formId + ' .loading-container').css('pointer-events', 'none');
							
							setTimeout(function() {
								$('#main-subcontainer_' + formId + ' .payment-card-subcontainer').animate({opacity: 1}, {queue: false, duration: 270});
								$('#main-subcontainer_' + formId + ' .payment-card-subcontainer').css('pointer-events', 'auto');
							}, 100);											
						}, 270);										
					}
	            }
		    }

		    $link.data('lockedAt', +new Date());			
		} else {

			if($("#input_1").val() == "" || $("#field-container_1 .error").text() != "") {
				$("#input_1").focus();
			} else if ($("#input_2").val() == "" || $("#field-container_2 .error").text() != "") {
				$("#input_2").focus();
			} else if ($("#input_3").val() == "" || $("#field-container_3 .error").text() != "") {
				$("#input_3").focus();
			}
		}
	});

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// KEY.HTML
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	keyinputs("1");
	keyinputs("2");

	function keyinputs(inputId) {

		// Contraseña al ganar el focus
		$('#main-subcontainer_key #key-input_' + inputId).focus(function() {

			// El placeholder personalizado pasa a estar por encima de su campo de texto
			$('#main-subcontainer_key #placeholder_key_' + inputId).addClass("placeholder_up_dark");
			// Se resalta el icono que ilustra el campo de texto
			$('#main-subcontainer_key #icon_key_' + inputId).addClass("field-icon_up");
		});
		// Contraseña al perder el focus
		$('#main-subcontainer_key #key-input_' + inputId).focusout(function(){

			// Si el campo de texto está vacío
			if($('#main-subcontainer_key #key-input_' + inputId).val() == "") {

				// El placeholder vuelve a su posición original
				$('#main-subcontainer_key #placeholder_key_' + inputId).removeClass("placeholder_up_dark");
				// El icono toma su opacidad original
		  		$('#main-subcontainer_key #icon_key_' + inputId).removeClass("field-icon_up");
			}
		});
	}

	// Validación del formulario
	$(function() {

		$('#main-subcontainer_key form').validate({

			// Reglas
			rules: {
				key: {							
					required: true,
					noSpace: true,
					minlength: 4,
					maxlength: 60,
					email: false,
				},
				key_confirm: {							
					required: true,
					noSpace: true,
					minlength: 4,
					maxlength: 60,
					email: false,
					equalTo: "#key-input_1",
				},				
			},

			// Mensajes de error
			messages: {
				key: {
					required: "Campo requerido",
					minlength: "Por favor, introduzca cuatro caracteres por lo menos",
					maxlength: "El campo no puede superar los 60 caracteres",
				},
				key_confirm: {
					required: "Campo requerido",
					minlength: "Por favor, introduzca cuatro caracteres por lo menos",
					maxlength: "El campo no puede superar los 60 caracteres",
					equalTo: "Las contraseñas no coinciden",
				},
			},
		});

		// Método para controlar que ho haya espacios en blanco
		jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.match(whiteSpaceReg); 
		}, "Los espacios en blanco no están permitidos");
	});

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	// Rescatamos la variable de la clave de producto para key.html
	var key = getUrlVars()["k"];
	// Rescatamos la variable del email del usuario para key.html
	var email = getUrlVars()["e"];

	// Si la clave de producto es distinta de null
	if(key != null) {		

		var xmlhttp10 = new XMLHttpRequest();
	    xmlhttp10.open("GET", "check_key.php?k=" + key + "&e=" + email, true);
	    xmlhttp10.send();

	    // Cuando se reciba respuesta del php se muestra el tick
	    xmlhttp10.onreadystatechange = function() {

	    	if(this.readyState == 4 && this.status == 200) {

	    		if(xmlhttp10.responseText == 1) { 
	    			$(".payment-card-subcontainer b").html(key);

	    			// Al pulsar el botón de cambiar contraseña
					$('#main-subcontainer_key .submit').click(function() {

						if($('#main-subcontainer_key form').valid()) {

							// AJAX. Enviamos la clave para poder cambiar la contraseña reestablecida en key.html
							var xmlhttp2 = new XMLHttpRequest();
						    xmlhttp2.open("GET", "password.php?k=" + key + "&u=" + $("#key-input_1").val() + "&e=" + email, true);
						    xmlhttp2.send();

						    $('.change_password').animate({opacity: 0}, {queue: false, duration: 270});
						    $('.change_password').css('pointer-events', 'none');

							setTimeout(function() {
								$('#main-subcontainer_key .loading-container').animate({opacity: 1}, {queue: false, duration: 270});
								$('#main-subcontainer_key .loading-container').css('pointer-events', 'none');
							}, 150);

						    // Cuando se recibe la respuesta positiva del php se muestra el mensaje de "contraseña reestablecida"
						    xmlhttp2.onreadystatechange = function() {
						        if(this.readyState == 4 && this.status == 200) {
						        	
						            setTimeout(function() {

										$('#main-subcontainer_key .loading-container').animate({opacity: 0}, {queue: false, duration: 270});
							            
										setTimeout(function() {
											$('.change_password').animate({opacity: 0}, {queue: false, duration: 100});
								            $('#lower-text_key').css('display', 'none');
								            $('#main-subcontainer_key .confirmation-message').animate({opacity: 1}, {queue: false, duration: 270});
										}, 150);			            
									}, 1000)        
						        } else {
						        	//alert("No hay conexión");
						        }
						    };
						}
					});
	    		} else {
	    			alert("La URL no es correcta");
	    		}
	    	}
	    };
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Regex para direcciones de correo electrónico
var emailReg = (/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);	

// Regex para espacios en blanco
var whiteSpaceReg = (/^\S*$/);

// Función para obtener las variables que haya en una URL
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// Deshabilitar el botón del formulario
function disableFormButton() {
	$('.payment-card-subcontainer .submit').attr("disabled", true);
}

// Comprobar si un email es válido
function isValidEmailAddress(emailAddress) {
    return emailAddress.match(emailReg);
}
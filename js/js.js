/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* ARCHIVO JAVASCRIPT GENERAL */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// Cuando el documento esté listo
$(document).ready(function(){

	// Menú sticky
	var altura = $('header').offset().top;	
	$(window).on('scroll', function() {
		if ($(window).scrollTop() > altura + 1){
			$('header').addClass('header-fixed');			
		} else {
			$('header').removeClass('header-fixed');
		}
	});

	// Desplegar el menú en la versión móvil
	$('#nav-icon').click(function () {
		$(this).toggleClass('open');
		$('header').toggleClass('open');
	});

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	// Carga de las imágenes a mayor resolución

	// Imagen de fondo de la sección Descarga
	function preload1(arrayOfImages) {

	    $(arrayOfImages).each(function(){
	    	var tmpImg = new Image();
    		tmpImg.src = this;
	        tmpImg.onload = function() {
	        	$('.download-background').css("background-image", "url('assets/images/background_lighter.jpg')");
	        };
	    });
	}
	preload1(['assets/images/background_lighter.jpg']);

	// Imagen de la aplicación en el portátil de la sección Descarga
	// (Si se deja esta función, la imagen de la app tarda un poco en aparecer, ya que espera a que esté cargada la de máxima resolución)
	function preload1_2(arrayOfImages) {
	    $(arrayOfImages).each(function(){
	    	var tmpImg = new Image();
    		tmpImg.src = this;	        
	        tmpImg.onload = function() {
	        	$('#app').css("background-image", "url('assets/images/app_2.jpg')");
	        };
	    });
	}
	preload1_2(['assets/images/app_2.jpg']);

	// Imagen de fondo de la sección Pro
	function preload2(arrayOfImages) {
	    $(arrayOfImages).each(function(){
	    	var tmpImg = new Image();
    		tmpImg.src = this;	        
	        tmpImg.onload = function() {
	        	$('#pro-background').css("background-image", "url('assets/images/laptop_image_lighter.jpg')");
	        };
	    });
	}
	preload2(['assets/images/laptop_image_lighter.jpg']);

	// Cambio de imagen en el portátil al pasar sobre las tarjetas de las funcionalidades Pro
	/*$("#pro-card_1").hover(function(){

		$("#pro-background").css("background-image", "url('assets/images/test_1.jpg')");

		}, function(){

		$("#pro-background").css("background-image", "url('assets/images/laptop_image_lighter.jpg')");	
	});

	$("#pro-card_2").hover(function(){

		$("#pro-background").css("background-image", "url('assets/images/test_1.jpg')");

		}, function(){

		$("#pro-background").css("background-image", "url('assets/images/laptop_image_lighter.jpg')");
	});

	$("#pro-card_3").hover(function(){

		$("#pro-background").css("background-image", "url('assets/images/test_1.jpg')");

		}, function(){

		$("#pro-background").css("background-image", "url('assets/images/laptop_image_lighter.jpg')");
	});

	$("#pro-card_4").hover(function(){

		$("#pro-background").css("background-image", "url('assets/images/test_1.jpg')");

		}, function(){

		$("#pro-background").css("background-image", "url('assets/images/laptop_image_lighter.jpg')");
	});*/

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -	

	// PRO.HTML

	// Al clicar sobre el botón de "Pásate a Pro"
	$(".pro-button-2").click(function() {

		localStorage.setItem('button', 'payment');
    	window.location.href = "form.html";
	});

	// Al clicar sobre el botón de "Soy usuario Pro"
	$(".pro-button-1").click(function() {

		localStorage.setItem('button', 'recovery');
    	window.location.href = "form.html";
	});

	// Al clicar sobre la "x" de los formularios Pro
	$(".close-icon").click(function() {

		window.location.href = "pro.html";
	});

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	// Scroll arrastrable de la versión Pro móvil

	// Guardamos el contenedor de las tarjetas con las funcionalidades Pro
	const slider = document.querySelector('#pro-cards-container');

	if(slider != null) {
		let isDown = false;
		let startX;
		let scrollLeft;

		slider.addEventListener('mousedown', (e) => {
		 	isDown = true;
		  	slider.classList.add('active');
			startX = e.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		});
		slider.addEventListener('mouseleave', () => {
			isDown = false;
			slider.classList.remove('active');
		});
		slider.addEventListener('mouseup', () => {
			isDown = false;
			slider.classList.remove('active');
		});
		slider.addEventListener('mousemove', (e) => {
			if(!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = (x - startX) * 2; // Velocidad del scroll
			slider.scrollLeft = scrollLeft - walk;
			console.log(walk);
		});
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	// Cada vez que se redimensione el navegador, se paran las transiciones
	$(window).on('resize', function(){
		$("*").css( "transition-property", "none");
	});

	// Una vez se termine de redimensionar, se restablecen las animaciones
	var rtime;
	var timeout = false;
	var delta = 200;
	$(window).resize(function() {
		rtime = new Date();
		if (timeout === false) {
			timeout = true;
			setTimeout(resizeend, delta);
		}
	});

	function resizeend() {
		if (new Date() - rtime < delta) {
			setTimeout(resizeend, delta);
		} else {
			timeout = false;
			$("*").css( "transition-property", "initial");
		}
	}
});
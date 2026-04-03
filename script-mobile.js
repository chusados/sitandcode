$(document).ready(function(){


	$(window).resize(function(){
		$('#home, #background').css({height: $(window).height()});
	});


	
	/*******************************/
	/* Change menu button at click */
	/*******************************/

		$('#menu-button').click(function(){
			$('#menu-button').toggleClass('active');
			$('#menu').toggleClass('active');
			$('#menu-circle').toggleClass('active');
		});


	/****************/
	/* Menu buttons */
	/****************/

	$('#menu-sections p').click(function(event){
		var buttonPressedId = event.target.id;
		var moveTo = buttonPressedId.substr(0, buttonPressedId.indexOf("-button"));
		moveToEffect('#'+moveTo);
		
		$('#menu-button').toggleClass('active');
		$('#menu').toggleClass('active');
		$('#menu-circle').toggleClass('active');
	});

	function moveToEffect(where) {
		$('.none').css({background: '#fff'}).fadeIn(300).delay(100).queue(function(next){
			$('html, body').animate({scrollTop: $(where).offset().top-50}, 0);
			$('.none').fadeOut(300).queue(function(next2){
				$('.none').css({background: 'transparent'});
				next2();
			});
			next();
		});
	}


	/**********************/
	/* Scroll down button */
	/**********************/

	$('#scroll, #scroll-text').click(function(){
		$('html, body').animate({'scrollTop': $('#home').height()}, 2000);
	});

	/***********************/
	/* Who we are dropdown */
	/***********************/

	$('.whoweare-group-persons').click(function(e){
		$('.whoweare-group-texts.active').toggleClass('active');
		$(this).next().toggleClass('active');
		$('html, body').animate({scrollTop:$(this).offset().top}, 300);
	});

	/*******************/
	/* What we do menu */
	/*******************/

	$('#whatwedo-phone-screen div:eq(0)').click(function(e){
		$('.whatwedo-texts.active').toggleClass('active');
		$('.whatwedo-texts:eq('+e.target.id.substring(14,15)+')').toggleClass('active');
	});

	$('.whatwedo-back-button').click(function(){
		$('.whatwedo-texts.active').toggleClass('active');
		$('#whatwedo-phone-screen div:eq(0)').toggleClass('active');
	});
});
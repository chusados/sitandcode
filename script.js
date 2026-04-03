/** 
 * Micro-jQuery Shim (Vanilla JS Core) 
 * Replaces 80KB jQuery with native ES6 APIs allowing complex animation coordinates to work properly
 */
const $ = function(selector) {
    if (selector === window || selector === document) return selector;
    if (typeof selector === 'function') {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', selector);
        else selector();
        return;
    }
    
    let els = [];
    if (typeof selector === 'string') els = Array.from(document.querySelectorAll(selector));
    else if (selector && selector.nodeType) els = [selector];
    else if (Array.isArray(selector)) els = selector;
    
    // Polyfill methods
    const api = {
        0: els[0],
        length: els.length,
        css: function(styles) {
            els.forEach(el => {
                for (let prop in styles) {
                    el.style[prop] = styles[prop];
                }
            });
            return this;
        },
        height: function() { return els[0] ? els[0].offsetHeight : 0; },
        width: function() { return els[0] ? els[0].offsetWidth : 0; },
        offset: function() { 
            if (!els[0]) return {top:0, left:0};
            const rect = els[0].getBoundingClientRect();
            return { top: rect.top + window.scrollY, left: rect.left + window.scrollX };
        },
        click: function(fn) { els.forEach(el => el.addEventListener('click', fn)); return this; },
        toggleClass: function(c) { els.forEach(el => el.classList.toggle(c)); return this; },
        hasClass: function(c) { return els[0] ? els[0].classList.contains(c) : false; },
        show: function() { els.forEach(el => el.style.display = 'block'); return this; },
        hide: function() { els.forEach(el => el.style.display = 'none'); return this; },
        fadeIn: function(ms) { 
            els.forEach(el => { 
                el.style.opacity = 0; el.style.display = 'block'; 
                el.style.transition = `opacity ${typeof ms === 'number' ? ms : 300}ms`; 
                setTimeout(() => el.style.opacity = 1, 10); 
            }); 
            return this; 
        },
        fadeOut: function(ms) {
            els.forEach(el => {
                el.style.transition = `opacity ${typeof ms === 'number' ? ms : 300}ms`; 
                el.style.opacity = 0;
                setTimeout(() => el.style.display = 'none', typeof ms === 'number' ? ms : 300);
            });
            return this;
        },
        animate: function(props, ms) {
            els.forEach(el => {
                if (props.scrollTop !== undefined && (el.tagName === 'HTML' || el.tagName === 'BODY')) {
                    window.scrollTo({ top: props.scrollTop, behavior: ms === 0 ? 'auto' : 'smooth' });
                }
            });
            return this;
        },
        delay: function(ms) { return this; /* simplified */ },
        queue: function(fn) { setTimeout(() => fn(() => {}), 10); return this; },
        next: function() { return $(els[0] ? els[0].nextElementSibling : null); },
        val: function() { return els[0] ? els[0].value : ''; },
        attr: function(a) { return els[0] ? els[0].getAttribute(a) : ''; }
    };
    return api;
};

document.addEventListener('DOMContentLoaded', function() {
    // We bind $.ajax if used? No ajax is used in this file.
});


document.addEventListener('DOMContentLoaded', function() {
    var isMobileInit = window.innerWidth <= 768;

    if (isMobileInit) {
        
        
        
        	window.addEventListener('resize', function() {
        		$('#mob-home, #mob-background').css({height: window.innerHeight});
        	});
        
        
        	
        	/*******************************/
        	/* Change menu button at click */
        	/*******************************/
        
        		$('#mob-menu-button').click(function(){
        			$('#mob-menu-button').toggleClass('active');
        			$('#mob-menu').toggleClass('active');
        			$('#mob-menu-circle').toggleClass('active');
        		});
        
        
        	/****************/
        	/* Menu buttons */
        	/****************/
        
        	$('#mob-menu-sections p').click(function(event){
        		var buttonPressedId = event.target.id;
        		var moveTo = buttonPressedId.substr(0, buttonPressedId.indexOf("-button"));
        		moveToEffect('#'+moveTo);
        		
        		$('#mob-menu-button').toggleClass('active');
        		$('#mob-menu').toggleClass('active');
        		$('#mob-menu-circle').toggleClass('active');
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
        
        	$('#mob-scroll, #mob-scroll-text').click(function(){
        		$('html, body').animate({'scrollTop': $('#mob-home').height()}, 2000);
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
        
        	$('#mob-whatwedo-phone-screen div:eq(0)').click(function(e){
        		$('.whatwedo-texts.active').toggleClass('active');
        		$('.whatwedo-texts:eq('+e.target.id.substring(14,15)+')').toggleClass('active');
        	});
        
        	$('.whatwedo-back-button').click(function(){
        		$('.whatwedo-texts.active').toggleClass('active');
        		$('#mob-whatwedo-phone-screen div:eq(0)').toggleClass('active');
        	});
        
    } else {
        
        
        	/* Always start from top (either 1st entry or refreshing page) */
        	/*window.addEventListener('load', function() {
        		$('html, body').animate({'scrollTop': 0}, 1);
        	});*/
        
        	
        	var navbarPosition = $('#navbar').offset();
        	var navbarHeight = $('#navbar').height();
        	var homeHeight = $('#home').height();
        	var whatwedoHeight = $('#whatwedo').height();
        	var whatwedoTop = $('#whatwedo').offset().top;
        	var howwedoTop = $('#howwedo').offset().top;
        	var howwedoHeight = $('#howwedo').height();
        	
        	/* How we do scroll */
        	var howwedoMenuMove = $('#howwedo #screenE-browserMenu').offset().top - $('#howwedo-content #howwedo-menu').offset().top + $('#howwedo #screenE-browserMenu').height();
        	var screenSmallToBig = $('#screen-fill').offset().top - $('#screen-expanded').offset().top;
        	var screenWidth = $('#screen-expanded').width() - $('#screen-fill').width();
        	var screenHeigth = $('#screen-expanded').height() - 45;
        	var screenLeft = $('#screen-fill').offset().left - $('#screen-expanded').offset().left;
        
        	/* Unpin */
        	var unpinSince = howwedoTop + howwedoHeight + $('.empty').height()*3;
        	var unpinUntil = howwedoTop + howwedoHeight + $('.empty').height()*4;
        
        	var howwedoMenuClicked = null;
        
        	var flexoClicked = false;
        
        
        
        
        	window.addEventListener('load', function() {
        		$('#whatwedo #whatwedo-menu').css({'margin-left': (window.innerWidth - $('#whatwedo #whatwedo-menu').width())/2,
        											opacity: 1});
        	});	
        
        
        	/*******************************/
        	/* Change menu button at click */
        	/*******************************/
        
        		$('#menu-button').click(function(){
        			if ($(window).scrollTop() >= homeHeight) {
        				$('#menu-button').toggleClass('active');
        				$('#menu').toggleClass('active');
        				$('#menu-circle').toggleClass('active');
        			}
        		});
        
        
        	/****************/
        	/* Menu buttons */
        	/****************/
        
        	$('#menu-sections p').click(function(event){
        		var buttonPressedId = event.target.id;
        		var moveTo = buttonPressedId.substr(0, buttonPressedId.indexOf("-button"));
        		//$('html, body').animate({'scrollTop': $('#'+moveTo).offset().top}, 1000);
        		moveToEffect('#'+moveTo);
        		
        		$('#menu-button').toggleClass('active');
        		$('#menu').toggleClass('active');
        		$('#menu-circle').toggleClass('active');
        	});
        
        	function moveToEffect(where) {
        		$('.none').css({background: '#fff'}).fadeIn(300).delay(100).queue(function(next){
        			$('html, body').animate({'scrollTop': $(where).offset().top}, 0);
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
        
        
        	/*********************/
        	/* Who we are clicks */
        	/*********************/
        
        	function closeWhoweare(n) {
        		$('#whoweare-text-group').fadeOut(n);
        		$('.whoweare-texts').fadeOut(n);
        	}
        
        	$('.whoweare-text-button').click(function(){
        		closeWhoweare(500);
        	});
        
        	$('#isaac-img').click(function(){
        		closeWhoweare(0);
        		$('#whoweare-text-isaac').show(0);
        		$('#whoweare-text-group').fadeIn(500);
        	});
        	$('#david-img').click(function(){
        		closeWhoweare(0);
        		$('#whoweare-text-david').show(0);
        		$('#whoweare-text-group').fadeIn(500);
        	});
        	$('#dani-img').click(function(){
        		closeWhoweare(0);
        		$('#whoweare-text-dani').show(0);
        		$('#whoweare-text-group').fadeIn(500);
        	});
        
        
        
        	/*************************************************************/
        	/* Stand navbar (logo+text+menu button) fixed or 2nd section */
        	/*************************************************************/
        	
        		var activeMenuFx = true;
        
        		let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                var scroll = window.scrollY;
                isScrolling = false;
        
        
        		/* Change menu-button cursor */
        		if (scroll < $('#home').height()) {
        			$('#menu-button').css({cursor:'default'});
        			$('#menu').css({position: 'absolute'});
        			if (!activeMenuFx) {
        				if (!$('#menu').hasClass('active')) {
        					$('#menu, #menu-button, #menu-circle').toggleClass('active');
        				}
        				activeMenuFx = true;
        			}
        		} else {
        			$('#menu-button').css({cursor:'pointer'});
        			$('#menu').css({position: 'fixed'});
        			if (activeMenuFx) {
        				$('#menu.active, #menu-button.active, #menu-circle.active').toggleClass('active');
        				activeMenuFx = false;
        			}
        		}
        		
        		/* Navbar opacity */
        		if (scroll >= 0 && scroll <= (homeHeight)) {
        			$('#navbar').css({'opacity':scroll/(homeHeight)});
        		} else {
        			$('#navbar').css({'opacity':1});
        		}
        
        		/* Hold navbar top since whatwedo section */
        		if (scroll >= navbarPosition.top) {
        			$('#navbar').css({'top':0});
        			$('#navbar').css({'position':'fixed'});
        		} else {
        			$('#navbar').css({'top':'100%'});
        			$('#navbar').css({'position':'absolute'});
        		}
        
        		/* What we do fixed */
        		if (scroll >= whatwedoTop) {
        			$('#whatwedo .tittle, #whatwedo-menu').css({left:0, top:0, position:'fixed'});
        			$('#whatwedo #table, #whatwedo #folios-container, #howwedo-content #howwedo-desktop').css({left:'calc((100% - 500px) / 2)', position:'fixed'});
        			$('#whatwedo #drawer').css({left:'calc((100% - 500px) / 2 + 40px)', position:'fixed'});
        			$('#whatwedo #chair').css({left:'calc((100% - 140px) / 2)', position:'fixed'});
        			$('#whatwedo-content #trash').css({left:'calc((100% + 160px + 160px - 50px) / 2 + 20px)', position:'fixed'});
        			$('#office-ground').css({top: 0, position: 'fixed'});
        		} else {
        			$('#whatwedo .tittle, #whatwedo-menu').css({position:'absolute'});
        			$('#whatwedo #table, #whatwedo #folios-container, #howwedo-content #howwedo-desktop').css({left:'calc((100% - 500px - 160px) / 2)', position:'absolute'});
        			$('#whatwedo #drawer').css({left:'calc((100% - 500px - 160px) / 2 + 54px)', position:'absolute'});
        			$('#whatwedo #chair').css({left:'calc((100% - 140px - 160px) / 2)', position:'absolute'});
        			$('#whatwedo-content #trash').css({left:'calc((100% + 160px - 50px) / 2 + 20px)', position:'absolute'});
        			$('#office-ground').css({top: window.innerHeight, position: 'absolute'});
        		}
        
        		/* Office scroll animation */
        		/* What we do */
        		if (scroll >= whatwedoTop - homeHeight*3/4 && scroll <= whatwedoTop) {
        			$('#whatwedo-content #chair').css({bottom: 110 - (scroll - (whatwedoTop - homeHeight*3/4))*90 / (whatwedoTop - (whatwedoTop - homeHeight*3/4))});
        		} else if (scroll < whatwedoTop - homeHeight*3/4) {
        			$('#whatwedo-content #chair').css({bottom: 110});
        		} else {
        			$('#whatwedo-content #chair').css({bottom: 20});
        		}
        		if (scroll >= whatwedoTop && scroll < whatwedoTop + whatwedoHeight / 3) {
        			if (flexoClicked) {
        				$('.flexo2:eq(0)').show()
        			} else {
        				$('.flexo2:eq(0)').hide();
        			}			$('#whatwedo .tittle, #whatwedo-menu').css({left:0});
        			$('#whatwedo-content #folio-1').css({left: 82,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folio-2').css({left: 172 - (scroll - whatwedoTop)*90 / (whatwedoTop + whatwedoHeight / 3 - whatwedoTop),
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folio-3').css({left: 262,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folio-4').css({left: 352,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folios-container').css({'z-index':11});
        			$('#whatwedo-content #drawer').css({bottom: 200});
        			$('#howwedo-content #howwedo-desktop').css({'z-index': -1});
        		} else if (scroll >= whatwedoTop + whatwedoHeight / 3 && scroll < whatwedoTop + whatwedoHeight * 2 / 3) {
        			if (flexoClicked) {
        				$('.flexo2:eq(0)').show()
        			} else {
        				$('.flexo2:eq(0)').hide();
        			}
        			$('#whatwedo .tittle, #whatwedo-menu').css({left:0});
        			$('#whatwedo-content #folio-1').css({left: 82,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folio-2').css({left: 82,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folio-3').css({left: 262 - (scroll - (whatwedoTop + whatwedoHeight / 3))*180 / ((whatwedoTop + whatwedoHeight * 2 / 3) - (whatwedoTop + whatwedoHeight / 3)),
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folio-4').css({left: 352,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folios-container').css({'z-index':11});
        			$('#whatwedo-content #drawer').css({bottom: 200});
        			$('#howwedo-content #howwedo-desktop').css({'z-index': -1});
        		} else if (scroll >= whatwedoTop + whatwedoHeight * 2 / 3 && scroll < whatwedoTop + whatwedoHeight) {
        			if (flexoClicked) {
        				$('.flexo2:eq(0)').show()
        			} else {
        				$('.flexo2:eq(0)').hide();
        			}			$('#whatwedo .tittle, #whatwedo-menu').css({left:0});
        			$('#whatwedo-content #folio-1').css({left: 82,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folio-2').css({left: 82,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folio-3').css({left: 82,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folio-4').css({left: 352 - (scroll - (whatwedoTop + whatwedoHeight * 2 / 3))*270 / (whatwedoTop + whatwedoHeight - (whatwedoTop + whatwedoHeight * 2 / 3)),
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folios-container').css({'z-index':11});
        			$('#whatwedo-content #drawer').css({bottom: 200 - (scroll - (whatwedoTop + whatwedoHeight * 2 / 3))*110 / (whatwedoTop + whatwedoHeight - (whatwedoTop + whatwedoHeight * 2 / 3))});
        			$('#howwedo-content #howwedo-desktop').css({'z-index': -1});
        		} else if (scroll >= whatwedoTop + whatwedoHeight && scroll < whatwedoTop + whatwedoHeight * 4 / 3) {
        			if (flexoClicked) $('.flexo2:eq(0)').hide();
        			$('#whatwedo .tittle, #whatwedo-menu').css({left:0});
        			$('#whatwedo-content .folios').css({left: 82,
        												'-ms-transform': 'scale(' + eval(1 + (scroll - (whatwedoTop + whatwedoHeight))*0.2 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))) + ',' +
        													eval(1 + (scroll - (whatwedoTop + whatwedoHeight))*0.2 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))) + ')',
        												'-webkit-transform': 'scale(' + eval(1 + (scroll - (whatwedoTop + whatwedoHeight))*0.2 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))) + ',' +
        													eval(1 + (scroll - (whatwedoTop + whatwedoHeight))*0.2 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))) + ')',
        												'transform': 'scale(' + eval(1 + (scroll - (whatwedoTop + whatwedoHeight))*0.2 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))) + ',' +
        													eval(1 + (scroll - (whatwedoTop + whatwedoHeight))*0.2 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))) + ')',
        													bottom: 35 - (scroll - (whatwedoTop + whatwedoHeight))*67 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))});
        			$('#whatwedo-content #folios-container').css({'z-index':11});
        			$('#whatwedo-content #drawer').css({bottom: 90});
        			$('#howwedo-content #howwedo-desktop').css({'z-index': 11});
        		} else if (scroll >= whatwedoTop + whatwedoHeight * 4 / 3 && scroll < whatwedoTop + whatwedoHeight * 5 / 3) {
        			$('.flexo2:eq(0)').hide();
        			$('#whatwedo .tittle, #whatwedo-menu').css({left:0});
        			$('#whatwedo-content .folios').css({left: 82,
        												'-ms-transform': 'scale(' + eval(1.5 - (scroll - (whatwedoTop + whatwedoHeight))*0.3 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))) + ',' +
        													eval(1.5 - (scroll - (whatwedoTop + whatwedoHeight))*0.3 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))) + ')',
        												'-webkit-transform': 'scale(' + eval(1.5 - (scroll - (whatwedoTop + whatwedoHeight))*0.3 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))) + ',' +
        													eval(1.5 - (scroll - (whatwedoTop + whatwedoHeight))*0.3 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))) + ')',
        												'transform': 'scale(' + eval(1.5 - (scroll - (whatwedoTop + whatwedoHeight))*0.3 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))) + ',' +
        													eval(1.5 - (scroll - (whatwedoTop + whatwedoHeight))*0.3 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))) + ')',
        													bottom: 35 - (scroll - (whatwedoTop + whatwedoHeight))*67 / (whatwedoTop + whatwedoHeight * 4 / 3 - (whatwedoTop + whatwedoHeight))});
        			$('#whatwedo-content #folios-container').css({'z-index':11});
        			$('#whatwedo-content #drawer').css({bottom: 90});
        			$('#howwedo-content #howwedo-desktop').css({'z-index': 11});
        		} else if (scroll >= whatwedoTop + whatwedoHeight * 5 / 3 && scroll < whatwedoTop + whatwedoHeight * 2) {
        			$('.flexo2:eq(0)').hide();
        			$('#whatwedo .tittle, #whatwedo-menu').css({left:-((scroll - (whatwedoTop + whatwedoHeight * 5 / 3))*$(document).width()/(whatwedoTop + whatwedoHeight * 2 - (whatwedoTop + whatwedoHeight * 5 / 3)))});
        			$('#whatwedo-content .folios').css({left: 82,
        												'-ms-transform': 'scale(.9,.9)',
        												'-webkit-transform': 'scale(.9,.9)',
        												'transform': 'scale(.9,.9)',
        												bottom: -100 + (scroll - (whatwedoTop + whatwedoHeight * 5 / 3))*110 / (whatwedoTop + whatwedoHeight * 2 - (whatwedoTop + whatwedoHeight * 5 / 3))});
        			$('#whatwedo-content #folios-container').css({'z-index':9});
        			$('#whatwedo-content #drawer').css({bottom: 90 + (scroll - (whatwedoTop + whatwedoHeight * 5 / 3))*110 / (whatwedoTop + whatwedoHeight * 2 - (whatwedoTop + whatwedoHeight * 5 / 3))});
        			$('#howwedo-content #howwedo-desktop').css({'z-index': 11});
        		} else if (scroll < whatwedoTop) {
        			if (flexoClicked) {
        				$('.flexo2:eq(0)').show()
        			} else {
        				$('.flexo2:eq(0)').hide();
        			}			$('#whatwedo .tittle, #whatwedo-menu').css({left:0});
        			$('#whatwedo-content #folio-1').css({left: 82,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folio-2').css({left: 172,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folio-3').css({left: 262,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folio-4').css({left: 352,
        												'-ms-transform': 'scale(1,1)',
        												'-webkit-transform': 'scale(1,1)',
        												'transform': 'scale(1,1)',
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folios-container').css({'z-index':11});
        			$('#whatwedo-content #drawer').css({bottom: 200});
        			$('#howwedo-content #howwedo-desktop').css({'z-index': -1});
        		} else {
        			$('.flexo2:eq(0)').hide();
        			$('#whatwedo .tittle, #whatwedo-menu').css({left:-$(document).width()});
        			$('#whatwedo-content .folios').css({left: 82,
        												bottom: 'calc((200px - 90px) / 2 - 20px)'});
        			$('#whatwedo-content #folios-container').css({'z-index':9});
        			$('#whatwedo-content #drawer').css({bottom: 200});
        			$('#howwedo-content #howwedo-desktop').css({'z-index': 11});
        		}
        
        
        
        		/* How we do fixed */
        		if (scroll >= howwedoTop + howwedoHeight / 3) {
        			$('#howwedo .tittle').css({left:0, position:'fixed'});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2s').css({left:0});
        		} else {
        			$('#howwedo .tittle').css({left:$(document).width(), position:'fixed'});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({left:$(document).width()});
        		}
        
        		/* Office scroll animation */
        		/* How we do */
        		if (scroll >= howwedoTop - howwedoHeight / 3 && scroll < howwedoTop) {
        			$('#howwedo .tittle').css({left:$(document).width()-(scroll - (howwedoTop - howwedoHeight / 3))*$(document).width()/(howwedoTop - (howwedoTop - howwedoHeight / 3))});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({left:$(document).width()-(scroll - (howwedoTop - howwedoHeight / 3))*$(document).width()/(howwedoTop - (howwedoTop - howwedoHeight / 3)),
        													'margin-top': 160});
        			$('#howwedo-content .howwedo-circles').css({opacity:0.2});
        			$('.howwedo-percent, #percent-fill').hide();
        			$('#howwedo #keyboard, #howwedo #trackpad').css({opacity:(scroll - (howwedoTop - howwedoHeight / 3))/(howwedoTop - (howwedoTop - howwedoHeight / 3))});
        			$('#howwedo #screen-fill').hide();
        			$('#howwedo #screen-expanded').css({opacity:0,
        												'z-index':-1});
        			$('#whatwedo-content #screen1').css({opacity:1});
        			$('#whatwedo-content #screen2').css({opacity:0});
        			howwedoMenuClicked = null;
        		} else if (scroll >= howwedoTop && scroll < howwedoTop + howwedoHeight / 2) {
        			$('#howwedo .tittle').css({left:0});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({left:0,
        													'margin-top': 160 + (scroll - howwedoTop)*howwedoMenuMove/(howwedoTop + howwedoHeight / 2 - howwedoTop)});
        			$('#howwedo-content #howwedo-circle-1').css({opacity:0.2 + (scroll - howwedoTop)*0.5/(howwedoTop + howwedoHeight/2 - howwedoTop)});
        			$('#howwedo-content #howwedo-circle-2').css({opacity:0.2});
        			$('#howwedo-content #howwedo-circle-3').css({opacity:0.2});
        			$('#howwedo-content #howwedo-circle-4').css({opacity:0.2});
        			$('#howwedo-content #howwedo-circle-5').css({opacity:0.2});
        			$('.howwedo-percent, #percent-fill').hide();
        			$('#percent-fill').css({width: (scroll - howwedoTop)*$('#screen-expanded').width()*0.02/(howwedoTop + howwedoHeight/2 - howwedoTop)});
        			$('#howwedo #keyboard, #howwedo #trackpad').css({opacity:1});
        			$('#howwedo #screen-fill').css({display:'initial',
        											top: -20.5 - (scroll - howwedoTop)*screenSmallToBig/(howwedoTop + howwedoHeight/2 - howwedoTop),
        											'border-top-width': 45 + (scroll - howwedoTop)*screenHeigth/(howwedoTop + howwedoHeight/2 - howwedoTop),
        											'border-left-width': 15 - (scroll - howwedoTop)*15/(howwedoTop + howwedoHeight/2 - howwedoTop),
        											'border-right-width': 15 - (scroll - howwedoTop)*15/(howwedoTop + howwedoHeight/2 - howwedoTop),
        											left: ($('#howwedo-desktop').width() - 220)/2 + 12 - (scroll - howwedoTop)*screenLeft/(howwedoTop + howwedoHeight/2 - howwedoTop),
        											width: 167 + (scroll - howwedoTop)*screenWidth/(howwedoTop + howwedoHeight/2 - howwedoTop),
        											opacity: 1});
        			$('#howwedo #screen-expanded').css({opacity:0,
        												'z-index':-1});
        			$('#whatwedo-content #screen1').css({opacity:1-(scroll - howwedoTop)/(howwedoTop + howwedoHeight / 2 - howwedoTop)});
        			$('#whatwedo-content #screen2').css({opacity:(scroll - howwedoTop)/(howwedoTop + howwedoHeight / 2 - howwedoTop)});
        			howwedoMenuClicked = null;
        		} else if (scroll >= howwedoTop + howwedoHeight / 2 && scroll < howwedoTop + howwedoHeight) {
        			$('#howwedo .tittle').css({left:0});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({left:0,
        													'margin-top': 160 + howwedoMenuMove});
        			$('#howwedo-content #howwedo-circle-1').css({opacity:1});
        			$('#howwedo-content #howwedo-circle-2').css({opacity:0.2 + (scroll - (howwedoTop + howwedoHeight / 2))*0.5/(howwedoTop + howwedoHeight - (howwedoTop + howwedoHeight / 2))});
        			$('#howwedo-content #howwedo-circle-3').css({opacity:0.2});
        			$('#howwedo-content #howwedo-circle-4').css({opacity:0.2});
        			$('#howwedo-content #howwedo-circle-5').css({opacity:0.2});
        			$('.howwedo-percent, #percent-fill').show();
        			$('#percent-fill').css({width: ($('#screen-expanded').width()*0.02) + (scroll - (howwedoTop + howwedoHeight / 2))*($('#screen-expanded').width()*0.13)/(howwedoTop + howwedoHeight - (howwedoTop + howwedoHeight / 2))});
        			$('#howwedo #keyboard, #howwedo #trackpad').css({opacity:1});
        			$('#howwedo #screen-fill').hide();
        			$('#howwedo #screen-expanded').css({opacity:1,
        												'z-index':20});
        			$('#howwedo .screenE-texts').hide();
        			$('#howwedo #screenE-text-1').show();
        			$('#whatwedo-content #screen1').css({opacity:0});
        			$('#whatwedo-content #screen2').css({opacity:1});
        			howwedoMenuClicked = 'howwedo-circle-1';
        		} else if (scroll >= howwedoTop + howwedoHeight && scroll < howwedoTop + howwedoHeight*3/2 ) {
        			$('#howwedo .tittle').css({left:0});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({left:0,
        													'margin-top': 160 + howwedoMenuMove});
        			$('#howwedo-content #howwedo-circle-1').css({opacity:1});
        			$('#howwedo-content #howwedo-circle-2').css({opacity:1});
        			$('#howwedo-content #howwedo-circle-3').css({opacity:0.2 + (scroll - (howwedoTop + howwedoHeight)) / (howwedoTop + howwedoHeight*3/2 - (howwedoTop + howwedoHeight))});
        			$('#howwedo-content #howwedo-circle-4').css({opacity:0.2});
        			$('#howwedo-content #howwedo-circle-5').css({opacity:0.2});
        			$('.howwedo-percent, #percent-fill').show();
        			$('#percent-fill').css({width: ($('#screen-expanded').width()*0.15) + (scroll - (howwedoTop + howwedoHeight))*($('#screen-expanded').width()*0.15) / (howwedoTop + howwedoHeight*3/2 - (howwedoTop + howwedoHeight))});
        			$('#howwedo #keyboard, #howwedo #trackpad').css({opacity:1});
        			$('#howwedo #screen-fill').hide();
        			$('#howwedo #screen-expanded').css({opacity:1,
        												'z-index':20});
        			$('#howwedo .screenE-texts').hide();
        			$('#howwedo #screenE-text-2').show();
        			$('#whatwedo-content #screen1').css({opacity:0});
        			$('#whatwedo-content #screen2').css({opacity:1});
        			howwedoMenuClicked = 'howwedo-circle-2';
        		} else if (scroll >= howwedoTop + howwedoHeight*3/2 && scroll < howwedoTop + howwedoHeight*2) {
        			$('#howwedo .tittle').css({left:0});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({left:0,
        													'margin-top': 160 + howwedoMenuMove});
        			$('#howwedo-content #howwedo-circle-1').css({opacity:1});
        			$('#howwedo-content #howwedo-circle-2').css({opacity:1});
        			$('#howwedo-content #howwedo-circle-3').css({opacity:1});
        			$('#howwedo-content #howwedo-circle-4').css({opacity:0.2 + (scroll - (howwedoTop + howwedoHeight*3/2)) / (howwedoTop + howwedoHeight*2 - (howwedoTop + howwedoHeight*3/2))});
        			$('#howwedo-content #howwedo-circle-5').css({opacity:0.2});
        			$('.howwedo-percent, #percent-fill').show();
        			$('#percent-fill').css({width: ($('#screen-expanded').width()*0.3) + (scroll - (howwedoTop + howwedoHeight*3/2))*($('#screen-expanded').width()*0.6) / (howwedoTop + howwedoHeight*2 - (howwedoTop + howwedoHeight*3/2))});
        			$('#howwedo #keyboard, #howwedo #trackpad').css({opacity:1});
        			$('#howwedo #screen-fill').hide();
        			$('#howwedo #screen-expanded').css({opacity:1,
        												'z-index':20});
        			$('#howwedo .screenE-texts').hide();
        			$('#howwedo #screenE-text-3').show();
        			$('#whatwedo-content #screen1').css({opacity:0});
        			$('#whatwedo-content #screen2').css({opacity:1});
        			howwedoMenuClicked = 'howwedo-circle-3';
        		} else if (scroll >= howwedoTop + howwedoHeight*2 && scroll < howwedoTop + howwedoHeight*5/2) {
        			$('#howwedo .tittle').css({left:0});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({left:0,
        													'margin-top': 160 + howwedoMenuMove});
        			$('#howwedo-content #howwedo-circle-1').css({opacity:1});
        			$('#howwedo-content #howwedo-circle-2').css({opacity:1});
        			$('#howwedo-content #howwedo-circle-3').css({opacity:1});
        			$('#howwedo-content #howwedo-circle-4').css({opacity:1});
        			$('.howwedo-percent, #percent-fill').show();
        			$('#percent-fill').css({width: ($('#screen-expanded').width()*0.9) + (scroll - (howwedoTop + howwedoHeight*2))*($('#screen-expanded').width()*0.1) / (howwedoTop + howwedoHeight*5/2 - (howwedoTop + howwedoHeight*2))});
        			$('#howwedo-content #howwedo-circle-5').css({opacity:0.2 + (scroll - (howwedoTop + howwedoHeight*2)) / (howwedoTop + howwedoHeight*5/2 - (howwedoTop + howwedoHeight*2))});
        			$('#howwedo #keyboard, #howwedo #trackpad').css({opacity:1});
        			$('#howwedo #screen-fill').hide();
        			$('#howwedo #screen-expanded').css({opacity:1,
        												'z-index':20});
        			$('#howwedo .screenE-texts').hide();
        			$('#howwedo #screenE-text-4').show();
        			$('#whatwedo-content #screen1').css({opacity:0});
        			$('#whatwedo-content #screen2').css({opacity:1});
        			howwedoMenuClicked = 'howwedo-circle-4';
        		} else if (scroll >= howwedoTop + howwedoHeight*5/2 && scroll < howwedoTop + howwedoHeight*3) {
        			$('#howwedo .tittle').css({left:0});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({left:0,
        													'margin-top': 160 + howwedoMenuMove});
        			$('#howwedo-content .howwedo-circles').css({opacity:1});
        			$('.howwedo-percent, #percent-fill').show();
        			$('#percent-fill').css({width: $('#screen-expanded').width()});
        			$('#howwedo #keyboard, #howwedo #trackpad').css({opacity:1});
        			$('#howwedo #screen-fill').hide();
        			$('#howwedo #screen-expanded').css({opacity:1,
        												'z-index':20});
        			$('#howwedo .screenE-texts').hide();
        			$('#howwedo #screenE-text-5').show();
        			$('#whatwedo-content #screen1').css({opacity:0});
        			$('#whatwedo-content #screen2').css({opacity:1});
        			howwedoMenuClicked = 'howwedo-circle-5';
        		} else if(scroll >= howwedoTop + howwedoHeight*3 && scroll < howwedoTop + howwedoHeight*7/2) {
        			$('#howwedo .tittle').css({left:0});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({left:0,
        													'margin-top': 160 + howwedoMenuMove - (scroll - (howwedoTop + howwedoHeight*3))*howwedoMenuMove/(howwedoTop + howwedoHeight*7/2 - (howwedoTop + howwedoHeight*3))});
        			$('#howwedo-content .howwedo-circles').css({opacity:1});
        			$('.howwedo-percent, #percent-fill').hide();
        			$('#percent-fill').css({width: $('#screen-expanded').width()});
        			$('#howwedo #keyboard, #howwedo #trackpad').css({opacity:1});
        			$('#howwedo #screen-fill').css({display:'initial',
        											top: -20.5 - screenSmallToBig + (scroll - (howwedoTop + howwedoHeight*3))*screenSmallToBig/(howwedoTop + howwedoHeight*7/2 - (howwedoTop + howwedoHeight*3)),
        											'border-top-width': 45 + screenHeigth - (scroll - (howwedoTop + howwedoHeight*3))*screenHeigth/(howwedoTop + howwedoHeight*7/2 - (howwedoTop + howwedoHeight*3)),
        											'border-left-width': (scroll - (howwedoTop + howwedoHeight*3))*15/(howwedoTop + howwedoHeight*7/2 - (howwedoTop + howwedoHeight*3)),
        											'border-right-width': (scroll - (howwedoTop + howwedoHeight*3))*15/(howwedoTop + howwedoHeight*7/2 - (howwedoTop + howwedoHeight*3)),
        											left: ($('#howwedo-desktop').width() - 220)/2 + 12 - screenLeft + (scroll - (howwedoTop + howwedoHeight*3))*screenLeft/(howwedoTop + howwedoHeight*7/2 - (howwedoTop + howwedoHeight*3)),
        											width: 167 + screenWidth - (scroll - (howwedoTop + howwedoHeight*3))*screenWidth/(howwedoTop + howwedoHeight*7/2 - (howwedoTop + howwedoHeight*3)),
        											opacity: 1});
        			$('#howwedo #screen-expanded').css({opacity:0,
        												'z-index':-1});
        			$('#whatwedo-content #screen1').css({opacity:0});
        			$('#whatwedo-content #screen2').css({opacity:1});
        			howwedoMenuClicked = null;
        		} else if (scroll >= howwedoTop + howwedoHeight*7/2 && scroll < howwedoTop + howwedoHeight*4) {
        			$('#howwedo .tittle').css({left:0});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({left:0,
        													'margin-top': 160});
        			$('#howwedo-content .howwedo-circles').css({opacity:1});
        			$('.howwedo-percent, #percent-fill').hide();
        			$('#percent-fill').css({width: $('#screen-expanded').width()});
        			$('#howwedo #keyboard, #howwedo #trackpad').css({opacity:1});
        			$('#howwedo #screen-fill').css({display:'initial',
        											top: -20.5,
        											'border-top-width': 45,
        											'border-left-width': 15,
        											'border-right-width': 15,
        											left: ($('#howwedo-desktop').width() - 220)/2 + 12,
        											width: 165,
        											opacity: 1 - (scroll - (howwedoTop + howwedoHeight*7/2))/(howwedoTop + howwedoHeight*4 - (howwedoTop + howwedoHeight*7/2))});
        			$('#howwedo #screen-expanded').css({opacity:0,
        												'z-index':-1});
        			$('#whatwedo-content #screen1').css({opacity:0});
        			$('#whatwedo-content #screen2').css({opacity:1});
        			howwedoMenuClicked = null;
        		} else if (scroll < howwedoTop - howwedoHeight / 3) {
        			$('#howwedo .tittle').css({left:$(document).width()});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({left:$(document).width(),
        													'margin-top': 160});
        			$('#howwedo-content .howwedo-circles').css({opacity:0.2});
        			$('.howwedo-percent, #percent-fill').hide();
        			$('#percent-fill').css({width: 0});
        			$('#howwedo #keyboard, #howwedo #trackpad').css({opacity:0});
        			$('#howwedo #screen-fill').hide();
        			$('#howwedo #screen-expanded').css({opacity:0,
        												'z-index':-1});
        			$('#whatwedo-content #screen1').css({opacity:1});
        			$('#whatwedo-content #screen2').css({opacity:0});
        			howwedoMenuClicked = null;
        		} else {
        			$('#howwedo .tittle').css({left:0});
        			$('#howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({left:0,
        													'margin-top': 160});
        			$('#howwedo-content .howwedo-circles').css({opacity:1});
        			$('.howwedo-percent, #percent-fill').hide();
        			$('#percent-fill').css({width: $('#screen-expanded').width()});
        			$('#howwedo #keyboard, #howwedo #trackpad').css({opacity:1});
        			$('#howwedo #screen-fill').hide();
        			$('#howwedo #screen-expanded').css({opacity:0,
        												'z-index':-1});
        			$('#whatwedo-content #screen1').css({opacity:0});
        			$('#whatwedo-content #screen2').css({opacity:1});
        			howwedoMenuClicked = null;
        		}
        
        
        		/* Unpin office (what we do + how we do) */
        
        		if (scroll >= unpinSince) {
        			$('#whatwedo #table, #whatwedo #folios-container, #whatwedo #drawer, #howwedo-content #howwedo-desktop').css({bottom: 200 + (scroll - unpinSince)*$('.empty').height()/(unpinUntil - unpinSince)});
        			$('#whatwedo #chair').css({bottom: 20 + (scroll - unpinSince)*$('.empty').height()/(unpinUntil - unpinSince)});
        			$('#whatwedo-content #trash').css({bottom: 150 + (scroll - unpinSince)*$('.empty').height()/(unpinUntil - unpinSince)});
        			$('#howwedo .tittle, #howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({top: - (scroll - unpinSince)*$('.empty').height()/(unpinUntil - unpinSince)});
        			$('#office-ground').css({top: - (scroll - unpinSince)*$('.empty').height()/(unpinUntil - unpinSince)});
        		} else {
        			$('#whatwedo #table, #whatwedo #folios-container, #howwedo-content #howwedo-desktop').css({bottom: 200});
        			$('#howwedo .tittle, #howwedo-content #howwedo-menu, #howwedo-content #howwedo-menu2').css({top: 0});
        			$('#whatwedo-content #trash').css({bottom: 150});
        			$('#office-ground').css({top: 0});
        		}
        
        
        	});
        
        
        	/*************************/
        	/* What we do click menu */
        	/*************************/
        
        	$('#whatwedo #folio-text-1 h2').css({left: $('#whatwedo #folio-1').width()/2 - $('#whatwedo #folio-text-1 h2').width()/4 + 5});
        	$('#whatwedo #folio-text-2 h2').css({left: $('#whatwedo #folio-2').width()/2 - $('#whatwedo #folio-text-2 h2').width()/4 + 5});
        	$('#whatwedo #folio-text-3 h2').css({left: $('#whatwedo #folio-3').width()/2 - $('#whatwedo #folio-text-3 h2').width()/4 + 5});
        	$('#whatwedo #folio-text-4 h2').css({left: $('#whatwedo #folio-4').width()/2 - $('#whatwedo #folio-text-4 h2').width()/4 + 5});
        
        
        	var verticalScale = (window.innerHeight - $('.folios').height())/$('.folios').height() - 1.2;
        	var folioAmpliated = false;
        
        	function restartWildcards() {
        		$('#whatwedo .wildcard-folio').css({'transform':'scale(1,1)'});
        		$('#whatwedo #wildcard-folio-1').css({top:$('#whatwedo-content #folio-1').offset().top - $('#whatwedo').offset().top,
        													left:$('#whatwedo-content #folio-1').offset().left});
        		$('#whatwedo #wildcard-folio-2').css({top:$('#whatwedo-content #folio-2').offset().top - $('#whatwedo').offset().top,
        													left:$('#whatwedo-content #folio-2').offset().left});
        		$('#whatwedo #wildcard-folio-3').css({top:$('#whatwedo-content #folio-3').offset().top - $('#whatwedo').offset().top,
        													left:$('#whatwedo-content #folio-3').offset().left});
        		$('#whatwedo #wildcard-folio-4').css({top:$('#whatwedo-content #folio-4').offset().top - $('#whatwedo').offset().top,
        													left:$('#whatwedo-content #folio-4').offset().left});
        		$('#whatwedo .wildcard-folio.active').css({'transform':'scale(1,1)',
        													top:window.innerHeight/2-50,
        													left:(window.innerWidth - $('#whatwedo-content #folio-1').width()) / 2});
        	}
        
        	var whatwedoMenuClicked = null;
        	var keyCodes = {tab: 9, space: 32, left: 37, up: 38, right: 39, down: 40};
        
        	function openFolio(numberClicked) {
        		if (whatwedoMenuClicked != null) {
        			$('#whatwedo .wildcard-folio.active').toggleClass('active');
        			restartWildcards();
        		}
        	
        		$('html, body').animate({'scrollTop': $('#whatwedo').offset().top}, 200);
        
        		$('#whatwedo #wildcard-folio-'+numberClicked).delay(300).queue(function(next){
        			restartWildcards();
        			$(this).toggleClass('active');
        			$('#whatwedo .wildcard-folio.active').css({
        						'transform':'scale('+verticalScale+','+verticalScale+')',
        						top:window.innerHeight/2-50,
        						left:(window.innerWidth - $('#whatwedo-content #folio-1').width()) / 2 - 5});
        			$('#whatwedo .wildcard-text h2').css({left: ($('#whatwedo .wildcard-folio').width() -  $('#whatwedo #wildcard-text-'+numberClicked+' h2').width()) / 2 - 5});
        			$('.none').css({display: 'block'});
        			$(window).bind({
        					"mousewheel MozMousePixelScroll":function(e){
        						e.preventDefault();
        					},
        					keydown:function(e){
        						$.each(keyCodes, function(i, key) {
        							if (e.which == key) {
        								e.preventDefault();
        								e.stopPropagation();
        							}
        						});
        					}
        			});
        
        			folioAmpliated = true;
        			next();
        		});
        		whatwedoMenuClicked = 'whatwedo-menu-'+numberClicked;
        	}
        
        	$('#whatwedo-menu p').click(function(e){
        		var numberClicked = e.target.id.substring(14,15);
        		openFolio(numberClicked);
        	});
        
        	$('#whatwedo-content .folios').click(function(e){
        		var numberClicked = e.target.id.substring(6,7);
        		openFolio(numberClicked);
        	});
        	$('#whatwedo-content .folios').children().click(function(e){
        		var numberClicked = $(e.target).parent().attr('id').substring(6,7);
        		openFolio(numberClicked);
        	});
        	$('#whatwedo-content .folios-text').children().click(function(e){
        		var numberClicked = $(e.target).parent().attr('id').substring(11,12);
        		openFolio(numberClicked);
        	});
        
        	$(document).click(function(e){
        		if (folioAmpliated == true && whatwedoMenuClicked != null) {
        			$('#whatwedo .wildcard-folio.active').toggleClass('active');
        			restartWildcards();
        			$('.none').css({display: 'none'});
        			$(window).unbind("mousewheel MozMousePixelScroll keydown");
        			folioAmpliated = false;
        		}
        	});
        
        
        	/*************************/
        	/* How we do click menu */
        	/*************************/
        
        	var howwedoOptions = {1: howwedoTop + howwedoHeight / 2, 2: howwedoTop + howwedoHeight, 3: howwedoTop + howwedoHeight*3/2, 4: howwedoTop + howwedoHeight*2, 5: howwedoTop + howwedoHeight*5/2};
        	$('.howwedo-circles').click(function(e){
        		$.each(howwedoOptions, function(i, key) {
        			if (e.target.id.substring(15,16) == i && howwedoMenuClicked != e.target.id) {
        				$('html, body').animate({'scrollTop': key}, 500);
        
        				howwedoMenuClicked = 'howwedo-circle-'+i;
        			}
        		});		
        	});
        
        	/* Arrows (L-R) + Reload buttons */
        
        	$('#howwedo #screenE-browserMenu img').click(function(e){
        		switch (e.target.id) {
        			case 'arrow-l-button':
        				$('html, body').animate({'scrollTop': howwedoOptions[parseInt(howwedoMenuClicked.substring(15,16))-1]}, 500);
        				break;
        			case 'arrow-r-button':
        				$('html, body').animate({'scrollTop': howwedoOptions[parseInt(howwedoMenuClicked.substring(15,16))+1]}, 500);
        				break;
        			case 'reload-button':
        				$('#howwedo .screenE-texts').hide();
        				$('#howwedo #screenE-text-'+howwedoMenuClicked.substring(15,16)).fadeIn(200);
        				break;
        			default:
        				null;
        		}
        	});
        
        	/* Red + Yellow buttons */
        
        	$('#screenE-browserNav span:eq(0)').click(function(){
        		moveToEffect('#last-empty');
        	});
        
        	$('#screenE-browserNav span:eq(1)').click(function(){
        		moveToEffect('#howwedo');
        	});
        
        
        	/*************************/
        	/* Screen Expanded Clock */
        	/*************************/
        
        	reloadTime();
        
        	function addZero(i) {
        		if (i < 10) {
        			i = "0" + i;
        		}
        		return i;
        	}
        
        	function reloadTime() {
        		var dt = new Date();
        		var weekday = {0: 'Dom', 1: 'Lun', 2: 'Mar', 3: 'Mié', 4: 'Jue', 5: 'Vie', 6: 'Sáb'};
        		var today = weekday[dt.getDay()] + ' ' + addZero(dt.getHours()) + ":" + addZero(dt.getMinutes()) + ':' + addZero(dt.getSeconds());
        		$('#howwedo #screenE-menu p').html(today);
        
        		setTimeout(reloadTime, 1000);
        	}
        
        
        	/***************/
        	/* Easter Eggs */
        	/***************/
        
        
        	/* Smoke coffee */
        	var coffeeActivated = false;
        	$('.coffee').click(function(){
        		if (coffeeActivated == false) {
        			coffeeActivated = true;
        			$('.coffee span').fadeIn(300).toggleClass('active');
        			$('.coffee span').delay(6000).queue(function(next){
        				$(this).fadeOut(200);
        				$(this).toggleClass('active');
        				coffeeActivated = false;
        				next();
        			});
        		}
        	});
        
        	/* Call phone */
        	var callActivated = false;
        	$('.phone').click(function(){
        		if (callActivated == false) {
        			callActivated = true;
        			$('.phone div').toggleClass('active');
        			$('.phone div').delay(3000).queue(function(next){
        				$(this).toggleClass('active');
        				callActivated = false;
        				next();
        			});
        		}
        	});
        
        	/* Power On Screen */
        	var screenActivated = false;
        	$('#screenEvent').click(function(e){
        		e.preventDefault();
        		if (screenActivated == false) {
        			screenActivated = true;
        			$('.screen2, .screen').toggleClass('active');
        			$('.screen2, .screen').delay(3000).queue(function(next) {
        				$(this).toggleClass('active');
        				screenActivated = false;
        				next();
        			});
        				
        		}
        	});
        
        	/* Power On/Off Flexo */
        	$('#flexoEvent').click(function(e){
        		e.preventDefault();
        		if (!flexoClicked) {
        			$('.flexo').fadeOut(500);
        			$('.flexo2').fadeIn(200);
        			flexoClicked = true;
        		} else {
        			$('.flexo2').fadeOut(200);
        			$('.flexo').fadeIn(100);
        			flexoClicked = false;
        		}
        	});
        
        	/* How we do percent bar */
        	var percentClicked = false;
        	$('#howwedo-menu2').click(function(){
        		if (percentClicked == false) {
        			percentClicked = true;
        			$('#percent-explanation').css({left: (window.innerWidth - $('#percent-explanation').width())/2});
        			$('#percent-explanation').fadeIn(300).delay(4000).queue(function(next){
        				$(this).fadeOut(300);
        				percentClicked = false;
        				next();
        			});
        		}
        	});
        
        	/* Cholas footer */
        	var cholasClicked = false;
        	$('#cholas').click(function(){
        		if (cholasClicked) {
        			$('#cholas-explanation').fadeOut(200);
        			cholasClicked = false;
        		} else {
        			$('#cholas-explanation').fadeIn(200);
        			cholasClicked = true;
        		}
        	});
        	
        
        
        
    }
});

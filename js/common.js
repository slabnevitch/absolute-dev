jQuery(function() {
	jQuery(document).ready(function() {
		svg4everybody();

		$('[data-src]').Lazy();

		$( "select" ).selectmenu({
			width: $(this).closest('.abs-select-wrap').width(),
			 create: function( event, ui ) {
			 	console.log(event);
			 	console.log(ui);
			 	console.log(this);
			 }
		});

		// stickyHeader headhesive
			var headhesiveOptions = {
					offset: 100,
					offsetSide: 'top',
					classes: {
						clone:   'banner--clone header--fixed',
						stick:   'banner--stick',
						unstick: 'banner--unstick'
					}
					// onInit: function () {
					// 	$(this.clonedElem).find('[data-src]').Lazy();
					// },
			};

			var headhesive  = new Headhesive('.header', headhesiveOptions);

		// end stickyHeader headhesive


		// submit-to-thanks
			$(".submit-to-thanks").submit(function(e) { //Change
				e.preventDefault();
				var th = $(this);
				
				$.magnificPopup.open({
						items: {
							src: $('#regard-popup')
						},
						type: 'inline',
						preloader: true,
						focus: '#name',

						// When elemened is focused, some mobile browsers in some cases zoom in
						// It looks not nice, so we disable it:
						callbacks: {
							beforeOpen: function() {
								if($(window).width() < 700) {
									this.st.focus = false;
								} else {
									this.st.focus = '#name';
								}
							}
						}
					});
				});
		
		// end submit-to-thanks

		// HEADER

			$('ul.header-menu').superfish({
				// pathLevels: 0,
				onBeforeShow: function() {
					if(!this.context.classList.contains('header-menu__item')){
						console.log('dont contains class!');
						this.context.querySelector('.sf-with-ul').classList.add('opened');
					}
				},
				onBeforeHide: function() {

					// this.context.querySelector('.sf-with-ul').classList.remove('opened');
					$('.sf-with-ul').removeClass('opened');
				}

			});

			$(".header-top .toggle-mnu").click(function() {
				// $(this).toggleClass("on");
				$(".header-hd-menu").stop(true, true).fadeIn(150);
				// $('html').toggleClass('freeze');
				return false;
			});

			$(".header-hd-menu .toggle-mnu").click(function() {
				$(".header-hd-menu").stop(true, true).fadeOut(150);
				return false;
			});
		

		// END HEADER

		// magnific-popup
			$('.to-popup').magnificPopup({
				type: 'inline',
				preloader: false,
				focus: '#name',

				// When elemened is focused, some mobile browsers in some cases zoom in
				// It looks not nice, so we disable it:
				callbacks: {
					beforeOpen: function() {
						if($(window).width() < 700) {
							this.st.focus = false;
						} else {
							this.st.focus = '#name';
						}
					}
				}
			});
		// end magnific-popup


		//  hidden menu hover detect
			var isMobile = {
				Android:        function() { return navigator.userAgent.match(/Android/i) ? true : false; },
				BlackBerry:     function() { return navigator.userAgent.match(/BlackBerry/i) ? true : false; },
				iOS:            function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false; },
				Windows:        function() { return navigator.userAgent.match(/IEMobile/i) ? true : false; },
				any:            function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());  }
			};

			
				var touchHover = function() {
					$('[data-hover]').click(function(e){
						e.preventDefault();
						var $this = $(this);
						var onHover = $this.attr('data-hover');
						var linkHref = $this.attr('href');
						if (linkHref && $this.hasClass(onHover)) {
							location.href = linkHref;
							return false;
						}
						$this.toggleClass(onHover);
						$this
							.closest('.header-hd-menu__left')
							.find('.header-hd-menu__block')
							.siblings()
							.find('[data-hover]')
							.removeClass(onHover);

					});
				};

				if ( isMobile.any() ) {
					 touchHover();
	  		}


	  		$(".header-hd-menu__list").hoverIntent({
	  			over: function() {
	  				console.log(this);
	  				// $(this).addClass('hover');
	  				this.classList.add('hover');
	  			},
	  			out: function() {
	  				this.classList.remove('hover');
	  			},
	  			selector: 'li',
	  			timeout: 300
	  		});

		// hidden menu end hover detect


		// section MAIN-SLIDER
			$('.main-slider__slider').slick({
				arrows: false,
				dots: true,
				fade: true
			});
		// end section MAIN-SLIDER


		// section SERVICES
			function servicesToggler() {
				var _self = this,
						$marks = $('.services-mark'),
						$features = $('.services-feature');
						console.log('$marks = ' + $marks.length);
						console.log('$features = ' + $features.length);

				this.init =	function() {
					console.log('toggler');
					this.events();
				},

				this.events = function() {
					$marks.hover(this.markOver, this.markOut);
					$features.hover(this.featureOver, this.featureOut);
				},

				this.markOver = function() {
					var $th = $(this),
							index = $th.index();
					
							console.log("mark index " + index);
					$th.addClass('active')
							.siblings()
							.removeClass('active');

					_self.featuresHandler(index, true);
				},

				this.markOut = function() {
					// $marks.removeClass('active');
					// _self.featuresHandler(false, false);
				},

				this.featureOver = function() {
					var $th = $(this),
							index = $th.index();
					
					$th.addClass('active')
							.siblings()
							.removeClass('active');

					_self.markHandler(index, true);
				}

				this.featureOut = function() {
					// $features.removeClass('active');
					// _self.markHandler(false, false);
				}

				this.markHandler = function(index, activity) {
					console.log("feature index " + index);
					if(activity == true){
						$marks.eq(index).addClass('active')
							.siblings()
							.removeClass('active');
					}else{
						$marks.removeClass('active');
						
					}
				},

				this.featuresHandler = function(index, activity) {
					
					if(activity == true){
						$features.eq(index - 1).addClass('active')
							.siblings()
							.removeClass('active');
					}else{
						$features.removeClass('active');
						
					}
					
				} 
			}

			var servToggle = new servicesToggler();
			servToggle.init();
		// end section SERVICES


		// section COMPANY
		$('.company-item__icon').tooltipster({
				// trigger: 'hover',
				// side: 'bottom',
				interactive: true,
				arrow: false,
				viewportAware: false,
				maxWidth: 361,
				trackOrigin: true,
				contentAsHTML: true,
				functionBefore: function() {

					if(screen.width < 768){
						return false;
					}

				},
				functionReady: function(instance, helper) {
					
					helper.tooltip.classList.add('item-icon-tooltip');
					var tHeight = helper.tooltip.offsetHeight,
							origin = helper.origin,
							originTop = helper.origin.getBoundingClientRect().top,
							originHalfHeight = helper.origin.offsetHeight/2;

					helper.tooltip.style.top = (originTop + originHalfHeight) - tHeight/2 + document.documentElement.scrollTop + 'px';
					
					console.log(originTop);
					console.log('scroll top ' + document.documentElement.scrollTop);
				},
				functionPosition: function(instance, helper, position){
					// position.coord.top = helper.origin.getBoundingClientRect().top + (helper.origin.offsetHeight/2);
					position.coord.left = helper.origin.getBoundingClientRect().left + (helper.origin.offsetWidth/2) + 30;
					
					// if($('.header').hasClass('header--fixed')){
					// 	// helper.tooltip.classList.add('info-tip--mobile');
					// 	var posYHelper = helper.origin.getBoundingClientRect().top;
					// 	position.coord.top = posYHelper - 30;
					// }
					return position;
				}

			});
		// end section COMPANY


		// section HISTORY
		var objectDisplayOpt = {
			dots: false,
			arrows: false
		};

		var objectNavOpt = {
			dots: false,
			asNavFor: $('.object-display'),
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [

			{
				breakpoint: 800,
				settings: {

					slidesToShow: 2

				}	
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 3
				}	
			},
			{
				breakpoint: 376,
				settings: {
					slidesToShow: 2
				}	
			}
			]
		};

		var objectDisplay = $('.object-display').slick(objectDisplayOpt);

		var objectNav = $('.object-nav').slick(objectNavOpt);

		objectDisplay.slick('unslick');
		objectNav.slick('unslick');
		
		$('.to-object-popup').magnificPopup({
				type: 'inline',
				preloader: false,
				focus: '#name',

				// When elemened is focused, some mobile browsers in some cases zoom in
				// It looks not nice, so we disable it:
				callbacks: {
					beforeOpen: function() {
						if($(window).width() < 700) {
							this.st.focus = false;
						} else {
							this.st.focus = '#name';
						}
					},
					open: function() {
							objectDisplay.slick(objectDisplayOpt);
							objectNav.slick(objectNavOpt);
						},
					close: function() {
							objectDisplay.slick('unslick');
							objectNav.slick('unslick');
					}
				}
			});
		// end section HISTORY

		// section SPEC-ACTIONS
		$('.spec-actions__content').slick({
			slidesToScroll: 1,
			slidesToShow: 3,
			responsive: [

			{
				breakpoint: 1560,
				settings: {

					slidesToShow: 2,

				}	
			},
			{
				breakpoint: 1100,
				settings: {

					slidesToShow: 1,

				}	
			}
			]
		});
		// end section SPEC-ACTIONS

		// section CARDS-SLIDER
		$('.cards-slider').slick({
			slidesToScroll: 1,
			slidesToShow: 4,
			responsive: [

			{
				breakpoint: 1700,
				settings: {

					slidesToShow: 3,

				}	
			},
			{
				breakpoint: 1300,
				settings: {

					slidesToShow: 2,

				}	
			},
			{
				breakpoint: 870,
				settings: {

					slidesToShow: 1,

				}	
			}
			]
		});
		// end section CARDS-SLIDER

		// section INSTALLATION
			$('.installation-display').slick({
				slidesToScroll: 1,
				arrows: false
			});

			$('.installation-nav').slick({
				slidesToScroll: 1,
				slidesToShow: 5,
				asNavFor: '.installation-display',
				focusOnSelect: true,
				centerMode: true,
				centerPadding: 0,
				responsive: [

				{
					breakpoint: 1600,
					settings: {

						slidesToShow: 4,

					}	
				},
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,

					}	
				},
				{
					breakpoint: 981,
					settings: {
						slidesToShow: 5
					}	
				},
				{
					breakpoint: 769,
					settings: {
					}	
				},
				{
					breakpoint: 561,
					settings: {
						arrows: false,
						slidesToShow: 4
					}	
				},
				{
					breakpoint: 376,
					settings: {
						arrows: false,
						slidesToShow: 3
					}	
				}
				]
			});

			$('.installation-list li').click(function() {
				$(this).addClass('active')
					.siblings()
					.removeClass('active');
			});
		// end section INSTALLATION

		// Accordeon-----------------------------------
			$('.acordeon-link').click(function(e) {
				e.preventDefault();
				var $currentItem = $(this).closest('.acordeon-item');
				if($currentItem.hasClass('acordeon-item-with-sublist')){

					$currentItem.toggleClass('active')
						.siblings()
						.removeClass('active');

					$currentItem.find('.acordeon-sublist')
					.stop(true, true)
					.slideToggle(150);
					$currentItem.siblings()
					.find('.acordeon-sublist')
					.stop(true, true)
					.slideUp(150);

				}else{
					return;
				}
			});
		// end Accordeon-----------------------------------

		// section CATEGORY-VIEW
			$('.category-view__submenu').superfish({
				speed: 'slow',
				speedOut: 'normal'
			});
		
		// end section CATEGORY-VIEW

		// tabs
		var $tabs = $('.tabs__link');

		$tabs.on('click', function(e) {
			e.preventDefault();

			var $th = $(this),
			$href = $th.attr('href'),
			$parent = $th.parent(),
			$parentContainer = $th.closest('.tabs'),
			$currentContentTab = $('.parameters-wrap .tabs__content').find($href);

			console.log($currentContentTab);

			$parent.addClass('tabs__item--active')
			.siblings()
			.removeClass('tabs__item--active');

			$parentContainer
			.find($($href))
			.addClass('active')
			.siblings()
			.removeClass('active');

			$currentContentTab.find('.tabs-mob-toggle')
				.addClass('active');
			
			$currentContentTab.siblings()
				.find('.tabs-mob-toggle')
				.removeClass('active');
		});


		$('.tabs-mob-toggle').click(function() {
			var $th = $(this),
				$thParent = $th.closest('.tabs__item'),
				heightHeader = $('.header').outerHeight(),
				$thMirrorHref = '#' + $thParent.attr('id'),
				$thMirror = $('.tabs .tabs__list').find('[href=' + $thMirrorHref +']');


			$th.toggleClass('active');
			$thParent
			// .toggleClass('active')
			.siblings()
			// .removeClass('active')
			.find('.tabs-mob-toggle')
			.removeClass('active');

			$thParent
				.find('.tabs-mob-content')
				.slideToggle(200, function() {
					console.log('currentslide toggle');
					var $tabsTop = $th.offset().top;

					// $('html, body').animate({scrollTop: $tabsTop - heightHeader - 30}, 100);
				});

			$thParent
				.siblings()
				.find('.tabs-mob-content')
				.slideUp( function() {
					console.log('currentslide up');
					var $tabsTop = $th.offset().top;
					$('html, body').animate({scrollTop: $tabsTop - heightHeader - 30}, 10);
				});

			$thMirror
			.closest('.tabs__item')
			.addClass('tabs__item--active')
			.siblings()
			.removeClass('tabs__item--active');
			

			return false;
		});

		// end tabs

		// section MODEL-PRODUCT
		$('.model-product__display').slick({
			arrows: false,
			fade: true,
			lazyLoad: 'ondemand',
			responsive: [

			{
				breakpoint: 560,
				settings: {

					slidesPerRow: 2

				}	
			},
			{
				breakpoint: 400,
				settings: {

					rows: 1,
					slidesPerRow: 1

				}	
			}
			]
		});

		$('.model-product__nav').slick({
			slidesToScroll: 1,
			slidesToShow: 4,
			lazyLoad: 'ondemand',
			centerMode: true,
			centerPadding: 0,
			asNavFor: $('.model-product__display'),
			focusOnSelect: true,
			responsive: [

			{
				breakpoint: 1600,
				settings: {

					slidesToShow: 3

				}	
			},
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 2
				}	
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 3
				}	
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2
				}	
			}
			]
		});
		// end section MODEL-PRODUCT

	});

	
});


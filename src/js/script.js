
$(document).ready(function(){

	var headerH = $('.header').innerHeight();
    
    $(".header__nav").on("click","a", function (event) {
        event.preventDefault();

        var id  = $(this).attr('href'),
            top = $(id).offset().top - headerH;
        $('body,html').animate({scrollTop: top}, 1000);
    });

/*add class focus on scroll some height
=================================================================*/

    var ourServicesH = $('#ourServices').offset().top - headerH - 100,
    	deliveryWayH = $('#deliveryWay').offset().top - headerH - 1,
    	deliveryTimeH = $('#deliveryTime').offset().top - headerH - 1,
    	priceH = $('#price').offset().top - headerH - 1,
    	contactH = $('#contact').offset().top - headerH - 1;

    function anchorFocus(arg) {
    	$('.header__list a').removeClass('focused');
    	$('.header__list a[href="'+arg+'"]').addClass('focused');
    }

    $(document).on('scroll', function(event) {
    	var scrlT = $(this).scrollTop();

    	if( scrlT >= ourServicesH  && scrlT < deliveryWayH) {
    		anchorFocus('#ourServices');
    	} else if ( scrlT >= deliveryWayH  && scrlT < deliveryTimeH){
    		anchorFocus('#deliveryWay');
    	} else if ( scrlT >= deliveryTimeH && scrlT < priceH){
    		anchorFocus('#deliveryTime');
    	} else if ( scrlT >= priceH && scrlT < contactH){
    		anchorFocus('#price');
    	} else if ( scrlT >= contactH && scrlT < (contactH + $('#contact').height())){
    		anchorFocus('#contact');
    	} else {
    		$('.header__list a').removeClass('focused');
    	};
    });
/*END add class focus on scroll some height
=================================================================*/

/*adaptive width googleMaps frame
=================================================================*/
$('.googleMaps iframe').width($('#contact').innerWidth());

/*END adaptive width googleMaps frame
=================================================================*/

/*resize event*/
 $(window).resize(function () {
 	$('.googleMaps iframe').width($('#contact').innerWidth());
 	modalMenuFooter();
 	mebuButtonHeight();
 	mebuButtonFontSize();
});

/*modal window
=================================================================*/

/*event on click menu button*/
$('.header__mobile__htx').removeClass('active');
$('.header__mobile__htx').on('click', function(event) {
	event.preventDefault();
	$(this).toggleClass('active');
	$('#modalMenu').toggle();
	$('body').toggleClass('noScroll');
	modalMenuFooter();
 	mebuButtonHeight();
 	mebuButtonFontSize();
});

/*modal window menu button height*/
var maxModalHeight = 0;
$('.modalMenu__halfWidth a').each(function() {
	if ($(this).innerHeight() > maxModalHeight) {
		maxModalHeight = $(this).innerHeight();
	};
});
$('.modalMenu__halfWidth a').innerHeight(maxModalHeight);

/*make footer down up*/
function modalMenuFooter () {
$('.modalMenu__menu').innerHeight(
	$(window).innerHeight()  - $('.modalMenu__contactData').innerHeight()
	)
};
modalMenuFooter();

/*modal menu list height*/
$('.modalMenu__menu').css({
	paddingTop: headerH
});

function mebuButtonHeight () {
	$('.modalMenu__list a').each(function(index, el) {
		$(this).innerHeight(
			($('.modalMenu__menu').innerHeight() - headerH) / $('.modalMenu__list a').length
			);
	});
}
mebuButtonHeight();

function mebuButtonFontSize () {
	var modalMenuFontSize = ($('.modalMenu__list a').innerHeight());
	$('.modalMenu__list a').each(function(index, el) {
		$(this).css({
			fontSize: modalMenuFontSize/3,
			'line-height': modalMenuFontSize + 'px'
		});
	});
}
mebuButtonFontSize();


/*event on modal menu click*/
$(".modalMenu__nav").on("click","a", function (event) {
    event.preventDefault();

    var id  = $(this).attr('href'),
        top = $(id).offset().top - headerH;
    $('body,html').scrollTop(top);
    $('#modalMenu').hide();
    $('.header__mobile__htx').removeClass('active');
    $('body').removeClass('noScroll');
});


/* END modal window
=================================================================*/
});

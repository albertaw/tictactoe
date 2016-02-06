
/* ========================================================
 * SMOOTH PAGE SCROLL PLUGIN v1.0.0
 * http://cerebromusic.com/docs/#smoothscroll
 * Copyright 2015 Cerebro Music
 * ========================================================
 * Animates the page scroll when visiting links.
 * Example use: $('.anchor').smoothScroll(); 
 * ======================================================== */

(function ($) {
    $.fn.smoothScroll = function (options) {
        var settings = $.extend({
            speed: 700,
            offset: 55
        }, options);

        var scrollTop = $(window).scrollTop();
        
        function scrollToSection(id) {
            //subtract from offset by height of fixed header
            $('body,html').animate({scrollTop: $(id).offset().top - settings.offset}, settings.speed);
        };

        return this.each(function () {
            var obj = $(this); 
        
            obj.on('click',function(e){
                e.preventDefault();
                scrollToSection(obj.attr('href'));
            });
        }); 
    };
    
})(jQuery);

/* ===============================================================
 * Vertical Align Plugin v2.0.0
 * http://cerebromusic.com/docs/#vertical-align
 * Copyright 2015 Cerebro Music
 * ===============================================================
 * Centers an element vertically with respect to the document window.
 * Example use: $('.center-content').vAlign(); 
 * =============================================================== */

(function ($) {
    'use strict';

    $.fn.vAlign = function (options) {
        var obj = $(this); 
        
        var settings = $.extend({
            marginTop: null,
        }, options);

        function getCenter() {
            var content = obj.height() / 2;
            var parent = $(window).height() / 2;
            var margin = (parent - content);
            return margin;
        }

        return this.each(function () {
            if (settings.marginTop) {
                obj.css({'margin-top': settings.marginTop});
            } else {
                obj.css({'margin-top': getCenter()});
            }
            
            $(window).on('resize', function () {
               obj.css('margin-top', getCenter());
            }); 
           
        }); 
    };
    
})(jQuery);

/* ========================================================
 * Scroll Fade Plugin v1.0.0
 * Copyright 2015 Cerebro Music
 * http://cerebromusic.com/docs/#
 * ========================================================
 * Toggles the transparent class on an element when scrolling 
 * past a specified point.
 * Example: $('.menu').scrollFade();
 * ======================================================== */

(function ($) {
	'use strict';

	$.fn.scrollFadeIn = function (options) {
		var obj = $(this);
		var theme;

		var settings = $.extend({
			offset: 200
		}, options);

		function setNav() {
			if ($(window).scrollTop() > settings.offset) {
				obj.removeClass('transparent');
			} else {
				obj.addClass('transparent');
			}
		}
		return this.each(function () {
			setNav();
			$(window).on('scroll', function () {
				setNav();
			});
		});
	};
})(jQuery);
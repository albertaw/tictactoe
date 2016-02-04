/* ===============================================================
 * Countdown Clock v1.0.0
 * http://cerebromusic.com/docs/#clock
 * Copyright 2015 Cerebro Music
 * ===============================================================
 * Counts down the days, hours, minutes, and seconds.
 * Example use: Creates a clock set to end on March 1, 2015 at 5:00pm
 * var clock = new Countdown("March 1, 2015 17:00:00");
 * clock.init();
 * =============================================================== */

function Countdown(futureDate) {
	
	var days = 0,
		hours = 0,
		minutes = 0,
		seconds = 0,
		day = $('#days'),
		hour = $('#hours'),
		minute = $('#minutes'),
		second = $('#seconds'),
		
		//Convert the date string into number of milliseconds, then divide 
		//by 1000 to get the number of seconds
		endDate = Date.parse(futureDate) / 1000,
		refreshRate = 1000,
		intervalID;

	//private method
	function update () {
		var today = Date.parse(new Date()) / 1000;
		var diff = endDate - today;


		//var diff = -1;
		if (diff <= 0) {
			cleanup();
		}
		//find days left first: if seconds remaining is at least a day (86400s),
		if (diff >= 86400) {
			days = Math.floor(diff / 86400);
			//get the number of SECONDS left by subtracting the number of seconds in
			//days left from our difference
			//and update diff to use in the next calculation.
			diff -= (days * 86400);
			//console.log(days);
		}

		//find hours left: if seconds remaining equal at least 1 hour (3600s)
		if (diff >= 3600) {
			hours = Math.floor(diff / 3600);
			diff -= (hours * 3600);
			//console.log(hours);
		}

		//find minutes left: if seconds remaining equal at least 1 minute (60s)
		if (diff >= 60) {
			minutes = Math.floor(diff / 60);
			diff -= (minutes * 60);
			//console.log(minutes);
		}

		//seconds left will be whatever remains
		seconds = diff;
		//console.log(seconds);

		draw();
		//console.log(seconds);
	}
	
	function draw () {
		if (days < 10) {
			day.text('0' + days);
		} else {
			day.text(days);
		}
		if (hours < 10) {
			hour.text('0' + hours);
		} else {
			hour.text(hours);
		}
		if (minutes < 10) {
			minute.text('0' + minutes);
		} else {
			minute.text(minutes);
		}
		if (seconds < 10) {
			second.text('0' + seconds);
		} else {
			second.text(seconds);
		}
	}
	
	//Code to execute when the clock finishes
	function cleanup () {
		clearInterval(intervalID);
		diff = 0;
		draw();
		console.log("end");
	};

	this.init = function () {
		console.log('clock initiated');
		intervalID = setInterval(function () { 
			update();
		}, refreshRate);

	};

}
  



/* ========================================================
 * Contact Form Plugin v2.0.0
 * http://cerebromusic.com/docs/#contact-form
 * Copyright 2015 Cerebro Music
 * ======================================================== 
 * Ajax form submission with success and error messages.
 * Example use: $('#contact-form').contact();
 * ======================================================== */


(function ($) {
    'use strict';

    var form = $('#contact-form');
    var formLoader = $('.form-loader');
    var formField = $('.form-field');
    var results = $(".form-results");
    var label = $('#contact-form label');

    function handleSuccess(response) {
        formLoader.delay(1000).hide(function() {
            //Clear the form;
            formField.val('');
            //Show success message;
            results.addClass('success').text(response).show();
        });
    }

    function handleFail(data) {

        //remove spinner and show error message
        formLoader.delay(1000).hide(function() {
            //add error message to form results
            results.removeClass('success').addClass('error');

            if (data.responseText !== '') {
                results.text(data.responseText);
            } else {
                results.append('Oops! An error occured and your message could not be sent.');
            }
            results.show();
        });

    }

    $.fn.contact = function(options) {

        var settings = $.extend({
            labels: false,
            placeholder: true
        }, options);

        return this.each(function () {
            //reset error messages
            results.text("");

            //reset form fields
            formField.val('');

            if (settings.labels) {
                label.show();
            } else {
                label.hide();
            }

            if(!settings.placeholder) {
                formField.attr('placeholder', '');
            }
            //on submit 
            $(this).submit(function(event) {
                event.preventDefault();

                formLoader.show();
                //convert form data into key/value strings to be sent with ajax request
                var form_data = $(form).serialize();

                //submit the form
                $.ajax({
                        type: 'POST',
                        url: form.attr('action'), //relative to the page where the contact form lives
                        data: form_data,
                    })
                    //successful response
                    .done(function(response) {
                        handleSuccess(response);
                    })
                    //failed response
                    .fail(function(data) {
                        handleFail(data);
                    });
            }); //end submit
        });
    };

})(jQuery);

/***************************
YOUTUBE VIDEO PLAYER 
****************************/

//This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function playVideo() {
  player.seekTo(0);
  player.playVideo();
 
}

function stopVideo() {
  player.stopVideo();
}
 

function onPlayerReady(event) {
  event.target.setVolume(50);
  //Event listeners   
  $("#player-btn").click(function() {
    playVideo(); 
  });      
        
   $('#player-btn-close').click(function () {
       stopVideo();
    });

   $('.player-modal').click(function() {
      stopVideo();
   });

}

 //This function creates an <iframe> (and YouTube player)
//after the API code downloads.
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
      'videoId': 'AKUPLmR4KX4',  //<----- change the value to your youtube video's id
      'width': 853,
      'height': 480,   
      playerVars: {
        'enablejsapi':1,
        'rel':0,
        'origin':'http://cerebromusic.com' //<--------- change to your domain
      },
      events: {
        'onReady': onPlayerReady,
        
      }
  });
}


/***********************************
VIMEO VIDEO PLAYER 
************************************/
var vimeo = (function () {

    'use strict';

    function onPause() {
        console.log('paused');
    }

    function onFinish() {
        console.log('finished');
    }

    function onPlayProgress() {
        console.log(player.data.seconds + 's played');
    }

    return {
        init: function () {
            var tag = document.createElement('script');
            tag.src = "https://f.vimeocdn.com/js/froogaloop2.min.js";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            var iframe = $('#player')[0];
            var player = $f(iframe);
    
            // When the player is ready, add listeners for pause, finish, and playProgress
            player.addEvent('ready', function() {
                //console.log('ready');
                player.addEvent('pause', onPause);
                player.addEvent('finish', onFinish);
                player.addEvent('playProgress', onPlayProgress);
            });

            //Call the API when a button is pressed
            $('#player-btn').click(function() {
                player.api('play');
            });

            $('#player-btn-close').click(function () {
                player.api('unload');
            });

             $('.player-modal').click(function () {
                player.api('unload');
              });

            console.log('vimeo player initiated');
        }

    };
})();


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
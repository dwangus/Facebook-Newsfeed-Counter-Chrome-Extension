$(document).ready(function() {
	$.get(chrome.extension.getURL('templates/counter.html'), function(html) {
		var myCounter = $.parseHTML(html);
		$(myCounter).appendTo('body');
		$("#draggableFB").css("display", "none");
		
		$.fn.exists = function () {
			return this.length !== 0;
		}
		
		//First arrival to facebook.com
		if ($("div#stream_pagelet").exists()) {
			var counterBox = $( "#draggableFB" );
			$(counterBox).draggable();
			var counter = 1;
			$('#draggableFBText').html(counter);
			$(counterBox).css({
				"display": "initial",
				"position": "fixed",
				"top": "90%",
				"left": "10%",
				"width": "24px",
				"height": "24px", 
				"text-align": "center",
				"padding": "0.25em",
				"border-radius": "5px",
				"z-index": "9999",
				"border-color": "#0066cc",
				"border-width": "3px",
				"border-style": "outset",
				"background-color": "#ffe6cc",
				"display": "flex",
				"justify-content": "center"
			});
			$(window).scroll(function(){
				//So, essentially, I could have ARRIVED at the 28th newsfeed item in succession, even if I scrolled really fast and skipped a bunch (not to mention
				//	there are some items that displace positions of newsfeed items that aren't items themselves -- typically with attributes like 'data-xt-vimpr' 
				//	and 'data-xt' -- but I won't have actually SEEN 28 items so far on my newsfeed... That's why the following, even if I were to calculate
				//	some complicated offset value, doesn't work.
				//(Also, interesting to note: [data-timestamp] is an attribute that only newsfeed items that DON'T displace positions of "fake" items (those
				//	with data-xt and such attributes) will have
				//var lastItemPos = parseInt($( "div[data-insertion-position]" ).last().attr('data-insertion-position'));//The furthest POSITION I was at
				
				var numItems = $( "div[data-insertion-position][data-timestamp]" ).length;//All the ones that I've actually looked at
				
				if (numItems > counter) {
					counter = numItems;
					$('#draggableFBText').html((counter-1));
				}
				//$(window).unbind('scroll');
			});
		}
		
		//All subsequent clicks
		$("a").on('click', function () {
			if (!$("div#stream_pagelet").exists() || ($("div#stream_pagelet").exists() && $(this).is(':contains("Home")'))) {
				var counterBox = $( "#draggableFB" );
				$(counterBox).draggable();
				var counter = 1;
				$('#draggableFBText').html(counter);
				$(counterBox).css({
					"display": "initial",
					"position": "fixed",
					"top": "90%",
					"left": "10%",
					"width": "24px",
					"height": "24px", 
					"text-align": "center",
					"padding": "0.25em",
					"border-radius": "5px",
					"z-index": "9999",
					"border-color": "#0066cc",
					"border-width": "3px",
					"border-style": "outset",
					"background-color": "#ffe6cc",
					"display": "flex",
					"justify-content": "center"
				});
				$(window).scroll(function(){
					var numItems = $( "div[data-insertion-position][data-timestamp]" ).length;
					
					if (numItems > counter) {
						counter = numItems;
						$('#draggableFBText').html((counter-1));
					}
				});
			} else {
				$("#draggableFB").css("display", "none");
			}
		});
	});
});
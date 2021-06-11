(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('#nav a, .scrolly').scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		});

})(jQuery);

if (document.querySelector('.slideshow-container')) {
	var slideIndex = [1,1,1];
	var slideId = ["mySlides1", "mySlides2", "mySlides3"]
	var dotId = ["dot1", "dot2", "dot3"]
	showSlides(1, 0);
	showSlides(1, 1);
	showSlides(1, 2);

	function plusSlides(n, no) {
		showSlides(slideIndex[no] += n, no);
	}

	function currentSlide(n, no) {
		showSlides(slideIndex[no] = n, no);
	}

	function showSlides(n, no) {
	var i;
	var x = document.getElementsByClassName(slideId[no]);
	var y = document.getElementsByClassName(dotId[no]);
	if (n > x.length) {slideIndex[no] = 1}    
	if (n < 1) {slideIndex[no] = x.length}
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";  
	}
	for (i = 0; i < y.length; i++) {
		y[i].className = y[i].className.replace(" active", "");
	}
	x[slideIndex[no]-1].style.display = "block";
	y[slideIndex[no]-1].className += " active"; 
	}
}
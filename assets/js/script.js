const swup = new Swup();

swup.on('contentReplaced', init);

swup.on('contentReplaced', function () {
    window.scrollTo(0, 0);
});

var swupRemoveEventListenerActive = false;

var gifsloaded = false;
// List to track which image sequences have been preloaded (so don't need to re-load)
var imgSequencesLoaded = [];

// Code used for slideshows...
var slideIndex = [1,1,1];
var slideId = ["mySlides1", "mySlides2", "mySlides3"]
var dotId = ["dot1", "dot2", "dot3"]

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

// Load the correct java script for each page...
function init() {
    
    // Code needed for copy email to clipboard button...
    if (document.querySelector('#contact-para')) {
        $(document).ready(function() {
	
            // Add class to mailto link
            // Needed to separate the disabling of the default action AND copy email to clipboard
            $('a[href^=mailto]').addClass('mailto-link');
        
            var mailto = $('.mailto-link');
            var messageCopy = 'Click to copy email address';
            var messageSuccess = 'Email address copied to clipboard';
            
            mailto.append('<span class="mailto-message"></span>');
            $('.mailto-message').append(messageCopy);
            
            // Disable opening your email client. yuk.
            $('a[href^=mailto]').click(function() {
                return false; 
            })
            
            // On click, get href and remove 'mailto:' from value
            // Store email address in a variable.
            mailto.click(function() {
                var href = $(this).attr('href');
                var email = href.replace('mailto:', '');
                copyToClipboard(email);
                $('.mailto-message').empty().append(messageSuccess);
                setTimeout(function() {
                    $('.mailto-message').empty().append(messageCopy);}, 2000); 
            });
    
        });
        
        // Copies the email variable to clipboard
        function copyToClipboard(text) {
            var dummy = document.createElement("input");
            document.body.appendChild(dummy);
            dummy.setAttribute('value', text);
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
        }
    }

    // This was the original code from the tutorial - I have since edited this quite a bit, see below...
    //Code for animating the Protec Video on scroll...
    //Use this tutorial if confused... https://www.youtube.com/watch?v=4OcAAj8aqS8&t=1190s
    // if (document.querySelector('.protec-scrolling')) {      //Check to see if the Protec page is the current page
    //     const html = document.documentElement;
    //     const canvas = document.querySelector('.protec-scrolling');
    //     const context = canvas.getContext('2d');

    //     const currentFrame = index => (
    //         `/animations/ImgSequence_Protec/animation_protec${index.toString().padStart(4, '0')}.jpg`
    //     )

    //     const frameCount = 571;

    //     const preloadImages = () => {
    //         for (let i = 1; i < frameCount; i++) {
    //             const img = new Image();
    //             img.src = currentFrame(i);
    //         }
    //     };

    //     preloadImages();

    //     canvas.height = 1080;               //Height and width of still images, in pixels - get this from photoshop
    //     canvas.width = 1920;
    //     const img = new Image();
    //     img.src = currentFrame(1);
    //     img.onload = function() {
    //         context.drawImage(img, 0, 0)
    //     }

    //     const updateImage = index => {
    //         img.src = currentFrame(index)
    //         context.drawImage(img, 0, 0);
    //     }

    //     window.addEventListener('scroll', () => {
    //         const scrollTop = html.scrollTop;       //Gets the pixel in line with the top of the scroll bar (height of the top of scroll bar)
    //         const maxScrollTop = html.scrollHeight - window.innerHeight;        //Max height (in pixels) the scroll bar can move - height of the content on the page (visible content height)
    //         const pageRatio = html.scrollHeight / window.innerHeight;           //So that as the page becomes longer, the animation still plays only while you can see the video frames on screen
    //         // console.log(html.scrollHeight, window.innerHeight, maxScrollTop)
    //         const scrollFraction = (scrollTop / maxScrollTop) * pageRatio;      //Fraction of the page scrolled * ratio of video height to max scroll height
    //         const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount))    //Get the frame required to output, based on the user's scroll position
    //         // console.log(frameIndex)

    //         requestAnimationFrame( () => updateImage(frameIndex + 1))           //Update the frame shown in the canvas
    //     })
    // }

    if (document.querySelector('.protec-scrolling')) {      //Check to see if the Protec page is the current page
        animateOnScroll('.protec-scrolling', 'ImgSequence_Protec/', '.jpg', 0, 190);
    } else if (document.querySelector('.fitbitbalance-scrolling')) {
        animateOnScroll('.fitbitbalance-scrolling', 'ImgSequence_FitbitBalance/', '.jpg', 0, 82);
    } else if (document.querySelector('.robobug-scrolling')) {
        animateOnScroll('.robobug-scrolling', 'ImgSequence_RoboBug/', '.jpg', 0, 119);
    } else if (document.querySelector('.pregtest-scrolling')) {
        animateOnScroll('.pregtest-scrolling', 'ImgSequence_MotherNature/', '.jpg', 0, 133);
    } else if (document.querySelector('.steadygrip-scrolling')) {
        animateOnScroll('.steadygrip-scrolling', 'ImgSequence_SteadyGrip/', '.jpg', 0, 170);
    } else if (document.querySelector('.bikeframe-scrolling')) {
        animateOnScroll('.bikeframe-scrolling', 'ImgSequence_BikeFrame/', '.jpg', 0, 89);
    } else if (document.querySelector('.leonhackathon-scrolling')) {
        animateOnScroll('.leonhackathon-scrolling', 'ImgSequence_LeonHackathon/', '.jpg', 0, 110);
    } else if (document.querySelector('.segway-scrolling')) {
        animateOnScroll('.segway-scrolling', 'ImgSequence_Segway/', '.jpg', 0, 119);
    } else if (document.querySelector('.spacehack-scrolling')) {
        animateOnScroll('.spacehack-scrolling', 'ImgSequence_SpaceHack/SpaceHackTest', '.jpg', 0, 180);
    } else if (document.querySelector('.commend-scrolling')) {
        animateOnScroll('.commend-scrolling', 'ImgSequence_Commend/Commend', '.jpg', 0, 94);
    } else if (document.querySelector('.legobites-scrolling')) {
        animateOnScroll('.legobites-scrolling', 'ImgSequence_LegoBites/LegoBites', '.jpg', 0, 132);
    } else if (document.querySelector('#portfolio')) {
        // Only preload & do loading animation on first navigation to site
        if (gifsloaded == false) {
            preloadGifs();
        } else {
            $(".loader-wrapper").hide();
        }
    }


    function preloadGifs() {
        var gifs = new Array();
        // var gifsloaded = false;
        var loadedgifcount = 0;
        $(".loader-wrapper").show();
        function preload() {
            totalgifs = preload.arguments.length;
            // console.log(totalgifs);
            for (i = 0; i < preload.arguments.length; i++) {
                gifs[i] = new Image();
                gifs[i].src = preload.arguments[i];
                gifs[i].onload = function () {
                    loadedgifcount += 1;
                    // console.log(loadedgifcount);
                    if (loadedgifcount >= totalgifs/2) {  //When half the gifs have loaded
                        if (gifsloaded == false) {  //load the page...
                            gifsloaded = true;
                            $(".loader-wrapper").fadeOut(500);
                            $("#swup").fadeOut("fast");
                            $("#swup").fadeIn(500);
                        }
                    }
                }
            }
        }
        preload(
            "/Gifs/GIF_FitbitBalance.gif",
            "/Gifs/GIF_Protec.gif",
            "/Gifs/GIF_RoboBug.gif",
            "/Gifs/GIF_MotherNature.gif",
            "/Gifs/GIF_SteadyGrip.gif",
            "/Gifs/GIF_BikeFrame.gif",
            "/Gifs/GIF_LeonHackathon.gif",
            "/Gifs/GIF_Segway.gif",
            "/Gifs/GIF_SpaceHack.gif",
            "/Gifs/GIF_Commend.gif",
            "/Gifs/GIF_LegoBites.gif"
        );
    }

    function animateOnScroll(animationClassName, filePathName, fileExtension, frameFirst, frameLast) {
        const html = document.documentElement;
        const canvas = document.querySelector(animationClassName);
        const context = canvas.getContext('2d');
        var animationHasFinished = false;
        $("#set-height").animate({opacity: 1}, 0);      //Make sure animation never faded out on load

        const currentFrame = index => (
            `/animations/${filePathName}${index.toString().padStart(4, '0')}${fileExtension}`
        )
        const frameCount = frameLast - frameFirst;

        // OLD PRELOADER...
        // const preloadImages = () => {
        //     for (let i = frameFirst; i < frameLast; i++) {
        //         const img = new Image();
        //         img.src = currentFrame(i);
        //     }
        // };

        // NEW PRELOADER (with loading animation before all images are loaded)...
        // const preloadImages = (index) => {
        //     index = index || frameFirst;
        //     if (frameLast > index) {
        //         var img = new Image();
        //         img.onload = function() {
        //             preloadImages(index + 1);
        //         }
        //         img.src = currentFrame(index);
        //         console.log("Image loaded");
        //         // console.log("Images Preloading" + index);
        //     } else {
        //         $("#set-height").fadeOut("fast");
        //         $(".loader-wrapper").fadeOut(500);
        //         $("#set-height").fadeIn(1000);
        //     };
        // };

        // FINAL PRELOADER (Optimising page loading time)
        const preloadImages = () => {
            var imgcount = 0; //Counting the number of images that have loaded
            var pageloaded = false;
            for (let i = frameFirst; i < frameLast; i++) {
                const img = new Image();
                img.src = currentFrame(i);
                img.onload = function () {
                    imgcount += 1;
                    if (imgcount > frameCount/2) {  //when more than 1/2 the frames have been loaded...
                        if (pageloaded == false) {  //load the page...
                            pageloaded = true;
                            $("#set-height").fadeOut("fast");
                            $(".loader-wrapper").fadeOut(500);
                            $("#set-height").fadeIn(1000);
                            imgSequencesLoaded.push(animationClassName);    //Remember, so don't need to preload next time
                        }
                    }
                }
            }
        };

        if (imgSequencesLoaded.includes(animationClassName)) {
            // If already navigated to this page (and loaded previously), no need to reload
            $(".loader-wrapper").hide();
        } else {
            $(".loader-wrapper").show();
            preloadImages();
        }

        canvas.height = 1080;               //Height and width of still images, in pixels - get this from photoshop
        canvas.width = 1920;
        const img = new Image();
        // img.src = currentFrame(1);
        img.src = currentFrame(frameFirst);
        img.onload = function() {
            context.drawImage(img, 0, 0)
        }

        const updateImage = index => {
            // context.clearRect(0, 0, 1920, 1080);
            img.src = currentFrame(index)
            context.drawImage(img, 0, 0);
        }

        const scrollFunction = () => {
            const scrollTop = html.scrollTop;       //Gets the pixel in line with the top of the scroll bar (height of the top of scroll bar)
            const maxScrollTop = html.scrollHeight - window.innerHeight;        //Max height (in pixels) the scroll bar can move - height of the content on the page (visible content height)
            const pageRatio = html.scrollHeight / window.innerHeight;           //So that as the page becomes longer, the animation still plays only while you can see the video frames on screen
            // console.log(html.scrollHeight, window.innerHeight, maxScrollTop)
            const scrollFraction = (scrollTop / maxScrollTop) * pageRatio;      //Fraction of the page scrolled * ratio of video height to max scroll height
            // const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount))    //Get the frame required to output, based on the user's scroll position
            const frameIndex = Math.min(frameLast - 1, Math.floor(frameFirst + (scrollFraction * frameCount)))
            // console.log(frameIndex)
            requestAnimationFrame(() => updateImage(frameIndex + 1))           //Update the frame shown in the canvas
            // For mobile specifically (width <= 736px), we want to hide the animation after it finishes...
            if ($(window).width() <= 736) {
                if ((frameIndex == frameLast - 1) && (animationHasFinished == false))  {
                    $("#set-height").animate({opacity: 0}, 500);
                    animationHasFinished = true;
                } else if ((frameIndex < frameLast - 1) && (animationHasFinished == true)) {
                    $("#set-height").animate({opacity: 1}, 500);    //If scrolling back to the top, fade back in
                    animationHasFinished = false;
                }
            }
        }

        // Add the event listener to animate as the page is scrolled
        window.addEventListener('scroll', scrollFunction);

        function unload() {
            window.removeEventListener('scroll', scrollFunction);
            // console.log("Event removed");
        }

        // When navigating away from the page, remove the scroll event (otherwise causes great performance issues)
        swup.on('willReplaceContent', unload);
    }

    // Below just runs to make sure all slideshow stuff is laid out properly on first load of webpage that contains a slideshow
    if (document.querySelector('.slideshow-container')) {
        // Display the slideshows, always with first images shown on page load
        currentSlide(1, 0);
        currentSlide(1, 1);
        currentSlide(1, 2);
    }

    // Alt functionality for touchscreen devices
    function is_touch_enabled() {
        return ( 'ontouchstart' in window ) ||
               ( navigator.maxTouchPoints > 0 ) ||
               ( navigator.msMaxTouchPoints > 0 );
    }

    if (is_touch_enabled()) {
        // For each featured project...
        const featured_links = document.querySelectorAll(".featured-link");
        featured_links.forEach(feat_link => {
            // Save the link to the project page
            page_link = feat_link.getAttribute("href");
            // Disable link (so clicking on it 1st time doesn't change the page - just provides more info & swaps to gif
            feat_link.setAttribute("href", "javascript:void(0)");

            // Click once to enable the link (so if we click again, we navigate to project page
            function delay(time) {
                return new Promise(resolve => setTimeout(resolve, time));
            }
            // ***NOTE: The 'function(index){})(closed_link) is required because of 'closure'
            // Otherwise, the event listener will always return the final 'closed_link', as it's stored as a global variable
            // i.e. when any eventlistener is activated, the 'spacehack' link is always set (last one in the loop)
            (function(closed_link){
                feat_link.addEventListener("mouseup", function handleClick(event) {
                    // Need a very small delay, otherwise will click new link & change page
                    delay(1).then(() => feat_link.setAttribute("href", closed_link));
                });
            })(page_link)

            // If click elsewhere, disable the link again
            document.addEventListener("click", (event) => {
                const isClickInside = feat_link.contains(event.target);
                if (!isClickInside) {
                    // Set to the correct attribute in the list, based on the count!
                    feat_link.setAttribute("href", "javascript:void(0)");
                }
            });
        });
    }

}

init();

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    sideNavBtn = document.getElementById("side-nav-button");
    sideNavBtn.setAttribute("onClick", "closeNav()");
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    sideNavBtn = document.getElementById("side-nav-button");
    sideNavBtn.setAttribute("onClick", "openNav()");
  }


// Alternative to hover functionality, for touchscreen devices (portfolio page)
/* If touchscreen {
    remove onmouseenter functionality
    add onclick event {
        no link to follow
        show middle, switch to gif, and activate link
    } 
    when clicking outside the element {
        de-activate onclick event (go back to still image)
    }
}

 else do nothing */
const swup = new Swup();

swup.on('contentReplaced', init);

swup.on('contentReplaced', function () {
    window.scrollTo(0, 0);
});

var swupRemoveEventListenerActive = false;

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

    // This was the original code from the tutorial - I have since edited this into a function, below
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
        animateOnScroll('.protec-scrolling', 'ImgSequence_Protec/animation_protec', '.jpg', 0, 571);
    } else if (document.querySelector('.fitbitbalance-scrolling')) {
        animateOnScroll('.fitbitbalance-scrolling', 'ImgSequence_FitbitBalance/', '.png', 1, 165);
    } else if (document.querySelector('.robobug-scrolling')) {
        animateOnScroll('.robobug-scrolling', 'ImgSequence_RoboBug/', '.png', 0, 360);
    } else if (document.querySelector('.pregtest-scrolling')) {
        animateOnScroll('.pregtest-scrolling', 'ImgSequence_PregTest/', '.png', 60, 460);
    } else if (document.querySelector('.steadygrip-scrolling')) {
        animateOnScroll('.steadygrip-scrolling', 'ImgSequence_SteadyGrip/', '.png', 0, 170);
    } else if (document.querySelector('.bikeframe-scrolling')) {
        animateOnScroll('.bikeframe-scrolling', 'ImgSequence_BikeFrame/', '.png', 1, 180);
    } else if (document.querySelector('.leonhackathon-scrolling')) {
        animateOnScroll('.leonhackathon-scrolling', 'ImgSequence_LeonHackathon/', '.png', 0, 220);
    } else if (document.querySelector('.segway-scrolling')) {
        animateOnScroll('.segway-scrolling', 'ImgSequence_Segway/animation_segway', '.jpg', 0, 239);
    } else if (document.querySelector('.spacehack-scrolling')) {
        animateOnScroll('.spacehack-scrolling', 'ImgSequence_SpaceHack/', '.png', 0, 360);
    }

    function animateOnScroll(animationClassName, filePathName, fileExtension, frameFirst, frameLast) {
        const html = document.documentElement;
        const canvas = document.querySelector(animationClassName);
        const context = canvas.getContext('2d');

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
        const preloadImages = (index) => {
            index = index || frameFirst;
            if (frameLast > index) {
                var img = new Image();
                img.onload = function() {
                    preloadImages(index + 1);
                }
                img.src = currentFrame(index);
                console.log("Image loaded");
                // console.log("Images Preloading" + index);
            } else {
                $("#set-height").fadeOut("fast");
                $(".loader-wrapper").fadeOut(500);
                $("#set-height").fadeIn(1000);
            };
        };

        preloadImages();

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
            // console.log('scroll active');
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
}

init();
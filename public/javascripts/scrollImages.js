var imageURLForIndex;

window.addEventListener('load', function() {

  
  var mobile = checkMobile();



  var detailTextForIndex = ['never miss a note again', 'learn from real-time tuning...', '...or view past performances',
    'keep recordings forever', 'customize your settings'
  ];

  var imageIndex = 1; //start at 1 because image is already set to first
  var imageChangeTrack = 0; //0 means fade out image, 1 means fade out second-image

  var image = document.getElementById('image'); // two images are used to cross-fade (fade one out and the other in) for animation
  var secondImage = document.getElementById('second-image');
  secondImage.opacity = 0

  var details = document.getElementById('details'); // two details are used to cross-fade (fade one out and the other in) for animation
  var secondDetails = document.getElementById('second-details');
  secondDetails.opacity = 0

  var border = document.getElementById('border'); //border that moves along bottom with slides
  var currentLeft = 0; //current position of border (in vw)
  var newLeft = 20; //new position of border (in vw)

  var downloadButton = document.getElementById('download-btn');
  var contactButton = document.getElementById('contact-btn');


  var header = document.getElementById('header');

  var images = [];
	function preload() {
	  for (var i = 0; i < arguments.length; i++) {
	    images[i] = new Image();
	    images[i].src = preload.arguments[i];
	  }
	}

	  // if (mobile) {
  var width = screenWidth();
  if (width <= 640) { //using mobile images
    imageURLForIndex = ['/images/mobile/hzscreen.png', '/images/mobile/tunerscreen.png',
      '/images/mobile/playbackscreen.png', '/images/mobile/savedscreen.png', '/images/mobile/settingscreen.png'
    ]; //store url depending on index

    preload(imageURLForIndex);

    image.src = imageURLForIndex[0];
    secondImage.src = imageURLForIndex[0];
    //remove web-based elements
    downloadButton.innerHTML = '';
    contactButton.innerHTML = '';
  } else if (mobile) { //using web images but altered
		imageURLForIndex = ['/images/web/hzscreen.png', '/images/web/tunerscreen.png',
      '/images/web/playbackscreen.png', '/images/web/savedscreen.png', '/images/web/settingscreen.png'
    ];
    preload(imageURLForIndex);

    image.src = imageURLForIndex[0];
    secondImage.src = imageURLForIndex[0];

    image.style.left = 12 + 'vh';
    image.style.top = 14 + 'vw';
    image.style.width = 76 + 'vh';
    image.style.height = 67.336 + 'vh';

    secondImage.style.left = 12 + 'vh';
    secondImage.style.top = 14 + 'vw';
    secondImage.style.width = 76 + 'vh';
    secondImage.style.height = 67.336 + 'vh';


    //remove web-based elements
    downloadButton.innerHTML = 'download';
    contactButton.innerHTML = 'contact us';

    downloadButton.style.left = 'auto';
    downloadButton.style.right = 30 + 'px';
    downloadButton.style.top = 76 + 'px';

  	header.style.fontSize = '30px';
  	header.style.left = '90vh';
  	header.style.top = '26.66vh';


  	details.style.fontSize = '24px';
  	details.style.left = '90vh';
  	details.style.top = '34vh';

  	secondDetails.style.fontSize = '24px';
  	secondDetails.style.left = '90vh';
  	secondDetails.style.top = '34vh';



  } else {
    imageURLForIndex = ['/images/web/hzscreen.png', '/images/web/tunerscreen.png',
      '/images/web/playbackscreen.png', '/images/web/savedscreen.png', '/images/web/settingscreen.png'
    ];
    preload(imageURLForIndex);

    image.src = imageURLForIndex[0];
    secondImage.src = imageURLForIndex[0];
    //remove web-based elements
    downloadButton.innerHTML = 'download';
    contactButton.innerHTML = 'contact us';
  }



  setInterval(function() {
    // method to be executed;
    if (imageChangeTrack % 2 === 0) { //determine whether to fade out first or second image
      //fade out first
      secondImage.src = imageURLForIndex[imageIndex]; //second is still 0 opacity, update image and fade it in
      secondDetails.innerHTML = detailTextForIndex[imageIndex]; //same for detail

      _('image').fade('out', 400); //cross-fade
      _('details').fade('out', 400); //change this number
      _('second-image').fade('in', 400);
      _('second-details').fade('in', 400);

      //move bottom border and update position
      move(border, currentLeft, newLeft, 500);
      currentLeft = newLeft;
      newLeft += 20; //currently 5 slides, so each one is 1/5 of the whole screen
      newLeft = newLeft % 100;

      //image is out so change image url
      imageIndex++;
      imageIndex = imageIndex % 5;
      imageChangeTrack++;

    } else {
      //fade out second
      image.src = imageURLForIndex[imageIndex]; //first is still 0 opacity, update image and fade it in
      details.innerHTML = detailTextForIndex[imageIndex]; //same for detail

      _('second-image').fade('out', 400); //cross-fade
      _('second-details').fade('out', 400);
      _('image').fade('in', 400);
      _('details').fade('in', 400);

      //move bottom border and update position
      move(border, currentLeft, newLeft, 300); //change 500
      currentLeft = newLeft;
      newLeft += 20; //currently 5 slides, so each one is 1/5 of the whole screen
      newLeft = newLeft % 100;

      //second-image is out so change second-image url
      imageIndex++;
      imageIndex = imageIndex % 5;
      imageChangeTrack++;
    }

  }, 3000); //4 seconds
});

window.addEventListener('resize', function() {

	var image = document.getElementById('image'); // two images are used to cross-fade (fade one out and the other in) for animation
  var secondImage = document.getElementById('second-image');

  var downloadButton = document.getElementById('download-btn');
  var contactButton = document.getElementById('contact-btn');

  var width = screenWidth();
  if (width <= 640) {
    imageURLForIndex = ['/images/mobile/hzscreen.png', '/images/mobile/tunerscreen.png',
      '/images/mobile/playbackscreen.png', '/images/mobile/savedscreen.png', '/images/mobile/settingscreen.png'
    ]; //store url depending on index
    preload(imageURLForIndex);
    image.src = imageURLForIndex[0];
    secondImage.src = imageURLForIndex[0];
    //remove web-based elements
    downloadButton.innerHTML = '';
    contactButton.innerHTML = '';
  } else {
    imageURLForIndex = ['/images/web/hzscreen.png', '/images/web/tunerscreen.png',
      '/images/web/playbackscreen.png', '/images/web/savedscreen.png', '/images/web/settingscreen.png'
    ];
    preload(imageURLForIndex);

    image.src = imageURLForIndex[0];
    secondImage.src = imageURLForIndex[0];
    //remove web-based elements
    downloadButton.innerHTML = 'download';
    contactButton.innerHTML = 'contact us';
     //store url depending on index
    //  var downloadImage = document.getElementById('download-image');
    // var contactImage = document.getElementById('contact-image');
    //  downloadImage.parentNode.removeChild(downloadImage);
    //  contactImage.parentNode.removeChild(contactImage);
  }
});

///Animate move element from currentLeft to newLeft over duration milliseconds
function move(elem, currentLeft, newLeft, duration) {
  var left = currentLeft;
  var refreshRate = 10; //arbitrary refresh rate -- 100 times/second
  var increment = (newLeft - currentLeft) / (duration / refreshRate) //number of vw that should increase in each frame
  function frame() {
    left += increment; // update left
    elem.style.left = left + 'vw'; // update frame position
    if (Math.round(left) === newLeft) // check finish condition
      clearInterval(id);
  }
  var id = setInterval(frame, refreshRate); // draw every 10ms
}

function screenWidth() {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;

  return x;

}


///check for mobile
function checkMobile() {
  var check = false;
  (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

///helper function for fade
function _(el) {
  if (!(this instanceof _)) {
    return new _(el);
  }
  this.el = document.getElementById(el);
}

///Fade image in or out over certain duration
_.prototype.fade = function fade(type, ms) {

  var isIn = type === 'in',
    opacity = isIn ? 0 : 1,
    interval = 50,
    duration = ms,
    gap = interval / duration,
    self = this;


  if (isIn) {
    self.el.style.display = 'inline';
    self.el.style.opacity = opacity;
  }

  function func() {
    opacity = isIn ? opacity + gap : opacity - gap;
    self.el.style.opacity = opacity;

    if (opacity <= 0) self.el.style.display = 'none'
    if (opacity <= 0 || opacity >= 1) window.clearInterval(fading);
  }

  var fading = window.setInterval(func, interval);
}
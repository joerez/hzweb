window.addEventListener('load', function() {

  var imageURLForIndex = ['/images/hzscreen.png', '/images/tunerscreen.png',
    '/images/playbackscreen.png', '/images/savedscreen.png', '/images/calibratescreen.png'
  ]; //store url depending on index
  var detailTextForIndex = ['never miss a note again', 'learn from real-time tuning...', '...or view past performances',
    'keep recordings forever', 'tune relative to your instrument'
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

  setInterval(function() {
    // method to be executed;
    if (imageChangeTrack % 2 === 0) { //determine whether to fade out first or second image
      //fade out first
      secondImage.src = imageURLForIndex[imageIndex]; //second is still 0 opacity, update image and fade it in
      secondDetails.innerHTML = detailTextForIndex[imageIndex]; //same for detail

      _('image').fade('out', 400); //cross-fade
      _('details').fade('out', 400);
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
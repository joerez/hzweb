window.addEventListener('load', function() {
  console.log('All assets are loaded')

  var imageURLForIndex = ['/images/hzscreen.png', '/images/tunerscreen.png',
    '/images/playbackscreen.png', '/images/savedscreen.png', '/images/calibratescreen.png'
  ]; //store url depending on index
  var detailTextForIndex = ['never miss a note again', 'learn from real-time tuning...', '...or view past performances', 
  	'keep recordings forever', 'tune relative to your instrument'];

  var imageIndex = 1; //start at 1 because image is already set to first
  var imageChangeTrack = 0; //0 means fade out image, 1 means fade out second-image

  var image = document.getElementById('image');
  var secondImage = document.getElementById('second-image');
  secondImage.opacity = 0

  var details = document.getElementById('details');
  var secondDetails = document.getElementById('second-details');
  secondDetails.opacity = 0

  setInterval(function() {
    // method to be executed;
    if (imageChangeTrack % 2 === 0) {
    	secondImage.src = imageURLForIndex[imageIndex];
    	secondDetails.innerHTML = detailTextForIndex[imageIndex];

    	_('image').fade('out', 200);
    	_('details').fade('out', 200);
    	_('second-image').fade('in', 200);
    	_('second-details').fade('in', 200);

    	//image is out so change image url
    	imageIndex++;
    	imageIndex = imageIndex % 5;
    	imageChangeTrack++;
    	
    } else {
		image.src = imageURLForIndex[imageIndex];
		details.innerHTML = detailTextForIndex[imageIndex];

    	_('second-image').fade('out', 200);
    	_('second-details').fade('out', 200);
    	_('image').fade('in', 200);
    	_('details').fade('in', 200);
    	//second-image is out so change second-image url
    	imageIndex++;
    	imageIndex = imageIndex % 5;
    	imageChangeTrack++;
    }

  }, 5000); //10 seconds
})

function myClick() {
  setTimeout(
    function() {
      document.getElementById('div1').style.display='none';
      document.getElementById('div2').style.display='none';
    }, 5000);
}



function _(el) {
  if (!(this instanceof _)) {
    return new _(el);
  }
  this.el = document.getElementById(el);
}

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
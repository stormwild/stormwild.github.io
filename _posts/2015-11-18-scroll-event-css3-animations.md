---
title: Scroll Event and CSS3 Animations
---

### Listening for scroll event

{% highlight js %}
if(window.addEventListener) {
 window.addEventListener('scroll', scrollHandler, false);
} else {
  window.attachEvent('onscroll', scrollHandler);
}
{% endhighlight %}

### Getting Percentage Scroll Position

{% highlight js %}var ratio = document.body.scrollTop / (document.body.scrollHeight - document.body.clientHeight) * 100;{% endhighlight %}

### Add Remove Classes on Element

{% highlight js %}
element.classList.add('classname');
element.classList.remove('classname'); 

element.classList.toggle('classname');
element.classList.contains('classname'); // returns bool
element.classList.add('foo', 'bar');

// Supported on modern browsers; support from IE10 up
{% endhighlight %}
    
[classList Shim](https://github.com/eligrey/classList.js/blob/master/classList.js)    

### Define Animation Keyframes

{% highlight css %}
@keyframes show {
  0% {
    opacity: 0;
    animation-timing-function: linear;
  }
  100% {
    opacity: 1;
    animation-timing-function: linear;
  }
}
{% endhighlight %}

0% or from 100% or to

    
### Define Animation Property

{% highlight css %}
.element .in {
  animation: show .5s linear 0s 1 normal forwards;
}
{% endhighlight %}
    
  animation: name duration timing-function delay iteration-count direction fill-mode play-state;    
    
### Detecting Transition and Animation End

References:

- [Detecting CSS Animation and Transition End with JavaScript](http://osvaldas.info/detecting-css-animation-transition-end-with-javascript)

- [How to Capture CSS3 Animation Events in JavaScript](http://www.sitepoint.com/css3-animation-javascript-event-handlers/)

- [Controlling CSS Animations and Transitions with JavaScript](https://css-tricks.com/controlling-css-animations-transitions-javascript/)

- [Detecting CSS Animation Completion with JavaScript](https://davidwalsh.name/css-animation-callback)

- [Detect the End of CSS Animations and Transitions with JavaScript](https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/)

- [An Introduction To CSS3 Keyframe Animations](http://www.smashingmagazine.com/2011/05/an-introduction-to-css3-keyframe-animations/)
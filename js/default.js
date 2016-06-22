var vis = .8;
var ticking = false;

checkVis();


$('.prev, .next').mouseover(function() {
  var $c = $(this).parents('.container');
  $c.addClass('picture-mode-hover');
  $c.find('.text')
    .addClass('fade-out');
});
$('.prev, .next').mouseout(function() {
  $(this).parents('.container').find('.text')
    .removeClass('fade-out');
});

$('.next').click(function() {
  var $c = $(this).parents('.container');
  $c.addClass('picture-mode');
  $c.find('.background').css({
    left: '-100vw'
  });
  $c.find('.extra-image').css({
    left: 0,
    opacity: 1
  });

});

// $('.container').height($(window).height());

$(window).scroll(function(){
  requestTick();
});

function checkVis() {
}

function percentageInViewport(scrollBottom, $elem) {
  var h = $elem.height();
  var elemPos = $elem.position();
  var inViewport = scrollBottom - elemPos.top;
  return inViewport > 0 ? inViewport/ h : 0;
}

function update() {
  ticking = false;
  
  var scrollTop = $(document).scrollTop();
  var scrollBottom = scrollTop + $(window).height();
  var $cs = $('.container[data-fade]');

  var write = [];
  $cs.each(function() {
    var inVp = percentageInViewport(scrollBottom, $(this));
    $(this).css({
      opacity: Math.min(inVp + .2, 1)
    });
    if (inVp > .6) {
      $(this).find('.logo').addClass('in');
      $(this).find('.text').addClass('in');
    }
  });

  // var scrolledBy = $.grep($cs, function(item) {
  //   // calc percentage in viewport
  //   var inVp = percentageInViewport(scrollBottom, $(this));
  //   console.log(inVp);
  // });
  // if (scrolledBy.length) {
  //   // latest
  //   var $c = $(scrolledBy[scrolledBy.length - 1]);
  //   var $logo = $c.find('.logo').addClass('in');
  //   var $text = $c.find('.text');
  //   var topOffset = scrollTop - $c.position().top;
  //   $logo.addClass('in');
  //   $text.addClass('in').css({'margin-top': - topOffset / 20});
  // }

  // $('.container').each(function() {
  //   var fracs = $(this).fracs();
  //   var v = fracs.visible;
  //   // $(this).css({'background-position': '50% ' + (v*100) +  '%'});
  //   if (fracs.visible < vis) {
  //     $(this).css({
  //       opacity: fracs.visible + (1 - vis)
  //       // '-webkit-filter': 'grayscale(' + (1 - fracs.visible) + ')'
  //     });
  //   } else {
  //     $(this).css({opacity: 1});
  //   }
  // });

  // checkVis();
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
  }
  ticking = true;
}

// header
// var $header = $('header');
// $header.css({
//   opacity: 1 - (scrollTop / ($(window).height() - 200)),
//   top: - scrollTop / 4
// });

// header
// if (scrollTop > $header.position().top) {
//   $('header').addClass('sticky');
// }
//

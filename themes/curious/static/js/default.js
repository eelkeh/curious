var vis = .8;
var ticking = false;

checkVis();

// $('.container').height($(window).height());

$(window).scroll(function(){
  requestTick();
});

function checkVis() {
  $('.container').each(function() {
    var fracs = $(this).fracs();
    var v = fracs.visible;
    // $(this).css({'background-position': '50% ' + (v*100) +  '%'});
    if (fracs.visible < vis) {
      $(this).css({opacity: fracs.visible + (1 - vis)});
    } else {
      $(this).css({opacity: 1});
    }
  });
}

function update() {
  ticking = false;
  
  var scrollTop = $(document).scrollTop();
  var $cs = $('.container:not(.opening)');
  var scrolledBy = $.grep($cs, function(item) {
    return $(item).position().top <= scrollTop;
  });
  if (scrolledBy.length) {
    var $c = $(scrolledBy[scrolledBy.length - 1]);

    $c.find('.logo').addClass('in');
    $c.find('.text').addClass('in');

    var topOffset = scrollTop - $c.position().top;
    $text = $c.find('.text');
    $text.css({'margin-top': - topOffset / 20});
  }

  // header
  var $header = $('header');
  $header.css({
    opacity: 1 - (scrollTop / ($(window).height() - 200)),
    top: - scrollTop / 4
  });

  // header
  // if (scrollTop > $header.position().top) {
  //   $('header').addClass('sticky');
  // }

  checkVis();
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
  }
  ticking = true;
}

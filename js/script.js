var owl = $('');
owl.owlCarousel({
    loop:true,
    nav:true,
    margin:25,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items: 1,
        },
        768:{
            items: 2,
        },
        1100:{
            items: 6,
        },
        1400:{
            items: 8,
            loop: false,
        }
    }
});



$(document).ready(function() {
  // Slider 1
  $(".owl-slider-1").owlCarousel({
    loop:true,
    nav:true,
    margin:25,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1100: { items: 6 },
      1400: { items: 8,loop: false,}
    }
  });

  // Slider 2 (configuración diferente)
  $(".owl-slider-1").owlCarousel({
    loop:true,
    nav:true,
    margin:25,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1100: { items: 6 },
      1400: { items: 8,loop: false,}
    }
  });

  $(".owl-slider-2").owlCarousel({
    loop:true,
    nav:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1100: { items: 3 },
      1400: { items: 4,loop: false,}
    }
  });

  $(".owl-slider-3").owlCarousel({
    loop:true,
    nav:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1100: { items: 5 },
      1400: { items: 6,loop: false,}
    }
  });

  $(".owl-slider-4").owlCarousel({
    loop:true,
    nav:true,
    margin:25,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1100: { items: 6 },
      1400: { items: 8,loop: false,}
    }
  });

  $(".owl-slider-5").owlCarousel({
    loop:true,
    nav:true,
    margin:25,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1100: { items: 6 },
      1400: { items: 8,loop: false,}
    }
  });

  $(".owl-slider-6").owlCarousel({
    loop:true,
    nav:true,
    margin:25,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1100: { items: 6 },
      1400: { items: 8,loop: false,}
    }
  });
});
$('.play').on('click',function(){
    owl.trigger('play.owl.autoplay',[1000])
})
$('.stop').on('click',function(){
    owl.trigger('stop.owl.autoplay')
})
owl.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY>0) {
        owl.trigger('next.owl');
    } else {
        owl.trigger('prev.owl');
    }
    e.preventDefault();
});
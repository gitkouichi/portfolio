$( function() {
  var windowHeight,
      windowPositionTop,
      flagLoad = false;

  $( ".header__title, .header__note" ).css( { "position": "relative", "opacity": "0", "left": "20px" } );
  $( ".common__head, .work__item, .about__item" ).css( { "position": "relative", "opacity": "0", "top": "10px" } );

  $( ".header__title" ).animate( { "opacity": "1", "left": "0" }, 500 );

  setTimeout( function() {
    $( ".header__note" ).animate( { "opacity": "1", "left": "0" }, 500, function() {
      flagLoad          = true;
      windowHeight      = $( window ).height();
      windowPositionTop = $( window ).scrollTop();

      fadeInContents();
    } );
  }, 250 );

  $( window ).scroll( function() {
    if( flagLoad ) {
      windowPositionTop = $( window ).scrollTop();

      fadeInContents();
    }
  } );

  $( window ).resize( function() {
    windowHeight = $( window ).height();
  } );

  function fadeInContents() {
    $( ".common__head" ).each( function() {
      var targetPositionTop = $( this ).offset().top;
      if( windowPositionTop > targetPositionTop - windowHeight + 200 ) {
        $( this ).animate( { "opacity": "1", "top": "0" }, 500 );
      }
    } );

    $( ".work" ).each( function() {
      var targetPositionTop = $( this ).offset().top;
      if( windowPositionTop > targetPositionTop - windowHeight + 200 ) {
        $( this ).find( ".work__item" ).each( function( i ) {
          var itemObj = $( this );

          setTimeout( function() {
            itemObj.animate( { "opacity": "1", "top": "0" }, 500 );
          }, 200 * i );
        } );
      }
    } );

    $( ".about" ).each( function() {
      var targetPositionTop = $( this ).offset().top;
      if( windowPositionTop > targetPositionTop - windowHeight + 200 ) {
        $( this ).find( ".about__item" ).each( function( i ) {
          var itemObj = $( this );

          setTimeout( function() {
            itemObj.animate( { "opacity": "1", "top": "0" }, 500 );
          }, 200 * i );
        } );
      }
    } );
  }

  $( "a[href^='#']" ).click( function() {
    var href     = $( this ).attr( "href" );
    var target   = $( href == "#" || href == "" ? "html" : href );
    var position = target.offset().top;

    $( "body,html" ).animate( { scrollTop: position }, 400, "swing" );

    return false;
  } );
} );

(function( $ ) {

  "use strict";
  $.fn.modal = function( options ) {

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      closeModalClass : 'close-modal', /* The class name to give an element to close the modal on click. Type: string */
      animation : '', /* Animation to run when the modal is triggered. Options: 'fade', 'slideDown' Type: string */
      animationDuration: 400, /* Speed of animations. 400 is the jQuery default. Type: int */
      offsetTop : '', /* The number of pixels the modal should be offset from the top of the browser window. Type: int */
      backdropId : 'modal-backdrop', /* The class name of the backdrop div. Type: string */
      backdropAnimation : false, /* Fades the backdrop in/out. Type: boolean */
      backdropAnimationDuration: 50, /* The speed of the backdrop animation. Type: int */
      backdropClose : true, /* If true, will close the modal when someone clicks outside of it. Type: boolean */
      escClose : true /* If true, will close the modal if the Esc key is pressed. Type: boolean */
    }, options);

    // Create the modal backdrop
    var backdrop = $('<div id="modal-backdrop" />').css({
      'height' : '100%',
      'left' : 0,
      'position' : 'fixed',
      'top' : 0,
      'width' : '100%',
      'z-index' : 100
    });

    if( settings.backdropAnimation ) {
      backdrop.css( { 'opacity' : 0 } );
    }

    function showBackdrop() {
      $('body').prepend( backdrop );

      if( settings.backdropAnimation ) {
        backdrop.animate( { opacity: 1 }, settings.backdropAnimationDuration );
      }
    }

    function removeBackdrop() {
      if( settings.backdropAnimation ) {
        backdrop.animate( { opacity: 0 }, settings.backdropAnimationDuration, function() {
          backdrop.remove();
        });
      } else {
        backdrop.remove();
      }
    }

    function positionModal ( modal ) {

      if ( settings.offsetTop !== '' && settings.offsetTop >= 0 ) {

        // Dynamically position the modal horizontally
        $(window).resize(function(){
          modal.css({
            left: ( $(window).width() - modal.outerWidth() )/2
          });
        });

      } else {

        // Dynamicalliy position the modal both horizontally and vertically
        $(window).resize(function(){
          modal.css({
            left: ( $(window).width() - modal.outerWidth() )/2,
            top: ( $(window).height() - modal.outerHeight() )/2
          });
        });

      }

      $(window).resize();
    }

    function showModal( modal ) {
      showBackdrop();

      // Give the modal only the necessary styles
      modal.css({
        'position' : 'absolute',
        'z-index' : 101
      });

      if( settings.animation === 'fade' ) {

        modal.fadeIn( settings.animationDuration );

      } else if( settings.animation === 'slideDown' ) {

        var topPosition = '';

        if ( settings.offsetTop !== '' && settings.offsetTop >= 0 ) {
          topPosition = settings.offsetTop;
        } else {
          topPosition = ( $(window).height() - modal.outerHeight() )/2;
        }

        // Display the modal, but hide it off the top of the browser window
        modal.css( { display: "block", opacity: 0, top: -modal.outerWidth() + "px" } );

        // Animate the top value so it will slide down
        modal.animate( { top: topPosition + "px", opacity: 1 }, settings.animationDuration );

      } else {

        modal.show();

      }

      // Position the modal relative to the browser window
      positionModal( modal );

    }

    function closeModal( modal ) {
      if( settings.animation === 'fade' ) {

        modal.fadeOut( settings.animationDuration, function(){
          removeBackdrop();
        });

      } else if( settings.animation === 'slideDown' ) {

        // Reverse the animation to slide it up
        // Calling stop() before the animation clears the animation queue and increase the (visual) performance of the animation.
        // Without this the backdrop appears to get stuck after opening and closing the modal a few times.
        // Source: http://www.learningjquery.com/2009/01/quick-tip-prevent-animation-queue-buildup
        modal.stop().animate( { top: -(modal.outerWidth() + ( $(window).height() - modal.outerHeight() )/2) + "px", opacity: 0 }, settings.animationDuration, function() {
          removeBackdrop();
          modal.hide();
        });

      } else {

        modal.hide();
        removeBackdrop();

      }
    }

    return this.each(function() {

      var $this = $(this);

      // Show the modal
      showModal( $this );

      // Clicking on the close element closes the modal
      $this.on('click', '.' + settings.closeModalClass, function( e ){
        e.preventDefault();
        closeModal( $this );
      });

      // Clicking on the backdrop closes the modal
      if( settings.backdropClose === true ) {
        backdrop.on('click', function() {
          closeModal( $this );
        });
      }

      // Pressing esc closes the modal
      if( settings.escClose === true ) {
        $('html').on( 'keyup', function( e ) {
          if( e.keyCode === 27 ) {
            closeModal( $this );
          }
        });
      }

    });

  };

  // Listen for clicks on elements with data-trigger-modal attribute
  $('[data-trigger-modal]').on('click', function( e ) {
    e.preventDefault();

    var modal = $(this).attr( 'data-trigger-modal' ),
        options = $(this).attr( 'data-modal-options' );

    // Turn JSON string into an object
    options = $.parseJSON( options );

    $('#' + modal).modal( options );
  });

})( jQuery );
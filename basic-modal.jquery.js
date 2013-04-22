(function( $ ) {

  "use strict";
  $.fn.modal = function( options ) {

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      closeModalClass : 'close-modal', /* The class name to give an element to close the modal on click. Type: String */
      animation : null, /* Animation to run when the modal is triggered. Options: 'fade', 'slideDown' Type: String */
      animationDuration: 400, /* Speed of the animation. Type: Number */
      offsetTop : null, /* The number of pixels the modal should be offset from the top of the browser window. Type: Nubmer */
      backdropId : 'modal-backdrop', /* The id name of the backdrop div. Type: String */
      backdropAnimation : false, /* If true, fades the backdrop in/out. Type: Boolean */
      backdropAnimationDuration: 50, /* The speed of the backdrop animation. Type: Number */
      backdropZindex: 100, /* The z-index value given to the backdrop. Type: Number */
      backdropClose : true, /* If true, will close the modal when someone clicks outside of it. Type: Boolean */
      escClose : true /* If true, will close the modal if the Esc key is pressed. Type: Boolean */
    }, options);

    // Create the modal backdrop
    var backdrop = $('<div id="modal-backdrop" />').css({
      'height' : '100%',
      'left' : 0,
      'position' : 'fixed',
      'top' : 0,
      'width' : '100%',
      'z-index' : settings.backdropZindex
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

      if ( settings.offsetTop !== null && settings.offsetTop >= 0 ) {

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
        'z-index' : parseInt(settings.backdropZindex) + 1
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
  $(document).on('click', '[data-trigger-modal]', function( event ) {
    event.preventDefault();

    var target = $(event.target),
        modal = target.attr( 'data-trigger-modal' ),
        options = target.attr( 'data-modal-options' );

    if( options ) {
      // Turn JSON string into an object
      options = $.parseJSON( options );
    }

    $('#' + modal).modal( options );
  });

})( jQuery );
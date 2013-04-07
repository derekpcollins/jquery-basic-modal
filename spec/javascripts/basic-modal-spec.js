describe('Basic Modal', function() {

  beforeEach(function() {
    loadFixtures('modal.html');
  });

  it('creates a div for the backdrop', function() {
    $('[data-trigger-modal]').click();
    expect( $('#modal-backdrop') ).toExist();
  });

  it('closes the modal if the backdrop is clicked', function() {
    $('[data-trigger-modal]').click();

    var modal = $('#my-modal'),
        backdrop = $('#modal-backdrop');
    
    expect( modal ).toBeVisible();
    expect( backdrop ).toExist();
    
    backdrop.click();
    
    expect( modal ).toBeHidden();
    expect( backdrop ).not.toExist();
  });

  it('closes the modal if the Esc key is pressed', function() {
    $('[data-trigger-modal]').click();

    var modal = $('#my-modal'),
        backdrop = $('#modal-backdrop');
    
    expect( modal ).toBeVisible();
    expect( backdrop ).toExist();

    // Source: http://jsfiddle.net/wbkm8/3/
    var escKey = $.Event('keyup', {
      keyCode: 27
    });

    $('body').trigger( escKey );

    expect( modal ).toBeHidden();
    expect( backdrop ).not.toExist();
  });

  it('closes the modal if the close-modal element is clicked', function() {
    $('[data-trigger-modal]').click();

    var modal = $('#my-modal'),
        backdrop = $('#modal-backdrop');
    
    expect( modal ).toBeVisible();
    expect( backdrop ).toExist();

    $('.close-modal').click();

    expect( modal ).toBeHidden();
    expect( backdrop ).not.toExist();
  });

  describe('Data Attribute Method', function() {

    it('shows the modal on click', function() {
      $('[data-trigger-modal]').click();
      expect( $('#my-modal') ).toBeVisible();
    });

  });

  describe('Programmatic Method', function() {

    beforeEach(function() {
      $('.trigger-modal').on('click', function( e ) {
        e.preventDefault();
        $('#my-modal').modal({
          animation : 'slideDown',
          offsetTop: 60,
          backdropAnimation : true,
          backdropAnimationDuration : 100
        }).css('border','6px solid #222');
      });
    });

    it('shows the modal on click', function() {
      $('.trigger-modal').click();
      expect( $('#my-modal') ).toBeVisible();
    });

  });

});
# Basic Modal jQuery Plugin

A jQuery plugin for creating basic modals.

## Usage

First, download and include `basic-modal.jquery.js` (or the minified version) in your HTML document:

```html
<script src="/path/to/basic-modal.jquery.js"></script>
```

Next, you'll need to create the HTML for your modal:

```html
<div id="my-modal" style="display: none;">
  <p>This is my modal content.</p>
  <a href="#" class="close-modal">Close</a>
</div>
```

You'll want to make sure that you set the containing element to `display: none;` so that it will be hidden by default. Optionally, you may want to include a way for people to close the modal (by default pressing the Esc key or clicking anywhere outside of the modal will close it). In the example above there is an anchor element with a class of `close-modal` that will close the modal on click.

Next, there are two ways that you can trigger the modal.

The first way is to add a `data-trigger-modal` attribute to the element you want to trigger the modal that contains the value of the ID of your modal element:

```html
<a href="#" data-trigger-modal="my-modal">Trigger modal</a>
```

The second way is to programatically trigger the modal with an event that you define:

```html
<a href="#"></a>
<script>
$(function() {

  $('a.trigger-modal').on('click', function( e ) {
    e.preventDefault();
    $('#my-modal').modal();
  });

});
</script>
```

In the above example we're triggering a modal with an id of `my-modal` when someone clicks on an anchor element with a class of `trigger-modal`.

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/).
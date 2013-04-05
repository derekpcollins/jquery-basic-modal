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
</div>
```

You'll want to make sure that you set the containing element to `display: none;` so that it will be hidden by default.

Next, there are two ways that you can trigger the modal.

The first way is to add a `data-trigger-modal` attribute to an element that, when clicked, will trigger a modal:

```html
<a href="#" data-trigger-modal="my-modal">Trigger modal</a>
```

In the above example, when someone clicks on the "Trigger modal" anchor element, it trigger a modal with an id of `my-modal`.

The second way is to programatically trigger the modal with an event that you define:

```html
<!-- The element we want to trigger the modal -->
<a href="#" class="trigger-modal">Trigger modal</a>

<!-- The jQuery code to programatically trigger the modal -->
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
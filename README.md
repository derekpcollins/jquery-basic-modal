# Basic Modal jQuery Plugin

A jQuery plugin for creating basic modals.

## Usage

First, download and include `basic-modal.jquery.js` (or the minified version) in your HTML document:

```html
<script src="/path/to/basic-modal.jquery.js"></script>
```

Next, create the HTML markup for your modal:

```html
<div id="my-modal" style="display: none;">
  <p>This is my modal content.</p>
</div>
```

Make sure to set the containing element to `display: none;` so it will be hidden by default.

### Triggering the modal

There are two ways to trigger the modal.

The first way is to add a `data-trigger-modal` attribute to an element that, when clicked, will trigger a modal:

```html
<a href="#" data-trigger-modal="my-modal">Trigger modal</a>
```

In the above example, when someone clicks on the "Trigger modal" anchor element, it will trigger the modal with an id of `my-modal`.

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

## Options

The following are user-configurable options. How you set these options depends on which method you're using to trigger your modals (see below for examples).

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Default Value</th>
      <th>Type</th>
      <th width="320">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>closeModalClass</code></td>
      <td>close-modal</td>
      <td>String</td>
      <td>The class name to give an element to close the modal on click.</td>
    </tr>
    <tr>
      <td><code>animation</code></td>
      <td><em>null</em></td>
      <td>String</td>
      <td>Animation to run when the modal is triggered. <strong>Options:</strong> 'fade' or 'slideDown'</td>
    </tr>
    <tr>
      <td><code>animationDuration</code></td>
      <td>400</td>
      <td>Number</td>
      <td>Speed of the animation.</td>
    </tr>
    <tr>
      <td><code>offsetTop</code></td>
      <td>null</td>
      <td>Number</td>
      <td>The number of pixels the modal should be offset from the top of the browser window. If no value is given, the modal will be centered vertically and horizontally.</td>
    </tr>
    <tr>
      <td><code>backdropId</code></td>
      <td>modal-backdrop</td>
      <td>String</td>
      <td>The id name of the backdrop div.</td>
    </tr>
    <tr>
      <td><code>backdropAnimation</cod></td>
      <td>false</td>
      <td>Boolean</td>
      <td>If true, fades the backdrop in/out.</td>
    </tr>
    <tr>
      <td><code>backdropAnimationDuration</code></td>
      <td>50</td>
      <td>Number</td>
      <td>The speed of the backdrop animation.</td>
    </tr>
    <tr>
      <td><code>backdropClose</code></td>
      <td>true</td>
      <td>Boolean</td>
      <td>If true, will close the modal when someone clicks outside of it.</td>
    </tr>
    <tr>
      <td><code>escClose</code></td>
      <td>true</td>
      <td>Boolean</td>
      <td>If true, will close the modal if the Esc key is pressed.</td>
    </tr>
  </tbody>
</table>

If you're using the `data-attribute-modal` method to trigger the modal, then you can set these options by passing a JSON array through a `data-modal-options` attribute on the same element:

```html
<a href="#" data-trigger-modal="my-modal" data-modal-options='{"closeModalClass":"exit", "animation":"fade", "animationSpeed":200}'>Trigger modal</a>
```

Please note that JSON arrays require the use of double-quotes, so you'll need to use single-quotes around the array.

If you're programatically triggering the modal, then you can pass the options to the `modal()` method:

```javascript
$('#my-modal').modal({
  animation : 'slideDown',
  offsetTop : 60,
  backdropAnimation : true,
  backdropAnimationDuration : 100
})
```

## Defaults & Styling the Modal

I've intentionally kept this plugin very basic -- I didn't want to imply too much in terms of HTML markup or style -- but there are some necessary defaults.

By default the resulting modal will be centered vertically and horizontally relative to the browser window. A backdrop is also created by default. The backdrop ensures that the modal will be shown on top of your content and provides a click area for dismissing the modal. There are no styles implied for the backdrop, so if you want to give it a background color, for example, then you'll need to style that in your CSS.

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/).
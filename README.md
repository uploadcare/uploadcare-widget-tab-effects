# Effects Tab for Uploadcare Widget

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=uploadcare-widget-tab-effects">
    <img align="right" width="150"
         src="https://ucarecdn.com/e0367a86-9787-44b1-bc94-878e18ae2928/"
         title="Uploadcare logo">
</a>

Effects Tab is a
[custom tab](https://uploadcare.com/tutorials/widget_customization/#tabs) 
for [Uploadcare Widget](https://uploadcare.com/documentation/widget/)
that replaces Preview Tab and adds image-editing capabilities
to the widget.

## Requirements

Since Effects Tab is a custom tab for Uploadcare Widget,
make sure to
[install the widget](https://uploadcare.com/documentation/widget/#install)
first. 

## Install

### CDN

You can either install this minification-enabled Effects Tab version:

```html
<script src="https://ucarecdn.com/libs/widget-tab-effects/1.0.0-alpha.5/uploadcare.tab-effects.min.js" charset="utf-8"></script>
```

Or that one, bundled version without minification:

```html
<script src="https://ucarecdn.com/libs/widget-tab-effects/1.0.0-alpha.5/uploadcare.tab-effects.js" charset="utf-8"></script>
```

## Usage

That's how you add Effects Tab to Uploadcare Widget:

```javascript
uploadcare.registerTab('preview', uploadcareTabEffects)
```

### Options

#### `effects`

Default: `crop,rotate,enhance,sharp,grayscale`
Type: `String|Array`

That's the main Effects Tab option allowing you to
choose the preferred set of enabled effects. It also
controls the order of effects in the tab.

`effects` can either be a string holding one or more
comma-separated effects or an array of strings (JS only.)

Available effects:

* `blur`, filtering images via Gaussian Blur
* `crop`, crops images freely or using set aspect ratios
* `enhance`, makes images look better via auto
  levels, auto contrast, and saturation sharpening
* `flip`, allows you to flip uploaded images
* `grayscale`, desaturates uploaded images
* `mirror`, provides image-mirroring capabilities
* `rotate`, rotates uploaded images
* `sharp`, allows you to adjust image sharpness

### Configuration

#### Global settings

```html
<script>
  UPLOADCARE_EFFECTS = 'blur,sharp,grayscale';
</script>
```

or

```html
<script>
  UPLOADCARE_EFFECTS = ['blur', 'sharp', 'grayscale'];
</script>
```

#### Local attributes

```html
<input type="hidden" role="uploadcare-uploader"
  data-effects="blur,sharp,grayscale"
/>
```

#### Settings object

```javascript
uploadcare.start({
  effects: 'blur,sharp,grayscale',
});
```

or

```javascript
uploadcare.start({
  effects: ['blur', 'sharp', 'grayscale'],
});
```

## Localization

It’s possible your locale is not available in the tab yet. 
If that’s the case, contributing your locale might be a good idea. 
This can be done by forking the
[main repository](https://github.com/uploadcare/uploadcare-widget-tab-effects) 
followed by adding a new localization file 
[here](https://github.com/uploadcare/uploadcare-widget-tab-effects/tree/master/src/locale).

## Contributors

* [@Zmoki](https://github.com/Zmoki)
* [@ZNick1982](https://github.com/ZNick1982)

## Security issues

If you think you ran into something about Effects Tab
which might have security implications, please hit us up at
[bugbounty@uploadcare.com](mailto:bugbounty@uploadcare.com)
or Hackerone.

We'll contact you personally in a short time to fix an issue
through co-op and prior to any public disclosure.

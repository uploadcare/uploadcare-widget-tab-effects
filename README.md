# Effects Tab for Uploadcare Widget

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=uploadcare-widget-tab-effects">
    <img align="right" width="150"
         src="https://ucarecdn.com/e0367a86-9787-44b1-bc94-878e18ae2928/"
         title="Uploadcare logo">
</a>

Effects Tab is a
[custom tab](https://uploadcare.com/documentation/javascript_api/#custom-tabs) 
for [Uploadcare Widget](https://uploadcare.com/documentation/widget/)
that replaces Preview Tab and adds image-editing capabilities
to the widget.

See **demo** [here](https://uploadcare.github.io/uploadcare-widget-tab-effects/).

## Output value

Output value will be CDN link to an image with applying CDN operations based on that user choose while editing.

For example, if user choose grayscale and click on rotate once, output value:

```
https://ucarecdn.com/:UUID/-/preview/-/grayscale/-/rotate/270/
```

## Requirements

Since Effects Tab is a custom tab for Uploadcare Widget,
make sure to
[install the widget](https://uploadcare.com/documentation/widget/#install)
first. 

## Install

### NPM

```
npm i uploadcare-widget-tab-effects --save
```

Import Effects Tab in your module,

```javascript
import uploadcareTabEffects from 'uploadcare-widget-tab-effects'
```

### CDN

You can either install this minification-enabled Effects Tab version:

```html
<script src="https://ucarecdn.com/libs/widget-tab-effects/1.x/uploadcare.tab-effects.min.js" charset="utf-8"></script>
```

Or that one, bundled version without minification:

```html
<script src="https://ucarecdn.com/libs/widget-tab-effects/1.x/uploadcare.tab-effects.js" charset="utf-8"></script>
```

## Usage

That's how you add Effects Tab to Uploadcare Widget:

```javascript
uploadcare.registerTab('preview', uploadcareTabEffects)
```

## Configuration

### Global variables

```html
<script>
  UPLOADCARE_EFFECTS = 'blur,sharp,grayscale'
</script>
```

or

```html
<script>
  UPLOADCARE_EFFECTS = ['blur', 'sharp', 'grayscale']
</script>
```

### Local attributes

```html
<input type="hidden" role="uploadcare-uploader" name="content"
  data-effects="blur,sharp,grayscale"
/>
```

### Settings object

```javascript
uploadcare.start({
  effects: 'blur,sharp,grayscale',
})
```

or

```javascript
uploadcare.start({
  effects: ['blur', 'sharp', 'grayscale'],
})
```

## Options

### Effects `string|array`

Global: `UPLOADCARE_EFFECTS` <br>
Local: `data-effects` <br>
Object key: `effects` <br>

Default value is `crop,rotate,enhance,sharp,grayscale`.

Allowing you to choose the preferred set of enabled effects.
It also controls **the order of effects** in the tab (but, `crop` always at first).

`effects` can either be a string holding one or more
comma-separated effects or an array of strings (JS only.)

Available effects:

* `crop` — crops images freely or using set aspect ratios
* `rotate` — rotates uploaded images
* `mirror` — provides image-mirroring capabilities
* `flip` — allows you to flip uploaded images
* `blur` — filtering images via Gaussian Blur
* `sharp` — allows you to adjust image sharpness
* `enhance` — makes images look better via auto
  levels, auto contrast, and saturation sharpening
* `grayscale` — desaturates uploaded images

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

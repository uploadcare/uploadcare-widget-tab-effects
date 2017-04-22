# uploadcare-widget-tab-effects

This is [custom tab](https://uploadcare.com/tutorials/widget_customization/#tabs) 
for [Uploadcare Widget](https://uploadcare.com/documentation/widget/)
which replace preview tab and add editor for uploaded images.

## Requirements

You should also install 
[Uploadcare Widget](https://uploadcare.com/documentation/widget/#install).

## Install

### CDN

```html
<script src="https://ucarecdn.com/libs/widget-tab-effects/1.0.0-alpha/uploadcare.tab-effects.min.js" charset="utf-8"></script>
```

Or bundle without minification,

```html
<script src="https://ucarecdn.com/libs/widget-tab-effects/1.0.0-alpha/uploadcare.tab-effects.js" charset="utf-8"></script>
```

## Usage

```javascript
uploadcare.registerTab('preview', uploadcareTabEffects)
```

### Options

#### `effects`

Default: `crop,rotate,enhance,sharp,grayscale`
Type: `String|Array`

Allow you to choose effects and adjust the order of effects on the tab.
Must be a string holding one or more comma-separated effects 
or array (in javascript only) of strings.

Available effects:

* `blur`
* `crop`
* `enhance`
* `flip`
* `grayscale`
* `mirror`
* `rotate`
* `sharp`

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

It’s possible that your locale is not available in the tab yet. 
If that’s the case, contributing your locale might be a good idea. 
This can be done by forking the [main repository](https://github.com/uploadcare/uploadcare-widget-tab-effects) 
and adding a localization file 
[here](https://github.com/uploadcare/uploadcare-widget-tab-effects/tree/master/src/locale).

## Contributors

* [@Zmoki](https://github.com/Zmoki)
* [@ZNick1982](https://github.com/ZNick1982)

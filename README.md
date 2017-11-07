# Effects Tab for Uploadcare Widget

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=uploadcare-widget-tab-effects">
    <img align="right" width="64" height="64"
         src="https://ucarecdn.com/2f4864b7-ed0e-4411-965b-8148623aa680/uploadcare-logo-mark.svg"
         alt="">
</a>

Effects Tab is a [custom tab][uc-custom-tabs] for [Uploadcare Widget][uc-widget]
that replaces Preview Tab and adds image-editing capabilities to the widget.

[![NPM version][npm-img]][npm-link] [![Uploadcare stack on StackShare][stack-img]][stack]

[npm-img]: http://img.shields.io/npm/v/uploadcare-widget-tab-effects.svg
[npm-link]: https://www.npmjs.org/package/uploadcare-widget-tab-effects
[stack-img]: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
[stack]: https://stackshare.io/uploadcare/stacks/

<a href="https://uploadcare.github.io/uploadcare-widget-tab-effects/" title="See Effects Tab in action with demo">
  <img src="https://ucarecdn.com/de487341-9107-4e29-b89f-174ba3ddaf95/uploadcare-widget-effects-tab.gif"
       width="888" alt="">
</a>

Effects Tab provides 8 effects for on-the-fly image editing on upload:
crop, rotate, mirror, flip, blur, sharpen, enhance, and grayscale.
You can customize which effects are allowed and otherwise affect the tab behavior.

* [How it works](#how-it-works)
* [Requirements](#requirements)
* [Install](#install)
* [Usage](#usage)
* [Configuration](#configuration)
* [Options](#options)
* [Localization](#localization)

## How it works

Image operations provided by Effects Tab are based on the capabilities of our [CDN API][uc-cdn].
The tab outputs a CDN link holding your image [UUID][uc-uuid] and
[image operations][uc-cdn-image-operations] applied by a user during the in-tab editing process.
Technically, every original image is firstly uploaded to our CDN and then shown
to a user in Effects Tab.
In case of uploading [multiple files][uc-multi-upload], this happens asynchronously.

For example, if a user chose to apply `grayscale` and clicked `rotate` once,
this is how the output value looks like:

```
https://ucarecdn.com/:UUID/-/preview/-/grayscale/-/rotate/270/
```

You will always have the `preview` operation in Effects Tab output URL due to
CDN API [limitations][uc-cdn-limits].

## Requirements

Since Effects Tab is a [custom tab][uc-custom-tabs] for Uploadcare Widget,
make sure to start with [installing the widget][uc-widget-install].

## Install

You’re free to choose from the install methods listed below.

### NPM

Get Effects Tab:

```
npm i uploadcare-widget-tab-effects --save
```

And then import it in your module:

```javascript
import uploadcareTabEffects from 'uploadcare-widget-tab-effects'
```

### CDN

You can either install this minification-enabled Effects Tab version:

```html
<script src="https://ucarecdn.com/libs/widget-tab-effects/1.x/uploadcare.tab-effects.min.js" charset="utf-8"></script>
```

Or a bundled version without minification:

```html
<script src="https://ucarecdn.com/libs/widget-tab-effects/1.x/uploadcare.tab-effects.js" charset="utf-8"></script>
```

## Usage

That’s how you add Effects Tab to the widget:

```javascript
uploadcare.registerTab('preview', uploadcareTabEffects)
```

## Configuration

This section describes different ways to set which effects are allowed
in the Effects Tab.

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

Default value: `crop,rotate,enhance,sharp,grayscale`.

This allows you to configure the set of enabled effects.
It also controls **the order of effects** in the tab:
however, `crop` is always the first in the set.

`effects` can either be a string holding one or more
comma-separated effects or an array of strings (JS only).

Available effects:

* `crop` — crops images freely or using set aspect ratios
* `rotate` — rotates images
* `mirror` — provides image-mirroring capabilities
* `flip` — allows flipping images
* `blur` — filters images via Gaussian Blur
* `sharp` — allows adjusting image sharpness
* `enhance` — makes images look better via auto
  levels, auto contrast, and saturation sharpening
* `grayscale` — desaturates images

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


[uc-widget]: https://uploadcare.com/documentation/widget/
[uc-widget-install]: https://uploadcare.com/documentation/widget/#install
[uc-custom-tabs]: https://uploadcare.com/documentation/javascript_api/#custom-tabs
[uc-cdn]: https://uploadcare.com/documentation/cdn/
[uc-cdn-image-operations]: https://uploadcare.com/documentation/cdn/#image-operations
[uc-cdn-limits]: https://uploadcare.com/documentation/cdn/#limits
[uc-uuid]: https://uploadcare.com/documentation/#how-uc-works
[uc-multi-upload]: https://uploadcare.com/tutorials/multi-upload/

# Effects Tab for Uploadcare Widget

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=uploadcare-widget-tab-effects">
    <img align="right" width="64" height="64"
         src="https://ucarecdn.com/2f4864b7-ed0e-4411-965b-8148623aa680/uploadcare-logo-mark.svg"
         alt="">
</a>

Effects Tab is a [custom tab][uc-custom-tabs] for [Uploadcare Widget][uc-widget]
that replaces Preview Tab and adds image-editing capabilities to the widget.

[![NPM version][npm-img]][npm-link] [![Uploadcare stack on StackShare][stack-img]][stack]&nbsp;
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)

[npm-img]: http://img.shields.io/npm/v/uploadcare-widget-tab-effects.svg
[npm-link]: https://www.npmjs.org/package/uploadcare-widget-tab-effects
[stack-img]: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
[stack]: https://stackshare.io/uploadcare/stacks/

<p>
  <a href="https://uploadcare.github.io/uploadcare-widget-tab-effects/" title="See Effects Tab in action with demo">
    <img src="https://ucarecdn.com/c04e8231-3c79-43ca-a122-285b8573d1f8/uploadcare-widget-effects-tab.gif"
        width="888" alt="">
  </a>
</p>

Effects Tab provides 9 effects for on-the-fly image editing on upload:
crop, rotate, mirror, flip, blur, sharpen, enhance, grayscale and invert.
You can customize which effects are allowed and otherwise affect the tab behavior.

* [Demo](https://uploadcare.github.io/uploadcare-widget-tab-effects/)
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
You can also enable all effects by setting the option to `all`.

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
* `invert` — inverts image colors

## Localization

It’s possible your locale is not available in the tab yet.
If that’s the case, contributing your locale might be a good idea.
This can be done by forking the
[main repository](https://github.com/uploadcare/uploadcare-widget-tab-effects)
followed by adding a new localization file
[here](https://github.com/uploadcare/uploadcare-widget-tab-effects/tree/master/src/locale).

## Security issues

If you think you ran into something about Effects Tab
which might have security implications, please hit us up at
[bugbounty@uploadcare.com](mailto:bugbounty@uploadcare.com)
or Hackerone.

We'll contact you personally in a short time to fix an issue
through co-op and prior to any public disclosure.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/948688?v=4" width="100px;"/><br /><sub><b>Zarema Khalilova</b></sub>](https://twitter.com/Zmoki)<br />[💻](https://github.com/uploadcare/uploadcare-widget-tab-effects/commits?author=Zmoki "Code") [💬](#question-Zmoki "Answering Questions") [📖](https://github.com/uploadcare/uploadcare-widget-tab-effects/commits?author=Zmoki "Documentation") [💡](#example-Zmoki "Examples") [🤔](#ideas-Zmoki "Ideas, Planning, & Feedback") [👀](#review-Zmoki "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/5286366?v=4" width="100px;"/><br /><sub><b>Nikolay</b></sub>](https://github.com/ZNick1982)<br />[💻](https://github.com/uploadcare/uploadcare-widget-tab-effects/commits?author=ZNick1982 "Code") | [<img src="https://avatars1.githubusercontent.com/u/1747220?v=4" width="100px;"/><br /><sub><b>Siarhei Bautrukevich</b></sub>](https://bautrukevich.com)<br />[💻](https://github.com/uploadcare/uploadcare-widget-tab-effects/commits?author=bautrukevich "Code") [📖](https://github.com/uploadcare/uploadcare-widget-tab-effects/commits?author=bautrukevich "Documentation") [💡](#example-bautrukevich "Examples") [👀](#review-bautrukevich "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/670959?v=4" width="100px;"/><br /><sub><b>Aleksandr Grenishin</b></sub>](https://github.com/nd0ut)<br />[💻](https://github.com/uploadcare/uploadcare-widget-tab-effects/commits?author=nd0ut "Code") [👀](#review-nd0ut "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/22449102?v=4" width="100px;"/><br /><sub><b>Elijah</b></sub>](https://github.com/dayton1987)<br />[📖](https://github.com/uploadcare/uploadcare-widget-tab-effects/commits?author=dayton1987 "Documentation") [👀](#review-dayton1987 "Reviewed Pull Requests") |
| :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->


[uc-widget]: https://uploadcare.com/docs/uploads/widget/
[uc-widget-install]: https://uploadcare.com/docs/uploads/widget/install/
[uc-custom-tabs]: https://uploadcare.com/docs/uploads/widget/custom_tabs/
[uc-cdn]: https://uploadcare.com/docs/delivery/
[uc-cdn-image-operations]: https://uploadcare.com/docs/processing/image/
[uc-cdn-limits]: https://uploadcare.com/docs/processing/image/limits/
[uc-uuid]: https://uploadcare.com/docs/concepts/#cdn
[uc-multi-upload]: https://uploadcare.com/docs/uploads/widget/multi_upload/

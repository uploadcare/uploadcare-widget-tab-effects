# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 1.1.0 - 2018-04-20

### Fixed

* Global setting `UPLOADCARE_EFFECTS` works now.
* Fixed ignoring of the `crop` preset in multiple mode.
* Crop is applied automatically if
  the `crop` setting has presets, e.g. `1:1`, and hasn't `free`.
* Show an image without all effects in the crop mode.

### Added

* New effect `invert`.
* New option `all` for effects settings.

## 1.0.3 - 2017-08-23

### Fixed
* Fix links to uploadcare site in README.

## 1.0.2 - 2017-08-21

### Added
* Uploadcare logo into README.

## 1.0.1 - 2017-08-21
Initial public release for npm.

### Fixed
* Fix info about version in README.

### Added
* README section about install with npm.
* README section about output value.

## 1.0.0 - 2017-08-21
Initial public release.

### Added
* The `uploadcareTabEffects` function as default export.
* README with info about requirements, install, usage, etc.

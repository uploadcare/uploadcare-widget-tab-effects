import PreviewView from './views/previewView';
import EffectsModel from './models/effectsModel';
import LocaleBuilder from './tools/localeBuilder';

function uploadcareTabEffects(container, button, dialogApi, settings) {
	if (typeof uploadcare === 'undefined') {
		throw new ReferenceError('uploadcare is not defined');
	}

	uploadcare.plugin(function(uc) {
		if (settings.multiple) {
			return new uc.widget.tabs.PreviewTabMultiple(container, button, dialogApi, settings, name)
		}

		const PreviewTab = uc.widget.tabs.PreviewTab

		const __hasProp = Object.prototype.hasOwnProperty
		const __extends = function(child, parent) {
			for (let key in parent) {
				if (__hasProp.call(parent, key)) {
					child[key] = parent[key]
				}
			}
			function ctor() {
				this.constructor = child
			}

			ctor.prototype = parent.prototype
			child.prototype = new ctor()
			child.__super__ = parent.prototype
			return child
		}

		const EffectsPreviewTab = (function() {
			__extends(EffectsPreviewTab, PreviewTab)

			function EffectsPreviewTab(container, button, dialogApi, settings, name) {
				EffectsPreviewTab.__super__.constructor.call(this, container, button, dialogApi, settings, name)
			}

			EffectsPreviewTab.prototype.__setState = function(state, data) {
				if (state === 'image') {
					if(data.info) {
						const localeBuilder = new LocaleBuilder();
						localeBuilder.build(uc.locale.translations);
						uc.locale.rebuild();

						const model = new EffectsModel(
							'ucarecdn.com/',
							data.info.originalImageInfo.width,
							data.info.originalImageInfo.height,
							uc.locale);
						model.parseUrl(data.info.cdnUrl);

						let previewView = new PreviewView(container, model);
						previewView
							.render()
							.then(type => {
								const newFile = this.file.then((info) => {
									info.cdnUrlModifiers = model.getModifiers() + model.getPreviewModifiers()
									info.cdnUrl = model.getPreviewUrl()
									// info.crop = coords
									return info
								})

								dialogApi.fileColl.replace(this.file, newFile)
							});
					}
				}
				else {
					EffectsPreviewTab.__super__.__setState.call(this, state, data)
				}
			}

			EffectsPreviewTab.prototype.initImage = function(imgSize, cdnModifiers) {
				console.log('this is image!')
			}

			return EffectsPreviewTab
		})()

		return new EffectsPreviewTab(container, button, dialogApi, settings, name)
	})
}

module.exports = uploadcareTabEffects

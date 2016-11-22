import PreviewView from './views/previewView';
import EffectsModel from './models/effectsModel';
import LocaleBuilder from './tools/localeBuilder';

function effectsTab(container, button, dialogApi, settings) {

// getting first image for preview;
  let isFileTaken = false;
  const $ = uploadcare.jQuery;

  const fileResolver = function (fileInfo) {
    if (isFileTaken) {
      return;
    }

    if (fileInfo.isImage) {
      isFileTaken = true;
    }
    
    uploadcare.plugin(function(uc) {
      const localeBuilder = new LocaleBuilder();
      localeBuilder.build(uc.locale.translations);
      uc.locale.rebuild();

      const model = new EffectsModel(
        'ucarecdn.com/', 
        fileInfo.originalImageInfo.width, 
        fileInfo.originalImageInfo.height, 
        uc.locale);
      model.parseUrl(fileInfo.cdnUrl);
      
      let previewView = new PreviewView(container, model);
      previewView
        .render()
        .then(type => {
          fileInfo.cdnUrl = model.getPreviewUrl();
          dialogApi.resolve();
        });
    });
  }

  dialogApi.fileColl.onAdd.add((promise, i) => {
    promise.then(fileResolver);
  });
  let filePromises = dialogApi.fileColl.get();

  filePromises.forEach((promise, i) => {
    promise.then(fileResolver);
  });
}

export default function uploadcareTabEffects() {
  if(!uploadcare)
    throw Error('uploadcare widget not loaded');
  uploadcare.registerTab('preview', effectsTab);  
}

global.uploadcareTabEffects = uploadcareTabEffects;
 
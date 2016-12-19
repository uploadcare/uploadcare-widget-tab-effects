import PreviewView from './views/previewView';
import EffectsModel from './models/effectsModel';
import LocaleBuilder from './tools/localeBuilder';

const ucCdn = 'ucarecdn.com/';

function effectsTab(container, button, dialogApi, settings) {

// getting first image for preview;
  let isFileTaken = false;
  const $ = uploadcare.jQuery;
  let Circle = null;
  uploadcare.plugin(uc => {
    Circle = uc.ui.progress.Circle;
  });

  setupProgress(Circle, $, button, dialogApi);
  dialogApi.fileColl.onAdd.add((promise, i) => {
    promise.then(fileAddResolver);
  });

  let filePromises = dialogApi.fileColl.get();
  filePromises.forEach((promise, i) => {
    promise.then(fileEditResolver);
  });

  function fileAddResolver(fileInfo) {

    if (isFileTaken) {
      return;
    }

    if (fileInfo.isImage) {
      isFileTaken = true;
    }

    if (!fileInfo.isImage) {
      return dialogApi.resolve();
    }
    fileResolver(fileInfo);
  }

  function fileEditResolver(fileInfo) {
    
    if (!fileInfo.isImage) {
      setTimeout(() => dialogApi.hideTab('preview'), 0);
      return;
    }
    fileResolver(fileInfo);
  }

  function fileResolver(fileInfo) {

    uploadcare.plugin(function(uc) {
      const localeBuilder = new LocaleBuilder();
      localeBuilder.build(uc.locale.translations);
      uc.locale.rebuild();

      const model = new EffectsModel(
        ucCdn, 
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

}

function setupProgress(Circle, $, button, dialogApi) {

  const circleEl = $('<div class="uploadcare--dialog__icon">').appendTo(button);
  const circleDf = $.Deferred()

  function update() {
    const infos = dialogApi.fileColl.lastProgresses();
    let progress = 0;
    infos.forEach( progressInfo => {
      progress += (progressInfo ? progressInfo.progress : 0) / infos.length;
      circleDf.notify(progress);
    });
  }

  dialogApi.fileColl.onAnyProgress(update);
  dialogApi.fileColl.onAdd.add(update);
  dialogApi.fileColl.onRemove.add(update);
  update();

  let circle = new Circle(circleEl).listen(circleDf.promise());
  dialogApi.progress(circle.update);

}

export default function uploadcareTabEffects() {
  if(!uploadcare)
    throw Error('uploadcare widget not loaded');
  uploadcare.registerTab('preview', effectsTab);  
}

global.uploadcareTabEffects = uploadcareTabEffects;


 
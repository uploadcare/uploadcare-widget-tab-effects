import PreviewView from './views/previewView';
import EffectsModel from './models/effectsModel';

function effectsTab(container, button, dialogApi, settings) {

// getting first image for preview;
  let isFileTaken = false;

  const fileResolver = function (fileInfo) {
    if (isFileTaken) {
      return;
    }

    if (fileInfo.isImage) {
      isFileTaken = true;
    }
    
    let model = new EffectsModel('ucarecdn.com/', fileInfo.originalImageInfo.width, fileInfo.originalImageInfo.height);
    model.parseUrl(fileInfo.cdnUrl);
    let previewView = new PreviewView(container, model);
    previewView
      .render()
      .then(type => {
        fileInfo.cdnUrl = model.getPreviewUrl();
        dialogApi.resolve();
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
 
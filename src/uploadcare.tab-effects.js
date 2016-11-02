import PreviewView from './views/previewView';
import EffectsModel from './models/effectsModel';

function effectsTab(container, button, dialogApi, settings) {

  let filePromises = dialogApi.fileColl.get();
// getting first image for preview;
  let isFileTaken = false; 

  filePromises.forEach((promise, i) => {
    promise.then((fileInfo) => {
      
      if(isFileTaken) {
        return; 
      }

      if(fileInfo.isImage) {
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
    });
  });
}

export default function uploadcareTabEffects() {
  if(!uploadcare)
    throw Error('uploadcare widget not loaded');
  uploadcare.registerTab('preview', effectsTab);  
}

global.uploadcareTabEffects = uploadcareTabEffects;
 
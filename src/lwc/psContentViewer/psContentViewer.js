import {LightningElement, api} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getRecordContent
  from '@salesforce/apex/PSContentViewerController.getRecordContent';

export default class PsContentViewer extends LightningElement {
  @api recordId;
  @api height;
  docId;
  docType;
  docURL;
  currIndex = 0;
  totalCount = 0;
  content;

  get typeOfDocument() {
    return !this.isImage(this.docType);
  }

  get typeOfImage() {
    return this.isImage(this.docType);
  }

  isImage(docType) {
    return (docType == 'JPG' || docType == 'JPEG' || docType == 'PNG' || docType == 'TIFF' || docType == 'TIF' || docType == 'GIF') ? true : false;
  }

  connectedCallback () {
    var self = this;

    getRecordContent ({recordId: self.recordId})
      .then (result => {
        console.log ('content=' + result);
        self.content = JSON.parse(result);

        var i = 1;
        self.content.forEach(function(item, index) {
           item.label = item.title + ' [' + item.lastModDate + ']';
           item.value = item.id;
           item.index = i++;
        });

        self.totalCount = self.content.length;

      })
      .catch (error => {
        self.handleError (error);
      });
  }

  get heightStyle() {
    return 'height:' + this.height;
  }

  onLeftClick () {
    console.log ('on left click...');
    if (this.currIndex > 1)
    {
        this.setIndex(this.currIndex - 1);
    }
  }

  onRightClick () {
    console.log ('on right click...');
    if (this.currIndex < this.totalCount)
    {
        this.setIndex(this.currIndex + 1);
    }
  }

  setIndex(targetIndex) {
    var self = this;

    self.content.forEach(function(item, index) {
        if (item.index == targetIndex)
        {
          self.docId = item.id;
          self.docType = item.fileType;
          self.currIndex = item.index;
          self.docURL = '/sfc/servlet.shepherd/version/download/' + item.versionId;
        }
     });
  }

  handleFileChange(event) {
    console.log('selfile=' + JSON.stringify(event.detail.value));
    var self = this;
    
    this.content.forEach(function(item, index) {
        if (item.id == event.detail.value)
        {
          self.docId = item.id;
          self.docType = item.fileType;
          self.currIndex = item.index;
          self.docURL = '/sfc/servlet.shepherd/version/download/' + item.versionId;
        }
     });
  }

  handleError (err) {
    console.log ('error=' + err);
    console.log ('type=' + typeof err);

    this.showSpinner = false;

    const event = new ShowToastEvent ({
      title: err.statusText,
      message: err.body.message,
      variant: 'error',
      mode: 'pester',
    });
    this.dispatchEvent (event);
  }
}
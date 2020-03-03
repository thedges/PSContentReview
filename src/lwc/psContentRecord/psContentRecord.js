import {LightningElement, api, track} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getRecordInfo
  from '@salesforce/apex/PSContentRecordController.getRecordInfo';

export default class PsContentRecord extends LightningElement {
  @api recordId;
  @api contentParentField;
  @api editFields;
  @api height = '700px';
  @api columns = 1;
  @api objectName;
  @track ready = false;
  @api contentSide = 'Right';
  contentParentId;
  recordTypeId;

  get contentRight() {
    return (this.contentSide == 'Right' ? true : false);
  }

  get contentLeft() {
    return (this.contentSide == 'Left' ? true : false);
  }

  connectedCallback () {
    var self = this;

    var side = this.retrieveContentSide();
    console.log('side=' + side);
    if (side != null)
    {
      this.contentSide = side;
    }

    if (!this.height.includes ('px')) this.height = this.height + 'px';

    console.log('contentParentField=' + this.contentParentField);

    if (this.recordId != null)
    {
    getRecordInfo ({recordId: self.recordId, contentParentField: this.contentParentField})
      .then (result => {
        console.log ('recordInfo=' + result);
        var recDetails = JSON.parse(result);
        self.objectName = recDetails.objectName; 
        self.recordTypeId = recDetails.recordTypeId; 
        self.contentParentId = recDetails.contentParentId; 
        self.ready = true;
      })
      .catch (error => {
        self.handleError (error);
      });
    }
  }

  storeContentSide(side) {
    localStorage.setItem('flipSide', side);
  }

  retrieveContentSide() {
    var side = localStorage.getItem('flipSide');
    return side;
  }

  flipContent(event) {
    console.log('flip event received');
    if (this.contentSide == 'Right')
    {
      this.contentSide = 'Left';

    }
    else
    {
      this.contentSide = 'Right';
    }

    this.storeContentSide(this.contentSide);
  }

  renderedCallback () {
      console.log('renderedCallback...');
  }

  handleError (err) {
    console.log ('error=' + JSON.stringify(err));
    console.log ('type=' + typeof err);


    const event = new ShowToastEvent ({
      title: err.statusText,
      message: err.body.message,
      variant: 'error',
      mode: 'pester',
    });
    this.dispatchEvent (event);
  }
}
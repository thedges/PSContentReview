import {LightningElement, api} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getRecordInfo
  from '@salesforce/apex/PSContentRecordController.getRecordInfo';

export default class PsContentRecord extends LightningElement {
  @api recordId;
  @api contentParentField;
  @api editFields;
  @api height = '700px';
  @api columns = 1;
  objectName;
  contentParentId;

  connectedCallback () {
    var self = this;

    if (!this.height.includes ('px')) this.height = this.height + 'px';

    console.log('contentParentField=' + this.contentParentField);

    getRecordInfo ({recordId: self.recordId, contentParentField: this.contentParentField})
      .then (result => {
        console.log ('recordInfo=' + result);
        var recDetails = JSON.parse(result);
        self.contentParentId = recDetails.contentParentId; 
        self.objectName = recDetails.objectName; 
      })
      .catch (error => {
        self.handleError (error);
      });
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
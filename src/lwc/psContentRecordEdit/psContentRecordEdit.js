import { LightningElement, api } from 'lwc';

export default class PsContentRecordEdit extends LightningElement {
    @api recordId;
    @api height;
    @api editFields;
    @api columns;
    @api objectName;
    @api recordTypeId;
    fields;

    connectedCallback () {
        if (this.editFields != null) this.fields = this.editFields.split(',');
    }

    get fieldsDefined() {
        return (this.fields != null) ? true : false;
    }

    get fieldsNotDefined() {
        return (this.fields == null) ? true : false;
    }

    get heightStyle() {
        return 'height:' + this.height;
    }
}
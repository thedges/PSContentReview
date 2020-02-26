# PSContentReview
THIS SOFTWARE IS COVERED BY [THIS DISCLAIMER](https://raw.githubusercontent.com/thedges/Disclaimer/master/disclaimer.txt).

This package contains a Lightning component to provide split-screen/side-by-side capability to edit record and review all related documents at once. This was developed for demo to show how a medical examiner could review all patient documents and update record data as the documents are reviewed. Could be used for any other use case where agent/examiner/case worker needs to browse through related record documents and update record fields.

![alt text](https://github.com/thedges/PSContentReview/blob/master/PSContentReview.gif "PSContentReview")

This component works in following way:
* Agent/examiner/case worker would use quick action on record page to launch the component.
* The component loads, provides record edit fields on left and option to navigate through all related documents on the right.
* Document navigation can be done by drop-down list to view a specific document or left/right arrow buttons to sequentially move through the documents.
* Once the record has been updated, the modal can be closed and you are placed back on the original record.

Here are the configuration options for the component:

| Parameter  | Definition |
| ------------- | ------------- |
| Height  | The height (in pixels) of the component.  |
| Columns  | Number of columns for the fields to show in left-side record edit form. |
| Edit Fields  | [Optional] A command separated list of field API names to show in the record edit form. |
| Content Parent Field  | [Optional] The API name of the field that stores the record to show all related content documents. If left blank, it defaults to the current record. You can provide a value that references a field on a parent related record (for example: if you are on case record and you want to reference account documents, you could put "Contact.AccountId" as the value and it will pull all documents related to the Account. |


# Quick Action Setup
As shown in the video, this component is probably best used as a quick action. The gotcha is that quick actions do not provide an option to configure the component for your needs. So...one must create a simple Aura Lightning Component wrapper around the main Lightning Web Component (quick actions currently only support Aura components). In this Aura wrapper is where you provide your component configuration parameters. 

In Developer Console, create an Aura Lightning Component and provide it whatever name that makes sense for your use case. In the component's ".cmp" file, enter code like the following:
```
<aura:component implements="force:lightningQuickActionWithoutHeader,force:hasRecordId" access="global">
    <aura:attribute name="recordId" type="String" />

    <aura:html tag="style">
        .slds-modal__container{
        height : auto;
        width: 90%;
        max-width: 90%;
        }
    </aura:html>

    <c:psContentRecord recordId="{!v.recordId}" 
        height="920px" 
        columns="1" 
        contentParentField="Contact__r.AccountId"
        editFields="PaymentStatus__c,Amount__c,Program_Prescription__c,Contact__c,Program_Explanation__c"></c:psContentRecord>
</aura:component>
```

The only areas you need to adjust/edit are near the bottom where you provide __height__, __columns__, __contentParentField__, and __editFields__ values. Reminder that only __height__ and __columns__ are required.

Once the Aura component above is created and saved, next create a Quick Action on the object you will use the quick action on. Here is example of Quick Action configuration screen

![alt text](https://github.com/thedges/PSContentReview/blob/master/PSContentReviewQA.gif "PSContentReviewQA")

Lastly, add the Quick Action to your record page layout.

# Setup Instructions
Here are steps to setup and configure this component:
  * Install the component per the "Deploy to Salesforce" button below. 
    - If installing the quick action (see above), add the quick action to your record page layout.
    - Else you can drag the PSContentRecord Lightning Component on a record page...on the main page, in a tab, etc... This component wants a wide amount of screen area so quick action may be best choice.
  * If you are using the component directly on a page, configure the component properties: Height, Columns, EditFields, Content Parent Field
  * That is it...now use either the Quick Action or Lightning Component depending on your choice of setup.

# Installation Instructions
Click below button to install this package:

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>


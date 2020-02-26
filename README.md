# PSContentReview
THIS SOFTWARE IS COVERED BY [THIS DISCLAIMER](https://raw.githubusercontent.com/thedges/Disclaimer/master/disclaimer.txt).

This package contains a Lightning component to provide split-screen/side-by-side capability to edit record and review all related documents at once. This was developed for demo to show how a medical examiner could review all patient documents and update record data as the documents are reviewed. Could be used for any other use case where agent/examiner/case worker needs to browse through related record documents and update record fields.

![alt text](https://github.com/thedges/PSContentReview/blob/master/PSContentReview.gif "PSContentReview")

This component works in following way:
* Agent/examiner/case worker would use quick action on record page to launch the component.
* The component loads, provides record edit fields on left and option to navigate through all related documents on the right.
* Document navigation can be done by drop-down list to view a specific document or left/right arrow buttons to sequentially move through the documents.
* Once the record has been updated, the modal can be closed and you are placed back on the original record.

Here are the configuration options:

| Parameter  | Definition |
| ------------- | ------------- |
| Height  | The height (in pixels) of the component.  |
| Columns  | Number of columns for the fields to show in left-side record edit form. |
| Edit Fields  | [Optional] A command separated list of field API names to show in the record edit form. |
| Content Parent Field  | [Optional] The API name of the field that stores the record to show all related content documents. If left blank, it defaults to the current record. You can provide a value that references a field on a parent related record (for example: if you are on case record and you want to reference account documents, you could put "Contact.AccountId" as the value and it will pull all documents related to the Account. |


# Quick Action Setup
While you can drop this component on a Lightning Page, it makes most sense to use it as a Quick Action in Salesforce Mobile. One issue with Quick Actions is that you cannot configure them declaratively like you can when dropping a component on a page. To allow some dynamic configuration, I created a Custom Metadata type called "PSPhotoInspection" to store configuration parameters that the component will read a runtime to configure itself. You have two fields to specify which configuration setting gets applied:
* Specify a single configuration for a given target object (i.e. same PSPhotoInspection config gets applied to every Case record)
* Specify a configuration at a user profile level for a given target object (i.e. apply a specific PSPhotoInspection config for users in a specific profile accessing the component on a specified object like Case)

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


# PSContentReview
THIS SOFTWARE IS COVERED BY [THIS DISCLAIMER](https://raw.githubusercontent.com/thedges/Disclaimer/master/disclaimer.txt).

Component to provide side-by-side capability to edit record and review all related documents. This package contains a Lightning component for performing photo-based inspections. Currently you need to setup as a Quick Action on a record and use from standard Salesforce Mobile app. It was developed as a Lightning Web Component so hopefully can utilize in Field Service Lightning at some point in future when they allow LWC extensions. 

![alt text](https://github.com/thedges/PSPhotoInspection/blob/master/PSPhotoInspection.gif "PSPhotoInspection")

This component works in following way:
* Inspector/user/agent would use quick action in SF mobile to launch component
* Take a picture of the issue
* Enter values in to configurable fields to associate to that photo
* Component creates a new child record for this specific inspection record, stores user entered data to fields on child record and stores geolocation
* Attaches the photo image to the new child record

It provides following key functionality:
* <b>Configurable Child Object</b> - specify the API name of child object to create new records for each photo inspection and attach photo to that record
* <b>Photo compression</b> - specify a target file size in KB for compressing large images to save on space and upload time. It utilizes [this](https://github.com/WangYuLue/image-conversion) Javascript library and the compressAccurately(file, config) method for image compression.
* <b>Configurable Fields</b> - specify a comma-separated list of fields on the target object to show in the edit form. An inspector can then provide values for each of these fields as each picture is taken.
* <b>Geolocation</b> - automatically capture the lat/lng of inspection location and store values in configurable lat/lng fields on child record

# Quick Action Setup
While you can drop this component on a Lightning Page, it makes most sense to use it as a Quick Action in Salesforce Mobile. One issue with Quick Actions is that you cannot configure them declaratively like you can when dropping a component on a page. To allow some dynamic configuration, I created a Custom Metadata type called "PSPhotoInspection" to store configuration parameters that the component will read a runtime to configure itself. You have two fields to specify which configuration setting gets applied:
* Specify a single configuration for a given target object (i.e. same PSPhotoInspection config gets applied to every Case record)
* Specify a configuration at a user profile level for a given target object (i.e. apply a specific PSPhotoInspection config for users in a specific profile accessing the component on a specified object like Case)

Here are the configuration options:

| Parameter  | Definition |
| ------------- | ------------- |
| Parent Object  | The API name of the parent object. This is the object you create the Quick Action on.  |
| Profile  | [Optional] The name of the user profile to filter the configuration in combination with Parent Object above  |
| Image Size  | The target size in KB to compress large images to for saving space and upload time  |
| Camera Message  | The message to show directly below the camera icon  |
| Child Object  | The API name of the child object to create new records for and attach inspection photos to  |
| Child Parent Object  | The API field name on child object that establishes relation to parent object  |
| Child Fields | A comma separated list of fields on child object to show in the inspection form  |
| Latitude Field | The API field name on child object to store latitude value (see note below). |
| Longitude Field  | The API field name on child object to store longitude value (see note below). |
| Save Button Text  | Text to show for the save button  |
| Clear Button Text  | Text to show for the clear button  |

**NOTE:** This component expects the Latitude and Longitude fields to be provided by standard Geolocation field. Depending on your field name, the API names would be ```<name>__Latitude__s``` and ```<name>__Longitude__s```.

Here is example of a configuration done for a demo:

![alt text](https://github.com/thedges/PSPhotoInspection/blob/master/PSPhotoInspection-Config.png "PSPhotoInspection Config")

# Setup Instructions
Here are steps to setup and configure this component:
  * Install the component per the "Deploy to Salesforce" button below. Make sure to install dependent packages first as noted below.
  * Create a custom object in your demo org where you will store your inspection results. 
    - Create fields to store values the inspector will enter for each photo inspection. 
    - Create a Lookup or Master-Detail relationship field to the primary object (i.e. parent object) you will execute inspections from. This could be a standard or custom object.
  * On the parent object, create a Quick Action and provide whatever Label, Name and Icon that makes sense to your scenario. Select the "PSPhotoInspectionAction" Lightning Component for the Quick Action configuration.
  * Go to <b>Setup > Custom Code > Custom Metadata Types</b>
    - Click <b>Manage Records</b> next to "PSPhotoInspection" metadata entry in list
    - Click <b>New</b> button to create a new metadata configuration. 
    - See above for field definitions and example screenshot. Make sure to specify either the "Parent Object" or combination or "Parent Object" and "Profile".
  * That is it...now use the Quick Action in Salesforce Mobile (or you can access from desktop app)

# Installation Instructions
Click below button to install this package:

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>


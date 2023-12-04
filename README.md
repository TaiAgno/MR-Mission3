# Mission 3

## Description

The task given was to create a DevOps pipeline for the API developed in M2, using Github Actions, having as goal to automatically deploy the Web App to Microsoft Azure every time there is new push/merge to the main/master branch of the repository. The new version of the App would then be made available in an automated way.
Unit tests were also requested to be part of the automated pipeline.

MISSION ACOMPLISHED

The web app is integrating and deploying automatically to Azure on every push to the master branch.
Unit tests for "matcher.js" have been integrated in the automation and are running successfully. Furthermore, a test coverage report is generated and its artifact is saved once the pipeline workflow is completed.


SELF-DISCLAIMER

This is up and running solely thanks to stubbornness.

## Getting Started

### Dependencies

* Express
* Node
* Multer
* Axios
* Dotenv
* ES Modules
* Cors
* Custom Vision

### Installing

* npm install express multer axios esm cors dotenv jest
* npm install @azure/cognitiveservices-customvision-training
* npm install @azure/cognitiveservices-customvision-prediction
* npm install @azure/ms-rest-js

### Executing program

* Open https://taimission3.azurewebsites.net/ in your browser and have fun!

### Testing

* Unit tests automated for "matcher.js"

### Errors

* No errors identified up to this stage.
* It would be benefitial to traing Custom Vision further.

## Review

Reviews of any kind will be highly appreciated.

Please make a pull request and review the code adding your comments.

## Author

Tai Agnoletto

Group 1, Dev Team, Mission Ready (October 2023 intake)
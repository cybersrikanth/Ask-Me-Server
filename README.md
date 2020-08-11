# Ask-Me-Server

## Installation

#### Requirements
 * Node Js (Version 12.*) (https://nodejs.org/en/download/)
 * NPM (Version 6.*)
 * Linux or Windows server 
 * MongoDb (locally or via cloud service providers)
 * git
 
#### Setup
* Clone the repositary using `https://github.com/cybersrikanth/Ask-Me-Server.git`
* Run `npm install` to install all the dependencies
* Run `npm start` to start development server
* Use postman to test API endpoints.

## Description

* This is a Question/Answer portal.
* Anyone can read all questions and answer.
* Any users can search for questions using hashtags or title.
* Every Question should have Title, Description and optional hashtags `#hashtag`

#### Authorization

* Anyone can signup and create account with email and password.
* Authorized users can Ask question in community.
* They can also answer for questions (even for their own questions).
* Questions can have multiple answers.
* Questions and answers can be edited and deleted only by creator of the resource.
* Only login from one device is permited.
* The previous session will be expired if user logs in other device.

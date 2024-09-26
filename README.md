# NSS Front End Capstone - Snakelings

## Specs
* React
* Firebase CRUD
* Bootstrap
* Use Github Projects for planning

## Technologies Used
* HTML5, CSS, JavaScript
* [Node-Sass 4.13.1](https://www.npmjs.com/package/node-sass?activeTab=versions) and [Bootstrap 4.4.1](https://getbootstrap.com/) for styling
* [React 15.12.0](https://reactjs.org/) for core app functionality
* [React Bootstrap v1.0.0-beta.16](https://react-bootstrap.github.io/) for navbar and modals
* [Firebase 7.7.0](https://firebase.google.com/) for authentication and data storage
* [S3Client AWS-S3 1.3.0](https://www.npmjs.com/package/react-aws-s3) and [AWS S3 Bucket](https://aws.amazon.com/) for user image uploads and storage
* [FontAwesome 5.12.0](https://fontawesome.com/) for icons

## Description
A Snake Identification and Tracking Resource.
The concept is that this app will help users identify species that they may come across, whether they are hiking, at the park, or in their garden. By quickly identifying species, users will be able to understand if they are dealing with a venomous species or not, which will hopefully lead to fewer snakes and people being harmed due to misidentification.

Additionally, by reporting a snake sighting, hikers can be on alert for venomous snakes that may have been reported in the area. Agencies such as the DNR could also use these reports to track populations of endangered or threatened species.

* Snakelings is an app that is designed to help users identify various snake species through descriptive filters, view snakes by state, and report snake sightings.
* Any users may view the database and use the identification features with or without logging in.
* If a user wishes to report a sighting, they are prompted to create a profile if they do not have one already.
* An existing user may report sightings and manage their own sightings via edit and delete functions.

### What's in store for the future of Snakelings?
* Future functionality for authtenticated users will include the ability to suggest potential identifications for reports with unidentified snakes as well as geo-location for users.
* Users will recieve a notification when there is a suggestion or comment left on a sighting they reported.
* Sightings will be able to be filtered by location, species, and date.
* All snake species accross the entire 50 US States will be added to the database.
* Snake filters and data will be more refined and offer better color options to include the true diversity of potential color ranges for single species.
* A FAQ page will be included to answer common myths and misunderstandings about snakes.
* There will be a search bar included on both the main snake page and the sightings page that will alow users to filter snakes via keywords.
* Snake information pages will include a sightings column with the ability to view all sightings for that species as well as more images of the species.

## Screenshots
Landing page:
![Main View](https://github.com/LaCollins/snakelings/blob/master/screenshots/mainView.PNG?raw=true)

View all Snakes:
![View All Snakes](https://github.com/LaCollins/snakelings/blob/master/screenshots/snakePage-viewAll.PNG?raw=true)

Filter by State:
![Filter by State](https://github.com/LaCollins/snakelings/blob/master/screenshots/filterByState.PNG?raw=true)

Filter By Snake Appearance:
![Filter by head shape](https://github.com/LaCollins/snakelings/blob/master/screenshots/filterByAppearance-1.PNG?raw=true)
![Filter by body shape](https://github.com/LaCollins/snakelings/blob/master/screenshots/filterByAppearance-2.PNG?raw=true)
![Filter by tail shape](https://github.com/LaCollins/snakelings/blob/master/screenshots/filterByAppearance-3.PNG?raw=true)
![Filter by color and markings ](https://github.com/LaCollins/snakelings/blob/master/screenshots/filterByAppearance-4.PNG?raw=true)

Results:
![Filtered snake](https://github.com/LaCollins/snakelings/blob/master/screenshots/filteredSnake.PNG?raw=true)

View of Single Snake Information Page:
![Single snake view](https://github.com/LaCollins/snakelings/blob/master/screenshots/snakeInformation.PNG?raw=true)

Create User Profile form for New Users:
![profile form](https://github.com/LaCollins/snakelings/blob/master/screenshots/profileForm.PNG?raw=true)
![image upload for user image](https://github.com/LaCollins/snakelings/blob/master/screenshots/imageUpload.PNG?raw=true)

Report Snake Form (note that reporting for a single snake-view will automatically select that species as the identified species):
![report form](https://github.com/LaCollins/snakelings/blob/master/screenshots/reportForm.PNG?raw=true)

Sightings Page:
![All sightings](https://github.com/LaCollins/snakelings/blob/master/screenshots/sightingsPage.PNG?raw=true)

Manage Sightings View:
![manage sightings](https://github.com/LaCollins/snakelings/blob/master/screenshots/mySightings.PNG?raw=true)

Edit Sightings:
![edit sightigns](https://github.com/LaCollins/snakelings/blob/master/screenshots/editForm.PNG?raw=true)

Profile View:
![view profile](https://github.com/LaCollins/snakelings/blob/master/screenshots/userProfile.PNG?raw=true)

Edit Profile:
![edit profile](https://github.com/LaCollins/snakelings/blob/master/screenshots/EditProfile.PNG?raw=true)

## Demo
[View the Project Here](http://snakelings.com)

## How to Run
* Clone down thsi project from [GitHub](https://github.com/LaCollins/snakelings)
* Install [http-server](https://www.npmjs.com/package/http-server)
* In your browser, navigate to [https://localhost:3000](https://localhost:3000)

## Contributors
[Laura Collins](https://github.com/LaCollins)

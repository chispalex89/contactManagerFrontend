# contact-manager-frontend
(This code is strictly the Front-end of the application)

### Table of Contents
1. [Completed Tasks](#completed-tasks)
2. [Decision on Technologies](#decision-on-technologies)
3. [Build](#build)

---
#### Completed Tasks
- Screens
  - *Home*: it has the list of contacts, showed in cards so the picture can be shown better. A link to create and every card has a button to see the details.
  - *Details*: is shown as a modal in the Home screen.
  - *Create*: it has the create screen, asking for the fields required (name, phone, email and picture). It's the only Form in the application and sends the data to the backend.
---
### Decision on Technologies
Redux was used to control the data shown in the site and the communication with the backend.
Reactstrap was used to apply style to the site.

---
### Build
Because this is just the Front-End of the site, first is needed to generate the compiled JS.

The first step would be installing dependencies
```
npm install
```
Then generate the compiled build using the build script
```
npm run build
```
At last clone the [backend repository](https://github.com/chispalex89/contactManager) replace the files in /assets/styles with the ones on  /build/static/css and the files on /assets/js with the ones on /build/static/js

Then go the the [Build section](https://github.com/chispalex89/contactManager/blob/master/README.md#build) to use the whole web application.

---

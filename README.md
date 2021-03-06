# Clients service

### Installation:
* make sure you have **node** and **npm** installed
* you have to have **MongoDB** installed and running (https://docs.mongodb.com/manual/installation/)
* run `npm install` in `ta-clients` folder
* run `npm install` in `ta-clients/backend/clients-service` folder
* run `npm install` in `ta-clients/frontend` folder

### Development environment:
* run `npm start` (from `ta-clients` folder) - starts both backend and frontend development servers
* open http://localhost:8080 (if not automatically opened)

### Frontend
* frontend tech: **Angular**, **Typescript**, **Webpack**, **SCSS**
* for tests run `npm test` (from `ta-clients/frontend` folder)

### Backend
NB! since I'm applying for frontend position the backend might not be perfect.
* backend tech: **Node.js**, **Express**, **MongoDB**
* there are no backend tests for now to save a bit of time, sorry..

### Additional information
My app is developed with the assumption that there will not be huge amount of clients (to keep backend simpler).
This is why my frontend does only 1 query to the API, stores the list and searches are made in the frontend.
With bigger data sets it would be necessary to implement lazy-loading/pagination and search functionality on the backend.

### Further improvements (will not be done in the scope of this test)
* delete client possibility
* validate email and other fields
* there is no phone and/or email uniqueness check
* deployment setup/conf etc
* backend test
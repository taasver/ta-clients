# Phonebook (take home test)

### Installation:
* make sure you have **node** and **npm** installed
* run `npm install`

### Development environment:
* run `npm start` - starts development server
* open http://localhost:8080 (if not automatically opened)

### Run tests
* run `npm test`

## Additional information
My app is developed with the assumption that there will not be huge amount of contacts.
This is why my frontend does only 1 query to the API, stores the list and searches are made in the frontend.
With bigger data sets it would be necessary to implement lazy-loading/pagination and search functionality on the backend.

## Further improvements
The following list will not be implemented within the scope of this take home test
* Detailed page with visible phone nr etc.
* Maybe some animations for contacts when search is used and list items change
* Deployment for staging/production
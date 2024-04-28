# NotesService
This Service is an API service that handles the CRUD opearations of the Note Data of the system.
The user adds, lists , updates and deletes Personal Notes by indirectly using this api service
This Services main entry url is `http://localhost:PORT/api/v2/notes`,

## API Endpoints

<ul>
    <li> GET --> api/v2/notes/all/:userId --> Receives all of the books of the db with the given user Id </li>
    <li> GET --> api/v2/notes/:id --> Receives a specific note by Id </li>
    <li>  POST --> api/v2/notes --> Adds a new Note to the system </li>
    <li> PATCH --> api/v2/notes/:id --> Updates the note (via ID) based on the request body parameters </li>
    <li> DELETE --> api/v2/notes/:id --> Deletes a note based on the Id </li>
</ul>


## Request and Response Formats
The Request and Response are in the json content,
The responses return a json object with a message such as The Data have been inserted or the list of the notes
The basic request body for POST and PUT requests

```
{
  "title":"A docker note ",
  "content":"lorem ipsum 2",
  "userId":2
}
```

## Authentication and Authorization
The service uses jwt tokens to handle authentication and authorization

## Status Codes
The Status Codes are standart API status codes <br/>
<ul>
    <li> 200 --> Success</li>
    <li> 201 --> Success Created </li>
    <li> 400 --> User based error </li>
    <li> 404 --> Page not found, wrong url </li>
    <li> 500 --> Internal Server Error </li>
</ul>

## Tests
The following api methods and the internal functions of this service have not been fully tested


## Commands
While the service is dockerized and can be activated by docker-compose, If you want to run the service locally, use `npm run start:dev` command, make sure that the env variables are correct for db connection

## Tools
This service has been implemented using Nest.js

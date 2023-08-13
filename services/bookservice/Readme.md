# BookService
This Service is an API service that handles the CRUD opearations of the Book Data of the system.
The user adds, lists , updates and deletes books by indirectly using this api service
This Services main entry url is `http://localhost:PORT/api/v1/books`,

## API Endpoints

<ul>
    <li> GET --> api/v1/books/all --> Receives all of the books of the db </li>
    <li> GET --> api/v1/books/:id --> Receives a specific book by Id </li>
    <li>  POST --> api/v1/books --> Adds a new Book to the system </li>
    <li> PUT --> api/v1/books/:id --> Updates the book (via ID) based on the request body parameters </li>
    <li> DELETE --> api/v1/books/:id --> Deletes a book based on the Id </li>
</ul>


## Request and Response Formats
The Request and Response are in the json content,
The responses return a json object with a message such as The Data have been inserted or the list of the books
The basic request body for POST and PUT requests

```
{
    "bookName": "Satranç",
    "author": "Stefan Zweig",
    "bookCategories": [
        "Psychology",
        "Modern Classic",
        "Story"
    ],
    "bookStatus": "Red"
}
```

## Authentication and Authorization
For now, this service does not include authentication or authorization checks. JWT authorization check will be implemented 

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
The following api methods and the internal functions of this service have been tested. Unit tests have been written and with entering the service directory and typing `npm run test` the tests with the coverages will be made.

## Commands
While the service is dockerized and can be activated by docker-compose, If you want to run the service locally, use `npm run dev` command, make sure that the env variables are correct for db connection

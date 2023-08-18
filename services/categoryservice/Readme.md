# Category Service 

Contains API requests that are involved with the Categories 
This Services main entry url is `http://localhost:PORT/api/v1/categories`,

## Tools Used

<ul>
    <li> Prisma : An ORM for Typescript </li>
</ul>

## API Endpoints

<ul>
    <li> GET --> api/v1/categories/all --> Receives all of the categories of the db </li>
    <li>  POST --> api/v1/categories --> Adds a new category to the system </li>
    <li> PUT --> api/v1/categories/:id --> Updates the category (via ID) based on the request body parameters </li>
    <li> DELETE --> api/v1/categories/:id --> Deletes a book based on the Id </li>
</ul>

## Request and Response Formats
The Request and Response are in the json content,
The responses return a json object with a message such as The Data have been inserted or the list of the books
The basic request body for POST and PUT requests

```
{
    "name": "Personal Development",
    "info": "Books about personal development, how to be better"
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

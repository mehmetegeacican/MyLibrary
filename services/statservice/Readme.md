# Stat Service 

Contains API requests that are involved with the Stats 
This Services main entry url is `http://localhost:PORT/api/v1/stats`,

## Tools Used

<ul>
    <li> Prisma : An ORM for Typescript </li>
</ul>

## API Endpoints

<ul>
    <li> GET --> api/v1/stats/all/authors --> Receives all of the book counts by author</li>
    <li> GET --> api/v1/stats/all/categories --> Receives all of the book counts by categories</li>
    <li> GET --> api/v1/stats/all/statuses --> Receives all of the book counts by statuses</li>
</ul>

## Request and Response Formats
The Request and Response are in the json content,
The responses return a json object with names and totals
```
[
    {
        "status": "Red",
        "total": "112"
    },
    {
        "status": "Will Read",
        "total": "11"
    },
    {
        "status": "Reading",
        "total": "1"
    }
]
```
## Authentication and Authorization
For now, this service does not include authentication or authorization checks. JWT authorization check will be implemented 

## Status Codes
The Status Codes are standart API status codes <br/>
<ul>
    <li> 200 --> Success</li>
    <li> 500 --> Internal Server Error </li>
</ul>

## Tests
The following api methods and the internal functions of this service have been tested. Unit tests have been written and with entering the service directory and typing `npm run test` the tests with the coverages will be made.

## Commands
While the service is dockerized and can be activated by docker-compose, If you want to run the service locally, use `npm run dev` command, make sure that the env variables are correct for db connection

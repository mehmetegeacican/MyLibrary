# BookService
This Service is an API service that handles the Authentication opearations of the system.
The user adds, logins and deletes user with this system. 
For Authentication, JSON Web Token is used 
This Services main entry url is `http://localhost:PORT/api/v1/auth`,

## API Endpoints

<ul>
    <li> POST --> api/v1/auth/signup --> Creates a new user and logs in </li>
    <li> POST --> api/v1/auth/login --> Logs in a user </li>
    <li> DELETE --> api/v1/auth/:id --> Deletes a user based on the Id </li>
</ul>


## Request and Response Formats
The Request and Response are in the json content,
The responses return a json object with a message such as The Data have been inserted or the list of the books
The basic request body for POST and PUT requests

```
{
    "email":"ho-oh@hotmail.com",
    "password":"123456"
}
```
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

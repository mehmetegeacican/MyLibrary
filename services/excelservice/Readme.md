# BookService
This Service is an API service that handles the Importation opearations of the system.
The user imports CSV's (not excels) with the apis below 
For Authentication, JSON Web Token is used 
This Services main entry url is `http://localhost:PORT/api/v1/csv/import`,

## API Endpoints

<ul>
    <li> POST --> /books --> Imports books from csv file  </li>
    <li> POST --> /authors --> Imports authors from csv file </li>
    <li> DELETE --> /categories --> Imports categories from csv file </li>
</ul>


## Request and Response Formats
The Request and Response are in the json content,
The responses return a json object with a message such as The Data have been inserted or the list of the books
The basic request body for POST and PUT requests

```
{
    "csvFile" : a csv File
}
```
## Status Codes
The Status Codes are standart API status codes <br/>
<ul>
    <li> 200 --> Success</li>
    <li> 400 --> User based error </li>
    <li> 500 --> Internal Server Error </li>
</ul>

## Tests
The following api methods and the internal functions of this service have been tested. Unit tests have been written and with entering the service directory and typing `npm run test` the tests with the coverages will be made.


## File Formats
Correct Book File Format

```
"name","description","authors","user_id","entered","category","status"
"Yıldız Gezgini","Jack London's different story","{Jack London}","1","2023-09-14T00:00:00.000Z","{Modern Classics}","Will Read"
"Muhteşem Gatsby","Story of success from the bottom to top, and how it is for love, and the end of it","{F.Scott Fizgerald}","1","2023-09-14T00:00:00.000Z","{Modern Classics}","Red"
"Soneler","William Shakespeare's Sonets","{William Shakespeare}","1","","{Theatre,Art,Poetry}","Will Read"
"Cumhuriyetin 100 İsmi: Büyük Devrimin Portreleri","Republic Era Info","{Emrah Safa Gürkan}","1","2023-09-14T00:00:00.000Z","{History,Turkish History}","Will Read"
"Cumhuriyetin 100 Günü: İnkılabın Ayak Sesleri","Republic Era Info","{Emrah Safa Gürkan}","1","2023-09-14T00:00:00.000Z","{History,Turkish History}","Will Read"

```

Correct Author File Format

```
"authorName","authorDetails","user_id"
"Jack London","Adventurer,Author","1"
"F.Scott Fizgerald","Author of the Great Gatsby","1"
"Stefan Zweig","Famous modern classic writer ","2"

```

Correct Category File Format

```
"name","info","user_id"
"Category","Info about category","1"
```

## Commands
While the service is dockerized and can be activated by docker-compose, If you want to run the service locally, use `npm run dev` command, make sure that the env variables are correct for db connection

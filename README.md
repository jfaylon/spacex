
# SpaceX API
A backend API that retrieves starlink satellites and launchpad information.


## Prerequisites

- Node v18.17.1

## Installation

- Clone the repository and perform

```
npm install
```

- Add the ENVs to a `.env` file or copy the `.env.example` file

```
PORT=5000
```

## Running the Application

- Running in development mode

```
npm run start
```

or

```
npm run start:dev
```


## Unit Tests
```bash
# unit tests
$ npm run test
```

## API
- GET /starlink
  - Query parameters
    - year - year of launch
    - month - month of launch
    - date - day of launch
  - Retrieves a list of starlink launches and its details
- GET /launchpad/:id
  - Retrieves the launchpad name and all failures associated to the launchpad.

## Tech limitations, Assumptions
- No Frontend was created for this application.
- The retrieval and caching of starlink data is done upon start of the application (using app.locals)
- Since there is no specific payload needed for retrieving the starlink information, the entire payload is sent.
- The query parameters for the starlink can be used in any combination (year and day, year and month, day only, month only, year only, etc.). This is to give flexibility for retrieving data such as get all May launches or get all 15th day of the month launches.

## Possible Improvements
- Better error handling
- Better error logging
- Integration tests
- Better `cors`
- If given the requirements, only send requested fields.

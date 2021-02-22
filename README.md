# GRUB GOBLIN

## Description



## Installation

To get the app up and running on your machine follow these steps.

1. Clone repo onto your machine with the `git clone https://github.com/jappelgren/grub-goblin.git` command.
2. Create a database named `prime_app`.
3. Run the ```CREATE TABLE``` queries in the `database.sql` file.  *DO NOT RUN THE INSERT QUERIES YET*
4. Run `npm install` to install all necessary dependencies.
5. `npm run server` to start the server.
6. `npm run client` to start the client.
7. In your browser go to [localhost:3000](http://localhost:3000/).

## Usage

Go to localhost:3000.  The user will see a carousel of movies.  Clicking on a movie poster will bring the user to a detailed view of that movie.  The user can click on the back button (or logo) to go back to the list.  Clicking on the add a movie button will bring the user to a form where they can enter the details of a movie and select multiple genres.

## Built With

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [PG](https://node-postgres.com/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [React-Router](https://reactrouter.com/)
# GRUB GOBLIN

## Description



## Installation

To get the app up and running on your machine follow these steps.

1. Clone repo onto your machine with the `git clone https://github.com/jappelgren/grub-goblin.git` command.
2. Create a database named `prime_app`.
3. Run the ```CREATE TABLE``` queries in the `database.sql` file.  
*DO NOT RUN THE INSERT QUERIES YET*
4. Run `npm install` to install all necessary dependencies.
5. `npm run server` to start the server.
6. `npm run client` to start the client.
7. In your browser go to [localhost:3000](http://localhost:3000/).
8. Create a new account using the "Create a New Account" link on login box.
9. After creating an account you are able to run the ```INSERT``` queries in database.sql if you would like some recipes to play with right away.  Otherwise you will be using the app with a clean slate and can add recipes from the add recipe form or import from a url.
10. For nutrition analysis of recipes you will need an API key for the Edamam Nutrition Analysis API.  Register for a free account with 200 calls a month [here](https://developer.edamam.com/).  *Recipes will not show up on the DOM until they have assigned nutrition information.*
11. Once you have the API Key and App Id from Edamam, create a .env file in the root directory of the project and add ```APP_KEY=<Your Key>``` and ```APP_ID=<Your ID>``` to it..

## Usage



## Built With

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [PG](https://node-postgres.com/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [React-Router](https://reactrouter.com/)
- [React-DnD](https://react-dnd.github.io/react-dnd/about)
- [React-Spring](https://www.react-spring.io/)
- [Puppeteer](https://pptr.dev/)
- [Edamam API](https://developer.edamam.com/)
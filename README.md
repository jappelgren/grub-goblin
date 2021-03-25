# GRUB GOBLIN

<img src="public/images/logo.png" alt="The Grub Goblin Logo" width="308"/>

## Description

<a href="http://www.youtube.com/watch?feature=player_embedded&v=hHvcLQsFrpw
" target="_blank"><img src="http://img.youtube.com/vi/hHvcLQsFrpw/0.jpg" 
alt="Grub Goblin Youtube Preview" width="240" height="180" border="10" /></a>

Grub Goblin is a meal planning app with an emphasis on nutrition. Grub Goblin is designed so that a user can have an entire weeks worth of meals laid out in one easy to ready week long view. All Days are broken down into three meal slots and when food is added to the slots the nutrition is added together and displayed at the under the corresponding day.

Grub Goblin works off of user submitted recipes. Users have the option of entering their own or using an import from URL feature. Whichever way the user chooses the recipe is sent to a third party api and the nutrition information is analyzed.

## Installation

To get the app up and running on your machine follow these steps.

1. Clone repo onto your machine with the `git clone https://github.com/jappelgren/grub-goblin.git` command.
2. Create a database named `prime_app`.
3. Run the `CREATE TABLE` queries in the `database.sql` file.  
   _DO NOT RUN THE INSERT QUERIES YET_
4. Run `npm install` to install all necessary dependencies.
5. `npm run server` to start the server.
6. `npm run client` to start the client.
7. In your browser go to [localhost:3000](http://localhost:3000/).
8. Create a new account using the "Create a New Account" link on login box.
9. After creating an account you are able to run the `INSERT` queries in database.sql if you would like some recipes to play with right away. Otherwise you will be using the app with a clean slate and can add recipes from the add recipe form or import from a url.
10. For nutrition analysis of recipes you will need an API key for the Edamam Nutrition Analysis API. Register for a free account with 200 calls a month [here](https://developer.edamam.com/).  
    _Recipes will not show up on the DOM until they have assigned nutrition information._
11. Once you have the API Key and App Id from Edamam, create a .env file in the root directory of the project and add `APP_KEY=<Your Key>` and `APP_ID=<Your ID>` to it..

## Usage

![alt text](documentation/images/gg-login.png 'The Grub Goblin Login Page')

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

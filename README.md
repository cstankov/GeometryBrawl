# Geometry Brawl  
## link: https://fathomless-castle-05798.herokuapp.com/

Geometry brawl is a online multiplayer shooter which allows the player to join the server and start playing at anytime. Each player has the ability to customize the color of their circle and the bullets they shoot. The app features a unique login for every player and keeps track of each players stats in a database which is displayed in the main menu. When the player joins the game their bullet trajectory is affected by the current weather and wind conditions in Burnaby B.C. by the use of Darksky's weather api. The project is written in HTML, CSS, Javascript and nodeJS. It is currently running on a Heroku server and uses Postgres for the back end database. 

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

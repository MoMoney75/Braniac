OVERVIEW

        Brainiac is a trivia game app where a user can test his/her knowledge across a variety of different trivia game categories with three different levels of difficulty. By creating an account, each one of a user's finished games will automatically be saved to the Brainiac database, allowing for stats to be tracked and organized for the user. Currently, the only stats being returned to the user are highest scores sorted by category and lowest score sorted by category. Once logged in, the user can setup the game in the game settings menu, allowing for the user to choose difficulty, number of questions, category, and type of questions. Scoring is based off of trivia game difficulty level. Easy questions are worth 1 point, medium 2 points and hard is worth 3 points. You can play Brainiac [here](https://brainiac.surge.sh/).

TECHNOLOGIES & CLONING

        The trivie API is hosted on [Opentdb](https://opentdb.com/api_config.php). The API is completely free to use and no API key is required to make requests. The documentation here is extremely useful and makes the API very easy to use. You should explore the API documentation to get a better understanding of frontend/API/GameAPI.js and how the API calls retrieve the data.

        The back-end for Brainiac was built using Express with Node.js and is being hosted on Render. The front-end was built using React, specifically using Create React APP. Each directory (front-end and back-end) has its own package.json for organization purpose.

        In order to clone the app, go into backend directory in your terminal and run "npm install" to install all necessary packages for building your backend server. Next, into the frontend directory and run "npm install" to install all packages used for the frontend of the application. Once all packages are installed, run "npm start" in the backend directory to start the backend server. Next, repeat the same step inside the frontend directory to start the React server.

TESTS

        At the moment, only tests are written to test the backend routes: game.js and user.js. Tests are written using Jest. Jest will automatically be installed when packages are downloaded from the backend package.json. "npm test" runs all tests.

FUTURE GOALS:

        1. Add more game data to be saved for a user when a game is complete, which will allow more stats to be returned to the user.
        2. Add a feature for an existing user to view other users' game stats User.get(username) is already implemented in the User model, just have to add the additional logic.
        3. Add a feature where one user can challenge another user to a game of trivia, allowing for final score comparison between the two users.
        4. Add testing for the frontend

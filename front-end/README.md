# F5 Candidate Exercise (Front End)
**Author**: Lacy Hogan
**Version**: 1.0.0

## Overview
This application stores information about candidates. It takes in a name, an acceptance status, a date/time stamp, and an array that will hold IDs of a secondary model. A name and an acceptance status are required fields, with the name being unique. A user can create a new candidate, update an existing one, find an existing one, and delete an existing one. New candidate are saved to a Mongo Database. Upon refresh, the state will display all candidates saved to the database. 

## Getting Started
You will need to include the following scripts in your package.json in order to run the browser and test:
  "scripts": {
  -  "test": "jest --coverage",
  -  "watch": "webpack-dev-server --config webpack.dev.js",
  -  "build": "webpack --config webpack.dev.js"
  },

In your .env file, include:
  API_URL=http://localhost:3000
  NODE_ENV=development

You will need to init the following devDependencies before utilizing this application:
"devDependencies": {
  -  "babel-core": "^6.26.3",
  -  "babel-eslint": "^8.2.3",
  -  "babel-loader": "^7.1.4",
  -  "babel-plugin-transform-react-jsx-source": "^6.22.0",
  -  "babel-preset-env": "^1.7.0",
  -  "babel-preset-react": "^6.24.1",
  -  "babel-preset-stage-0": "^6.24.1",
  -  "css-loader": "^0.28.11",
  -  "dotenv": "^5.0.1",
  -  "enzyme": "^3.3.0",
  -  "enzyme-adapter-react-16": "^1.1.1",
  -  "eslint": "^4.19.1",
  -  "eslint-config-airbnb-base": "^12.1.0",
  -  "eslint-plugin-import": "^2.12.0",
  -  "eslint-plugin-jest": "^21.15.1",
  -  "eslint-plugin-react": "^7.8.2",
  -  "file-loader": "^1.1.11",
  -  "html-webpack-plugin": "^3.2.0",
  -  "jest": "^22.4.4",
  -  "mini-css-extract-plugin": "^0.4.0",
  -  "node-sass": "^4.9.0",
  -  "prop-types": "^15.6.1",
  -  "react": "^16.3.2",
  -  "react-dom": "^16.3.2",
  -  "react-redux": "^5.0.7",
  -  "react-router-dom": "^4.2.2",
  -  "react-test-renderer": "^16.4.0",
  -  "redux": "^4.0.0",
  -  "redux-devtools-extension": "^2.13.2",
  -  "redux-mock-store": "^1.5.1",
  -  "sass-loader": "^7.0.1",
  -  "style-loader": "^0.21.0",
  -  "superagent": "^3.8.3",
  -  "uuid": "^3.2.1",
  -  "webpack": "^4.8.3",
  -  "webpack-cli": "^2.1.3",
  -  "webpack-dev-server": "^3.1.4",
  -  "webpack-merge": "^4.1.2"
  },

## Architecture
This application uses JavaScript, React library and sass library.

To start the server, enter npm run watch in your terminal

To run the tests, enter npm run test in your terminal
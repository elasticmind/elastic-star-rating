# ElasticStarRating
## Project structure
The focus of the project is experimentation with Stencil.js (See https://stenciljs.com/ for more) and AWS. The folders are as follows:
- `aws`: AWS Lambda functions with GraphQL and DynamoDB, handled by Serverless Framework.
- `components`: Stencil components, mainly `elastic-star-rating`.
- `react-app`: A sample React application that consumes from the `components` folder.
- `vue-app`: A sample Vue application that consumes from the `components` folder.

## Installation
- Run `npm install` in folders `aws`, `components`, `react-app` and `vue-app`.
- `npm link` the `components` folder under `react-app` and `vue-app` folders.

## Development
Simply, fire up the appropriate development servers via the respective NPM scripts in each folder other than `aws`.

Running different instances of each application with the help of incognito browser instances makes it possible to demonstrate the project in a close-to-real-life manner.

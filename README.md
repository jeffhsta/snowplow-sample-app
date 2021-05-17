# Snowplow test

This is a Snowplow technical test.

## Solution

This is a simple e-commerce API, where it has some hard coded Products and handle carts in memory.

This application has a very simple implementation, with only Snowplow Micro as an external dependency.

There are tests for the logic layer which handles the cart creation, add, update and remove items from the cart.

There is no error handler for simplicity and quick solution, which can be easily attach to a separated module where error events
can be send to Snowplow.

## Applicatio setup

The application was developed using NodeJS 14.16.0 and yarn, and there is Docker Compose file
to get Snowplow Micro up and running, so you need to have those installed first.

To install dependencies, run `yarn install`, run the Snowplow Micro using `docker compose up -d`.

### How to run the application

With the requirements installed, run the application with `yarn start`.

Using Docker Compose to get Snowplow Micro up and running will require no configuration change on
the application, but if necessary change the environment variables:

- `PORT` to change the application API port that will be exposed (default is `8000`)
- `SNOWPLOW_COLLECTOR_HOST` to change the Snowplow Micro host (default is `127.0.0.1`)
- `SNOWPLOW_COLLECTOR_PORT` to change the Snowplw Micro port (default is `9090`)

### How to run the tests

With the requirements installed, run `yarn test`

### How to run the lint

With the requirements installed, run `yarn lint`

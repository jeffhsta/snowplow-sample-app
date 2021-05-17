import express from 'express';
import * as bodyParser from 'body-parser';
import { tracker, gotEmitter, HttpProtocol, HttpMethod } from '@snowplow/node-tracker';
import router from './router';

// Configuration
const port = parseInt(process.env.PORT || '8000')
const snowplowCollectorHost = process.env.SNOWPLOW_COLLECTOR_HOST || '127.0.0.1';
const snowplowCollectorPort = parseInt(process.env.SNOWPLOW_COLLECTOR_PORT || '9090');

// Event tracker setup
const emitter = gotEmitter(
  snowplowCollectorHost,
  HttpProtocol.HTTP,
  snowplowCollectorPort,
  HttpMethod.GET,
  1
);

const appTracker = tracker([emitter], 'appTracker', 'snowplow-sample-app', false);
appTracker.setPlatform("srv")
appTracker.setLang("en")

// API definition
const app = express();
app.use(bodyParser.json());
app.use('/', router(appTracker))

app.listen(port, (): void => {
  console.info({ message: `Server is running at port ${port}` })
});
